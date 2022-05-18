<template>
  <div>
    <div class="mb-3 button-container">
      <input
        type="file"
        :id="id"
        ref="browseFileRef"
        accept="image/*,application/pdf"
        style="display:none;"
        tabindex="0"
        :name="id"
        :required="required"
        autocomplete="off"
        @change='handleChangeFile($event)'/>
      <Button
        label="Select a file"
        :styling="buttonStyles"
        :disabled="value && value.length > 0"
        v-on:button-click="openFileDialog()"
      />
      <div v-if="value && value.length > 0" class="ml-3 d-flex">{{ value[0].name.slice(0, -7) }} 
        <button class="remove ml-2" @click="deleteAllImages"><font-awesome-icon icon="times" />Remove</button>
      </div>
      <div v-else class="ml-3">No file selected</div>
    </div>

    <div class="text-danger">{{ errorMessage }}</div>

    <!-- This hidden canvas is used to transform / resize images -->
    <canvas ref="canvas" style="display:none;"></canvas>
  </div>
</template>

<script>
import Button from '../Button.vue';
import * as PDFJS from 'pdfjs-dist/es5/build/pdf';
import pdfJsWorker from 'pdfjs-dist/es5/build/pdf.worker.entry';
import sha1 from 'sha1';
import { v4 as uuidv4 } from 'uuid';

// Polyfills
import 'mdn-polyfills/MouseEvent';
import 'mdn-polyfills/HTMLCanvasElement.prototype.toBlob';

PDFJS.workerSrc = pdfJsWorker;
PDFJS.disableWorker = true;
PDFJS.disableStream = true;

const MIN_IMAGE_SIZE_BYTES = 20000;
const MAX_IMAGE_SIZE_BYTES = 1048576;
const MAX_IMAGE_COUNT = 20;
const IMAGE_REDUCTION_SCALE_FACTOR = 0.8;
const IMAGE_CONTENT_TYPE = 'image/jpeg';
const JPEG_COMPRESSION = 0.8;

export default {
  name: 'FileUploader',
  components: {
    Button
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: ""
    },
    required: {
      type: Boolean,
      default: false
    },
  },
  data: () => {
    return {
      errorMessage: "",
      isProcessingFile: false,
    }
  },
  methods: {
    openFileDialog() {
      this.$refs.browseFileRef.dispatchEvent(new MouseEvent("click"));
    },
    handleChangeFile(event) {
      const files = event.target.files;

      // Don't proceed if no file(s) were selected.
      if (!files || files.length === 0) {
        return;
      }
      
      // Clear previous error message.
      this.errorMessage = null;

      // Process each file selected.
      for (let i=0; i<files.length; i++) {
        this.processFile(files[i]);
      }

      // Clear selected files.
      event.target.value = '';
    },
    async processFile(file) {
      this.isProcessingFile = true;

      switch (file.type) {
        case 'application/pdf':
          try {
            const images = await this.processPDFFile(file);
            this.addFileImages(file.name, images);
          } catch(errorMessage) {
            this.errorMessage = errorMessage;
          }
          break;
        default:
          this.errorMessage = "Invalid document. Please provide document in PDF format";
          break;
      }
      this.isProcessingFile = false;
    },
    processPDFFile(file) {
      const reader = new FileReader();
      const images = [];

      return new Promise((resolve, reject) => {
        reader.onload = () => {
          const docInitParams = {
            data: reader.result
          };
          const loadingTask = PDFJS.getDocument(docInitParams);
          loadingTask.promise.then(async (pdfDoc) => {
            if (pdfDoc.numPages > MAX_IMAGE_COUNT) {
              reject('This PDF has too many pages to process.');
              return;
            }
            for (let pageNumber = 1; pageNumber <= pdfDoc.numPages; pageNumber++) {
              const errorMessage = `Error reading page ${pageNumber} of the PDF.`;
              try {
                const imageSource = await this.getPage(pdfDoc, pageNumber);
                const imageData = await this.getImageData(imageSource);
                if (imageData.size > MAX_IMAGE_SIZE_BYTES) {
                  imageData = await this.scaleImage(imageData);
                } else if (imageData.size < MIN_IMAGE_SIZE_BYTES) {
                  // If no pages were large enough, reject with an error message
                  if (pageNumber === pdfDoc.numPages && images.length < 1) {
                    reject(`PDF size is too small, please upload a larger PDF`);
                  } else {
                    // If a single page is too small (less than a line of text) do not include it
                    console.log(`Image size of page ${pageNumber} is too small, removing...`);
                  }
                } else {
                  images.push(imageData);
                }
              } catch (error) {
                console.log(errorMessage, error);
                reject(errorMessage);
                return;
              }
            }
            resolve(images);
          }, () => {
            reject('Error reading PDF.');
          });
        };
        reader.readAsArrayBuffer(file);
      });
    },

    getPage(pdfDoc, pageNumber) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      return new Promise((resolve, reject) => {
        pdfDoc.getPage(pageNumber).then((page) => {
          const viewport = page.getViewport({ scale: 2.0 });

          // Sometimes width and height can be NaN, so use viewBox instead.
          if (viewport.width && viewport.height) {
              canvas.width = viewport.width;
              canvas.height = viewport.height;
          } else {
              canvas.width = viewport.viewBox[2];
              canvas.height = viewport.viewBox[3];
          }

          const renderContext = {
            canvasContext: ctx,
            viewport: viewport
          };

          const renderTask = page.render(renderContext);
          renderTask.promise.then(() => {
            const dataURL = canvas.toDataURL(IMAGE_CONTENT_TYPE, JPEG_COMPRESSION);
            resolve(dataURL);
          },
          (error) => {
            reject(error);
          });
        }).catch((error) => {
          reject(error);
        });
      });
    },

    getImageData(imageSource) {
      return new Promise((resolve, reject) => {
        // We create an image to receive the Data URI
        const img = document.createElement('img');

        // When the event "onload" is triggered we can resize the image.
        img.onload = async () => {
          // We create a canvas and get its context.
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const width = Math.floor(img.width);
          const height = Math.floor(img.height);

          // We set the dimensions at the wanted size.
          canvas.width = width;
          canvas.height = height;

          // We resize the image with the canvas method drawImage();
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(async (blob) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              resolve({
                fileContent: event.target.result,
                size: blob.size,
                width,
                height,
              });
            };
            reader.onerror = () => {
              reject();
            }
            reader.readAsDataURL(blob);
          }, IMAGE_CONTENT_TYPE, JPEG_COMPRESSION);
        };

        img.onerror = () => {
          reject();
        }

        // We put the Data URI in the image's src attribute
        img.src = imageSource;
      });
    },

    async scaleImage(imageData) {
      return new Promise((resolve, reject) => {
        // We create an image to receive the Data URI
        const img = document.createElement('img');

        // When the event "onload" is triggered we can resize the image.
        img.onload = async () => {
          // We create a canvas and get its context.
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          const targetWidth = Math.floor(img.width * IMAGE_REDUCTION_SCALE_FACTOR);
          const targetHeight = Math.floor(img.height * IMAGE_REDUCTION_SCALE_FACTOR);

          // We set the dimensions at the wanted size.
          canvas.width = targetWidth;
          canvas.height = targetHeight;

          // We resize the image with the canvas method drawImage();
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

          canvas.toBlob(async (blob) => {
            const reader = new FileReader();
            reader.onload = async (event) => {
              const scaledImageData = {
                fileContent: event.target.result,
                size: blob.size,
                width: targetWidth,
                height: targetHeight,
              };

              if (blob.size > MAX_IMAGE_SIZE_BYTES) {
                resolve(await this.scaleImage(scaledImageData))
              } else {
                resolve(scaledImageData);
              }
            };
            reader.readAsDataURL(blob);
          }, IMAGE_CONTENT_TYPE, JPEG_COMPRESSION);
        };

        img.onerror = () => {
          reject();
        };

        // We put the Data URI in the image's src attribute
        img.src = imageData.fileContent;
      });
    },

    addFileImages(fileName, imageObjects) {
      const images = [];
      // Create image objects.
      for (let i=0; i < imageObjects.length; i++) {
        const imageObject = imageObjects[i];
        const hash = sha1(imageObject.fileContent);
        const uuid = uuidv4();
        const size = imageObject.size;

        images.push({
          name: `${fileName}.page-${i+1}`,
          contentType: IMAGE_CONTENT_TYPE,
          fileContent: imageObject.fileContent,
          documentType: this.documentType,
          description: this.description,
          hash,
          uuid,
          size
        });
      }

      // Merge new images with existing images.
      if (this.allowMultipleFiles) {
        const imagesToAdd = [];
        images.forEach((image) => {
          const existingIndex = this.value.findIndex((existingImage) => existingImage.hash === image.hash);
          // If image doesn't already exist, 
          if (existingIndex === -1) {
            imagesToAdd.push(image);
          }
        });
        this.$emit('input', [
          ...this.value,
          ...imagesToAdd,
        ]);
      }
      // Else, replace images in model.
      else {
        this.$emit('input', images);
      }
    },
    deleteAllImages() {
      this.$emit("input", []);
    },
  },
  computed: {
    buttonStyles() {
      return this.images && this.images.length > 0 ? 'BC-Gov-SecondaryButton BC-Gov-SecondaryButton-disabled' : 'BC-Gov-SecondaryButton';
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

.thumbnail-container,
.common-thumbnail .thumbnail-container {
  transition: 0.3s;
  transform: translateY(0);
}
.thumbnail-container .image-thumbnail,
.thumbnail-container .image-thumbnail-width-priority,
.common-thumbnail .thumbnail-container .image-thumbnail,
.common-thumbnail .thumbnail-container .image-thumbnail-width-priority {
  padding: 2px 2px 0 2px;
  border-radius: 5px;
}
.thumbnail-container .image-thumbnail:hover,
.thumbnail-container .image-thumbnail-width-priority:hover,
.common-thumbnail .thumbnail-container .image-thumbnail:hover,
.common-thumbnail .thumbnail-container .image-thumbnail-width-priority:hover {
  cursor: -webkit-zoom-in;
  cursor: zoom-in;
}
.thumbnail-container .demo-thumbnail,
.common-thumbnail .thumbnail-container .demo-thumbnail {
  height: 100px !important;
  width: 100px;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}
.thumbnail-container .demo-thumbnail:hover,
.common-thumbnail .thumbnail-container .demo-thumbnail:hover {
  cursor: pointer !important;
}
.thumbnail-container .image-thumbnail,
.common-thumbnail .thumbnail-container .image-thumbnail {
  max-height: 100px;
  height: auto;
  max-width: 100%;
}
.thumbnail-container .image-thumbnail-width-priority,
.common-thumbnail .thumbnail-container .image-thumbnail-width-priority {
  max-width: 270px;
  width: auto;
  max-height: 100%;
}
.thumbnail-container:hover,
.common-thumbnail .thumbnail-container:hover {
  box-shadow: 0px 15px 10px -10px rgba(0, 0, 0, 0.1);
  transform: translateY(-5px);
}
.thumbnail-container:hover .action-strip,
.common-thumbnail .thumbnail-container:hover .action-strip {
  border: solid #ccc thin;
}
.thumbnail-container .action-strip,
.common-thumbnail .thumbnail-container .action-strip {
  height: 2em;
  border-radius: 0px 0px 5px 5px;
  text-align: right;
  margin: 0 2px 0 2px;
  color: #b33238;
  padding: 0.3em;
  transition: 0.3s;
  cursor: pointer;
}
.thumbnail-container .action-strip a,
.common-thumbnail .thumbnail-container .action-strip a {
  text-decoration: none;
}

.svg-icon {
  width: 60px;
  height: 60px;
}

.text-danger {
  color: #D8292F !important;
}

.BC-Gov-SecondaryButton {
  background: none;
  border-radius: 4px;
  border: 3px solid #003366;
  padding: 5px 20px;
  text-align: center;
  text-decoration: none;
  display: block;
  cursor: pointer;
  color: #003366;
}

.BC-Gov-SecondaryButton:hover {
  opacity: 0.80;
  background-color: #003366;
  color: #FFFFFF;
}

.BC-Gov-SecondaryButton:focus {
  outline-offset: 1px;
  outline: 4px solid #3B99FC;
}

.BC-Gov-SecondaryButton:active {
  opacity: 1;
}

.BC-Gov-SecondaryButton-disabled {
    background-color: white;
    opacity: 0.3;
    border: 2px solid #003366;
    cursor: not-allowed;
}

.BC-Gov-SecondaryButton-disabled:hover {
  opacity: 0.3;
  background-color: white;
  color: #036;
}

.button-container {
  display: flex;
  align-items: center;
}

.remove {
  display: flex;
  align-items: center;
  color: #D8292F;
  background: none;
  border: none;
  padding-top: 0;
  padding-bottom: 0;
}

.fa-times {
  height: 1.5rem;
  width :1.5rem;
}

@media (max-width: 576px) {
  .button-container {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
