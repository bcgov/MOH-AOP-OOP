import { v4 as uuidv4 } from 'uuid';

// NOTE: If you change anything in this enum, check image-error-modal.component.html for tests and file-uploader.component.ts:
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
  constructor(errorCode, errorDescription) {
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
