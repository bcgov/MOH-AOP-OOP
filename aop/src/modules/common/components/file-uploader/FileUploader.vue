<template>
  <div>
    <div class="dropzone" ref="dropZone">

    <div class="instruction-zone d-flex align-items-center flex-wrap flex-sm-nowrap flex-column flex-sm-row">
      <img :src="cloudUploadIconSvg" class="svg-icon d-inline-block mb-3 ml-3" />

      <input type="file" :id="id"
              ref="browseFileRef" accept="image/*,application/pdf" style="display:none;"
              tabindex="0" multiple :name='id'
              :required='required'
              autocomplete="off"/>
      <label :for="id" class="file-upload-label d-inline-block ml-3" ref="selectFileLabel">
        <span class='h2 color-body'>Select a file</span>
        <span class='d-block description'>{{ instructionText }}</span>
      </label>

    </div>

    <div class="preview-zone">
      <div v-for="imageModel of images" :key="imageModel.uuid" class="preview-item">
        <Thumbnail :imageObject="imageModel" @delete="deleteImage(imageModel)" />
      </div>

        <a href="javascript: void(0);" class="common-thumbnail ml-3" @click='openFileDialog($event)'>
          <div class="thumbnail-container">
            <div class="image-thumbnail demo-thumbnail">
              <img :src="plusIconSvg" class="svg-icon" />
            </div>
            <div class="action-strip text-primary text-center">
              Add
            </div>
          </div>
        </a>
      </div>
    </div>

    <div class="text-danger">{{errorMessage}}</div>

    <!-- This hidden canvas is used to transform / resize images -->
    <canvas ref="canvas" style="display:none;"></canvas>
  </div>
</template>

<script>
import Thumbnail from './Thumbnail.vue';
import { Observable, fromEvent, merge } from 'rxjs';
import {map, filter, flatMap, scan, delay, retryWhen} from 'rxjs/operators';
import plusIconSvg from './images/plus.svg';
import cloudUploadIconSvg from './images/cloud-upload-alt.svg';
import { v4 as uuidv4 } from "uuid";

const loadImage = require('blueimp-load-image');
const sha1 = require('sha1');
const PDFJS = require('pdfjs-dist/build/pdf');
const pdfJsWorker = require('pdfjs-dist/build/pdf.worker.entry');
PDFJS.workerSrc = pdfJsWorker;


export var CommonImageError;
(function (CommonImageError) {
    CommonImageError[CommonImageError["WrongType"] = 0] = "WrongType";
    CommonImageError[CommonImageError["TooSmall"] = 1] = "TooSmall";
    CommonImageError[CommonImageError["TooBig"] = 2] = "TooBig";
    CommonImageError[CommonImageError["AlreadyExists"] = 3] = "AlreadyExists";
    CommonImageError[CommonImageError["Unknown"] = 4] = "Unknown";
    CommonImageError[CommonImageError["CannotOpen"] = 5] = "CannotOpen";
    CommonImageError[CommonImageError["PDFnotSupported"] = 6] = "PDFnotSupported";
    CommonImageError[CommonImageError["CannotOpenPDF"] = 7] = "CannotOpenPDF";
})(CommonImageError || (CommonImageError = {}));


export class CommonImageProcessingError {
  commonImage;
  rawImageFile;
  maxSizeAllowed;
  errorCode;
  // added errorDescription.PDF.JS gives proper error messages as invalid pdf structure or password protected pdf.Good for splunk tracking
  constructor(errorCode) {
    this.errorCode = errorCode;
  }
}

/**
 * Image as uploaded by user
 */
export class CommonImage {
  uuid;

  /**
   * @param fileContent (optional) The base64 of an image. See `fileContent` property.
   */
  constructor(fileContent) {
    this.uuid = uuidv4();
    if (fileContent) {
      this.fileContent = fileContent;
    }
  }

  /**
   * The base64 content of an image.  Must already be base64 or some other stringable data-type.
   * 
   * You should be able to do <img src='myCommonImage.fileContent'> to render the image.
   */
  fileContent = '';
  documentType = {};

  /**
   * ContentType should generally match the MIME type, but can be set as needed by application.
   * https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types
   */
  contentType = '';
  // number of bytes.
  size = 0;
  sizeUnit = '';
  sizeTxt = '';
  naturalHeight = 0;
  naturalWidth = 0;
  name = '';
  // file uniqness checksum
  id = '';
  error;
  errorDescription;
  attachmentOrder = 0;

  /**
   * Returns the JSON of an image ready to be submitted to the API.  You may
   * have to set attachmentOrder before calling this.
   */
  toJSON() {
    return {
      attachmentOrder: this.attachmentOrder, // will be 0 - should it be 1?
      attachmentUuid: this.uuid,
      attachmentDocumentType: this.documentType
    };
  }
}

export class CommonImageScaleFactorsImpl {
  widthFactor;
  heightFactor;

  constructor(wFactor, hFactor) {
    this.widthFactor = wFactor;
    this.heightFactor = hFactor;
  }

  scaleDown(scale) {
    return new CommonImageScaleFactorsImpl(
      this.widthFactor * scale,
      this.heightFactor * scale);
  }
}

export default {
  name: 'FileUploader',
  components: {
    Thumbnail
  },
  props: {
    images: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    instructionText: {
      type: String,
      default: 'Please upload your documents.'
    }
  },
  data: () => {
    return {
      errorMessage: '',
      plusIconSvg: plusIconSvg,
      cloudUploadIconSvg: cloudUploadIconSvg
    }
  },

  /*
   System processing steps

   1. User clicks browse or drag-n-drops an file
   2. For browse case, the browser is told to only accept mime type image/*, .JPG, .GIF, .PNG, etc,
   however user can override and for drag-n-drop we don't can't impose this filter
   4. Using the HTML5 File API, we open a handle on the file
   5. Read the filename for later display to the user
   6. Create a hidden Image element in the browser's DOM
   7. Read the file's bytes as a DataUrl and copy them into the Image element
   8. Wait until the Image finishes loading the image
   9. Read the image element's natural width and height
   10. Pass the File handle into a HTML5 Canvas lib (we need the XIFF headers to auto rotate, XIFF headers are not available in DataUrl)
   11. The Canvas errors because it's a wrong type, e.g., TIFF, we abort and notify user
   12. Instruct the Canvas lib to keep resizing the image if it exceeds a maximum width or height,
   extract meta data, and auto-orient based on XIFF metadata.  It uses a "contain" operation which retains
   it's width to height pixel ratio.
   13. Call a function on the Canvas element to turn the Canvas into a JPEG of quality 50%.
   14. Once in a Blob with get the blob size in bytes and a human friendly display size
   15. In order to more easily manage the image, we convert the Blob to a DataUrl again.
   16. Pass the DataUrl into a hash algorithm to create an identifier and to check if the image has already been uploaded
   17. Next we check the final size of the image to ensure it's not to small in resolution
   (arguably this could've been done earlier), if too small we notify user
   18. Finally, the image is saved into the user's ongoing EA/PA application including localstorage
   19. The image is displayed to user as a thumbnail
   */
  
  mounted() {
      const dragOverStream = fromEvent(this.$refs.dropZone, 'dragover');

      /**
       * Must cancel the dragover event in order for the drop event to work.
       */
      dragOverStream.pipe(map(event => {
          return event;
      })).subscribe(evt => {
          if (evt) {
              evt.preventDefault();
          }
      });

      const dropStream = fromEvent(this.$refs.dropZone, 'drop');
      const filesArrayFromDrop = dropStream.pipe(
          map(
              function (event) {
                  if (event && event.dataTransfer) {
                      event.preventDefault();
                      return event.dataTransfer.files;
                  }
              }
          ));

      const browseFileStream = fromEvent(this.$refs.browseFileRef, 'change');

      merge(merge(browseFileStream).pipe(
          map(
              (event) => {
                  if (event) {
                      event.preventDefault();
                      if (event.target) {
                        return event.target.files;
                      }
                  }
              }
          )),
          filesArrayFromDrop).pipe(
              filter((files) => {
                  if (!!files && files.length && files.length > 0) {
                    return true;
                  }
                  return false;
              }),
              flatMap(
                  (fileList) => {
                      return this.observableFromFiles(fileList, new CommonImageScaleFactorsImpl(1, 1));
                  }
              ),
              filter(
                  (imageModel) => {
                      const imageExists = this.checkImageExists(imageModel, this.images);
                      if (imageExists) {
                          this.handleError(CommonImageError.AlreadyExists, imageModel);
                          this.resetInputFields();
                      }
                      return !imageExists;
                  }
              ),
              // TODO - Is this necessary? Can likely be removed as it's exactly identical to the preceding.
              filter((imageModel) => {

                  const imageExists = this.checkImageExists(imageModel, this.images);
                      if (imageExists) {
                          this.handleError(CommonImageError.AlreadyExists, imageModel);
                          this.resetInputFields();
                      }
                      return !imageExists;
                  }
              ),
              filter((imageModel) => {

                  const imageSizeOk = this.checkImageDimensions(imageModel);
                      if (!imageSizeOk) {
                          this.handleError(CommonImageError.TooSmall, imageModel);
                          this.resetInputFields();
                      }
                      return imageSizeOk;
                  }
              )
          ).subscribe(
          (file) => {

              this.handleImageFile(file);
              this.resetInputFields();
              this.errorMessage = '';
          },

          () => {},
          () => {
          }
      );
  },

  methods: {
    /**
     * Return true if file already exists in the list; false otherwise.
     */
    checkImageExists: function(file, imageList) {
        if (!imageList || imageList.length < 1) {
            return false;
        } else {

            const sha1Sum = sha1(file.fileContent);
            for (let i = imageList.length - 1; i >= 0; i--) {
                if (imageList[i].id === sha1Sum) {
                    return true;
                }
            }
            return false;
        }
    },

    /** Opens the file upload dialog from the browser. */
    openFileDialog: function(event) {
        event.preventDefault();
        this.$refs.browseFileRef.dispatchEvent(new MouseEvent('click'));
    },

    /**
     * Solve size in this equation: size * 0.8to-the-power-of30 < 1MB, size
     * will be the max image size this application can accept and scale down
     * to under 1MB. In this case: size < 807 MB
     *
     * 30 is the number of retries. the value for maxRetry passed to retryStrategy
     * function.
     *
     * If: size * 0.8to-the-power-of40 < 1MB, then size < 1262 MB.
     *
     * Note: 0.8 is the self.appConstants.images.reductionScaleFactor defined in global.js
     *
     *
     * @param file
     * @param scaleFactors
     */
    observableFromFiles: function(fileList, scaleFactors) {
        const reductionScaleFactor = 0.8;

        const self = this;
        let pageNumber = Math.max(...self.images.map(function(o) {return o.attachmentOrder; }), 0) + 1 ;

        // Create our observer
        const fileObservable = Observable.create((observer) => {
            scaleFactors = scaleFactors.scaleDown(reductionScaleFactor);

            for (let fileIndex = 0; fileIndex < fileList.length; fileIndex++) {
                const file = fileList[fileIndex];

                const pdfScaleFactor = 2.0;

                if (file.type === 'application/pdf') {
                    /**
                     *  Page number logic :
                     *      Images - Assign current page number whichever is available..so get the current page number , pass it to call back [reserve it] and increment
                     *      PDF    -  we dont know how many pages..so cant get current number and keep it since it can be multiple pages... so start assigning later point
                     *      when PDF is totally read..
                     *
                     *  */
                    this.readPDF(file, pdfScaleFactor, (images , pdfFile) => {
                        images.map((image) => {
                            image.name = pdfFile.name;
                            this.resizeImage(image, self, scaleFactors, observer, pageNumber , true); // index starts from zero
                            pageNumber = pageNumber + 1  ;
                        });
                    }, (error) => {
                        const imageReadError =  new CommonImageProcessingError(CommonImageError.CannotOpenPDF);
                        self.filterError(imageReadError);
                    });
                } else {
                    // Load image into img element to read natural height and width
                    this.readImage(file, pageNumber , (image , imageFile , nextPageNumber)  => {
                            image.id = imageFile.name; // .name deprecated, changed image.name to image.id
                            this.resizeImage(image, self, scaleFactors, observer , nextPageNumber );
                        },

                        // can be ignored for bug, the log line is never called
                        (error) => {
                            self.filterError(error);
                        });
                    pageNumber = pageNumber + 1;
                }
            }

            // retryWhen is potential issue!
        }).pipe(retryWhen(this.retryStrategy(32)));
        return fileObservable;
    },


    resizeImage: function( image, self, scaleFactors, observer, pageNumber = 0 , isPdf = false) {
        const imageModel = new CommonImage();
        const reader = new FileReader();
        
        // Copy file properties
        imageModel.name = image.id ;
        if (isPdf) {
            imageModel.name = image.name + '-page' + pageNumber;  // Just give name to pdf
        }
        imageModel.attachmentOrder = pageNumber ;


        imageModel.naturalWidth = image.naturalWidth;
        imageModel.naturalHeight = image.naturalHeight;

        // Canvas will force the change to a JPEG
        imageModel.contentType = 'image/jpeg'; // previously in appConstants

        // Scale the image by loading into a canvas
        loadImage(
            image.src, // NOTE: we pass the File ref here again even though its already read because we need the XIFF metadata
            function (canvas) {

                // Canvas may be an Event when errors happens
                if (canvas instanceof Event) {
                    self.handleError(CommonImageError.WrongType, imageModel);
                    self.resetInputFields();
                    return;
                }
                // Convert to blob to get size
                canvas.toBlob((blob) => {
                        // Copy the blob properties
                        if (blob) {
                          imageModel.size = blob.size;
                        }

                        const fileName = imageModel.name;
                        const nBytes = imageModel.size;
                        let fileSizeUnit = '';
                        let sOutput = nBytes + ' bytes';
                        // optional code for multiples approximation
                        for (let aMultiples = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
                                nMultiple = 0, nApprox = nBytes / 1024; nApprox > 1; nApprox /= 1024, nMultiple++) {

                            sOutput = nApprox.toFixed(3) + ' ' + aMultiples[nMultiple] + ' (' + nBytes + ' bytes)';
                            fileSizeUnit = aMultiples[nMultiple];
                            imageModel.sizeUnit = fileSizeUnit;
                        }
                        
                        imageModel.sizeTxt = sOutput;

                        // call reader with new transformed image
                        reader.onload = function (evt) {

                            imageModel.fileContent = evt.target.result;
                            imageModel.id = sha1(imageModel.fileContent);

                            // keep scaling down the image until the image size is
                            // under max image size

                            /** previously in appConstants */
                            const maxSizeBytes = 1048576;
                            if (imageModel.size > maxSizeBytes) {

                                const imageTooBigError = new CommonImageProcessingError(CommonImageError.TooBig);

                                imageTooBigError.maxSizeAllowed = maxSizeBytes;
                                imageTooBigError.commonImage = imageModel;

                                self.filterError(imageTooBigError);
                            } else {
                                observer.next(imageModel);
                            }
                        };
                        reader.readAsDataURL(blob);
                    },

                    // What mime type to make the blob as and jpeg quality
                    'image/jpeg', 0.5);
            },
            {
                maxWidth: 2600 * scaleFactors.widthFactor,
                maxHeight: 3300 * scaleFactors.heightFactor,
                contain: true,
                canvas: true,
                meta: true,
                orientation: true
            }
        );
    },

    /**
     * Max retry scaling down for maxRetry times.
     */
    retryStrategy: function(maxRetry) {
        return function (errors) {
            return errors.pipe(scan(
                // return errors.pipe(
                (acc, error) => {
                    /**
                     * If the error is about file too big and we have not reach max retry
                     * yet, theyt keep going to scaling down.
                     */
                    if (acc < maxRetry && error.errorCode === CommonImageError.TooBig) {
                        return acc + 1;
                    } else {
                        /**
                         * For either conditions terminate the retry, propogate
                         * the error.
                         *
                         * 1. errors such as CannotRead or any other unknown errors
                         * not listed in imageModelError enum
                         * 2. Exceeded maxRetry
                         *
                         */
                        throw error;
                    }
                }, 0
            ), delay(2));
        };
    },

    readImage: function(imageFile, nextPageNumber, callback, invalidImageHandler) {
        const reader = new FileReader();

        reader.onload = function () {
            // Load into an image element
            const imgEl = document.createElement('img');

            // Wait for onload so all properties are populated
            imgEl.onload = (args) => {
                return callback(imgEl, imageFile, nextPageNumber);
            };

            imgEl.onerror = (args) => {
                // log it to the console

                const imageReadError = new CommonImageProcessingError(CommonImageError.CannotOpen);
                imageReadError.rawImageFile = imageFile;

                return invalidImageHandler(imageReadError);
            };
            imgEl.src = reader.result;
        };

        reader.readAsDataURL(imageFile);
    },

    readPDF: function(pdfFile, pdfScaleFactor, callback, error) {

        PDFJS.disableWorker = true;
        PDFJS.disableStream = true;

        const reader = new FileReader();
        let currentPage = 1;
        const canvas = document.createElement('canvas');
        const imgElsArray = [];
        const ctx = canvas.getContext('2d');

        reader.onload = function () {
            const docInitParams = {data: reader.result};
            // TODO - The 'as any' was added when porting to common library from MSP
            const loadingTask = PDFJS.getDocument(docInitParams);
            loadingTask.promise.then((pdfdoc) => {
                const numPages = pdfdoc.numPages;
                if (currentPage <= pdfdoc.numPages) {
                    getPage();
                }

                function getPage() {
                    pdfdoc.getPage(currentPage).then(function (page) {
                        const viewport = page.getViewport(pdfScaleFactor);

                        // Sometimes width and height can be NaN, so use viewBox instead.
                        if (viewport.width && viewport.height) {
                            canvas.height = viewport.height;
                            canvas.width = viewport.width;
                        } else {
                            canvas.height = viewport.viewBox[3];
                            canvas.width = viewport.viewBox[2];
                        }

                        const renderContext = {
                            canvasContext: ctx,
                            viewport: viewport
                        };

                        const renderTask = page.render(renderContext);
                        renderTask.promise.then(function () {
                            const imgEl = document.createElement('img');
                            if (ctx) {
                              // Image correction: flip image vertically.
                              ctx.translate(0, canvas.height);
                              ctx.scale(1, -1);
                              ctx.drawImage(canvas, 0, 0);  
                            }
                            imgEl.src = canvas.toDataURL();
                            imgElsArray.push(imgEl);
                            if (currentPage < numPages) {
                                currentPage++;
                                getPage();
                            } else {
                                callback(imgElsArray, pdfFile);
                            }
                        });
                    }, function (errorReason) {
                        error(errorReason);
                    });
                }
            }, function (errorReason) {
                error(errorReason);
            });
        };
        reader.readAsArrayBuffer(pdfFile);
    },


    /**
     * Non reversible image filter to take an existing canvas and make it gray scale
     * @param canvas
     */
    makeGrayScale: function(canvas) {
        const context = canvas.getContext('2d');

        if (context === null) {
          return;
        }
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            const brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
            // red
            data[i] = brightness;
            // green
            data[i + 1] = brightness;
            // blue
            data[i + 2] = brightness;
        }

        // overwrite original image
        context.putImageData(imageData, 0, 0);
    },

    handleImageFile: function(imageModel) {
        // Max images is 50.
        if (this.images.length >= 50) {
            return;
        } else {
            const images = this.images;
            images.push(imageModel);
            this.$emit('input', images);
        }
    },

    filterError: function(error) {
        this.resetInputFields();

        /**
         * Handle the error if the image is gigantic that after
         * 100 times of scaling down by 30% on each step, the image
         * is still over 1 MB.
         */
        if (error.errorCode) {
            if (CommonImageError.TooBig === error.errorCode) {
                this.handleError(CommonImageError.TooBig, error.image);
            } else if (CommonImageError.CannotOpen === error.errorCode) {
                if (!error.image) {
                    error.image = new CommonImage();
                    if (error.rawImageFile) {
                        error.image.name = error.rawImageFile.name;
                    }
                }
                this.handleError(CommonImageError.CannotOpen, error.image);
            } else if (CommonImageError.CannotOpenPDF === error.errorCode) {
                this.handleError(CommonImageError.CannotOpenPDF, error.image, error.errorDescription);
            } else {
                throw error;
            }
        }
    },

    handleError: function(error, imageModel, errorDescription) {
        if (!imageModel) {
            imageModel = new CommonImage();
        }
        // Add the error to imageModel
        imageModel.error = error;
        imageModel.errorDescription = errorDescription;

        this.errorMessage = this.getErrorMessage(imageModel.error);
    },

    getErrorMessage: function(error) {
      switch(error) {
        case CommonImageError.WrongType:
          return 'Wrong file type.';
        case CommonImageError.TooSmall:
          return 'File too small.'
        case CommonImageError.TooBig:
          return 'File too large.';
        case CommonImageError.AlreadyExists:
          return 'File already exists.';
        case CommonImageError.Unknown:
          return 'Unknown error.';
        case CommonImageError.CannotOpen:
          return 'Cannot open file.';
        case CommonImageError.PDFnotSupported:
          return 'This PDF file is not supported.';
        case CommonImageError.CannotOpenPDF:
          return 'Cannot open PDF file.'
        default:
          return 'An error has occurred.';
      }
    },

    /**
     * Reset input fields so that user can delete a file and
     * immediately upload that file again.
     */
    resetInputFields: function() {
        this.$refs.browseFileRef.value = '';
    },

    deleteImage: function(imageModel) {
        this.resetInputFields();

        const images = this.images;
        const index = images.findIndex(x => {
            return x.uuid === imageModel.uuid;
        });
        images.splice(index, 1);

        this.$emit('input', images);
    },

    /**
     * Return true if the image size is within range
     * @param file
     */
    checkImageDimensions: function(file) {
        if (file.naturalHeight < 0 ||
            file.naturalWidth < 0 ) {
            return false;
        }
        return true;
    }
  }
}
</script>

<style scoped>
.dropzone {
  border: 2px dashed lightgrey;
  margin-bottom: 10px;
  border-radius: 8px;
  padding: 2em 4em;
  height: 100%;
}

.preview-zone {
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
  align-items: left;
}
.preview-zone .preview-item {
  position: relative;
  height: 120px;
  text-align: left;
  margin-left: 1rem;
  margin-bottom: 1.5rem;
}
.preview-zone .preview-item .icon-upload {
  opacity: 0.3;
  margin: 0 auto 15px auto;
}
.preview-zone .preview-item .icon-upload:hover {
  cursor: pointer;
  opacity: 0.6;
}
.preview-zone .preview-item .text-upload:hover {
  cursor: pointer;
}

.thumbnail-container, .common-thumbnail .thumbnail-container {
  transition: 0.3s;
  transform: translateY(0);
}
.thumbnail-container .image-thumbnail, .thumbnail-container .image-thumbnail-width-priority, .common-thumbnail .thumbnail-container .image-thumbnail, .common-thumbnail .thumbnail-container .image-thumbnail-width-priority {
  padding: 2px 2px 0 2px;
  border-radius: 5px;
}
.thumbnail-container .image-thumbnail:hover, .thumbnail-container .image-thumbnail-width-priority:hover, .common-thumbnail .thumbnail-container .image-thumbnail:hover, .common-thumbnail .thumbnail-container .image-thumbnail-width-priority:hover {
  cursor: -webkit-zoom-in;
  cursor: zoom-in;
}
.thumbnail-container .demo-thumbnail, .common-thumbnail .thumbnail-container .demo-thumbnail {
  height: 100px !important;
  width: 100px;
  background-color: #CCC;
  display: flex;
  justify-content: center;
  align-items: center;
}
.thumbnail-container .demo-thumbnail:hover, .common-thumbnail .thumbnail-container .demo-thumbnail:hover {
  cursor: pointer !important;
}
.thumbnail-container .image-thumbnail, .common-thumbnail .thumbnail-container .image-thumbnail {
  max-height: 100px;
  height: auto;
  max-width: 100%;
}
.thumbnail-container .image-thumbnail-width-priority, .common-thumbnail .thumbnail-container .image-thumbnail-width-priority {
  max-width: 270px;
  width: auto;
  max-height: 100%;
}
.thumbnail-container:hover, .common-thumbnail .thumbnail-container:hover {
  box-shadow: 0px 15px 10px -10px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}
.thumbnail-container:hover .action-strip, .common-thumbnail .thumbnail-container:hover .action-strip {
  border: solid #CCC thin;
}
.thumbnail-container .action-strip, .common-thumbnail .thumbnail-container .action-strip {
  height: 2em;
  border-radius: 0px 0px 5px 5px;
  text-align: right;
  margin: 0 2px 0 2px;
  color: red;
  padding: 0.3em;
  transition: 0.3s;
  cursor: pointer;
}
.thumbnail-container .action-strip a, .common-thumbnail .thumbnail-container .action-strip a {
  text-decoration: none;
}

.svg-icon {
    width: 60px;
    height: 60px;
}
</style>
