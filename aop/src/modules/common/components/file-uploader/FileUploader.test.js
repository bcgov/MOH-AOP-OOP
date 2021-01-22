import FileUploader, {
  CommonImageProcessingError,
  CommonImage,
  CommonImageScaleFactorsImpl,
  CommonImageError
} from "./FileUploader.vue";
import { mount } from "@vue/test-utils";
import { render, fireEvent } from "@testing-library/vue";
import { jest, beforeEach } from '@jest/globals';
const fs = require('fs');
const sha1 = require('sha1');
import sampleImage from './test-files/sample.jpg';


let mockViewport;
let mockRenderPromise;
let mockGetPage;
let PDFJS = require('pdfjs-dist/build/pdf');

jest.mock('pdfjs-dist/build/pdf', () => {
  const { jest } = require('@jest/globals');
  return {
    getDocument: jest.fn(() => {
      return {
        promise: {
          then: (resolve) => {
            const pdfDoc = {
              numPages: 2,
              getPage: mockGetPage
            };
            resolve(pdfDoc);
          }
        }
      };
    })
  };
});

const mockDocument = document;
jest.mock('blueimp-load-image', () => {
  return (fileSrc, callback) => {
    const canvas = mockDocument.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;
    callback(canvas);
  }
});

const b64toBlob = (b64Data, contentType='', sliceSize=512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, {type: contentType});
  return blob;
}

function getFilterError(error) {
  return {
    errorCode: error,
    image: new CommonImage('content'),
    rawImageFile: {
      name: 'name.jpg'
    }
  };
}

describe("CommonImageProcessingError", () => {
  test("creates a new instance", () => {
    const instance = new CommonImageProcessingError("error");
    expect(instance).toBeDefined();
  });
});

describe("CommonImage", () => {
  test("creates a new instance", () => {
    const instance = new CommonImage("file content");
    expect(instance).toBeDefined();
  });

  test("toJSON()", () => {
    const instance = new CommonImage("file content");
    expect(instance.toJSON()).toBeDefined();
  });
});

describe("FileUploader component", () => {
  beforeEach(() => {
    mockViewport = {
      width: 10,
      height: 10
    }
    mockRenderPromise = {
      promise: {
        then: (renderCallback) => {
          renderCallback();
        }
      }
    };
    mockGetPage = () => {
      const page = {
        getViewport: () => {
          return mockViewport;
        },
        render: () => {
          return mockRenderPromise;
        }
      };
      return {
        then: (resolve) => {
          resolve(page);
        }
      };
    };
  });

  test("matches the success snapshot", () => {
    const wrapper = mount(FileUploader, {});
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("dragover event", () => {
    const { container } = render(FileUploader, {
      propsData: {
        value: [],
      }
    });
    fireEvent.dragOver(container.querySelector(".dropzone"));
  });

  test("drop event", () => {
    const { container } = render(FileUploader, {
      propsData: {
        value: [],
      }
    });
    fireEvent.drop(container.querySelector(".dropzone"), {
      dataTransfer: {
        files: []
      }
    });
  });
  
  test("change event", (done) => {
    const { container } = render(FileUploader, {
      propsData: {
        value: [],
        id: 'test'
      }
    });
    const imageContents = fs.readFileSync('src/modules/common/components/file-uploader/test-files/sample.jpg', {encoding: 'base64'});
    const blob = b64toBlob(imageContents, 'image/jpg');
    const file = new File([blob], 'sample.pdf');
    const changeEventInit = {
      target: {
        files: [file]
      }
    };
    fireEvent.change(container.querySelector("#test"), changeEventInit);
    setTimeout(() => {
      done();
    }, 4000);
  });

  test("change event with empty `files` array", () => {
    const { container } = render(FileUploader, {
      propsData: {
        value: [],
        id: 'test'
      }
    });
    const changeEventInit = {
      target: {
        files: []
      }
    };
    fireEvent.change(container.querySelector("#test"), changeEventInit);
  });
  

  test("Click `add` button.", () => {
    const { container } = render(FileUploader, {
      propsData: {
        value: [],
        id: 'test'
      }
    });
    fireEvent.click(container.querySelector("a.common-thumbnail"));
  });

  test("checkImageExists(): false", () => {
    const wrapper = mount(FileUploader, {});
    const image = new CommonImage("file content");
    let imageExists = wrapper.vm.checkImageExists(image, []);
    expect(imageExists).toBeFalsy();
    imageExists = wrapper.vm.checkImageExists(image, [new CommonImage("file content")]);
    expect(imageExists).toBeFalsy();
  });

  test("checkImageExists(): true", () => {
    const wrapper = mount(FileUploader, {});
    const fileContent = "file content";
    const image = new CommonImage(fileContent)
    image.id = sha1(fileContent);

    const imageExists = wrapper.vm.checkImageExists(image, [image]);
    expect(imageExists).toBeTruthy();
  });

  test("resizeImage()", () => {
    jest.mock('blueimp-load-image', () => (image, onload) => {
      onload();
    });
    const wrapper = mount(FileUploader, {});
    const image = document.createElement("img");
    image.src = sampleImage;
    const observer = {
      next: jest.fn()
    }
    wrapper.vm.resizeImage(
      image,
      wrapper.vm,
      new CommonImageScaleFactorsImpl(1,1),
      observer,
      0,
      true
    );
  });

  test("retryStrategy()", () => {
    const wrapper = mount(FileUploader, {});
    const error = {
      errorCode: CommonImageError.TooBig,
      pipe: jest.fn()
    }
    const callback = wrapper.vm.retryStrategy(1);
    callback(error);
  });

  describe("readImage()", () => {
    let wrapper;
    let imageContents;
    let blob;
    let imageFile;

    beforeEach(() => {
      wrapper = mount(FileUploader, {});
      imageContents = fs.readFileSync('src/modules/common/components/file-uploader/test-files/sample.jpg', {encoding: 'base64'});
      blob = b64toBlob(imageContents, 'image/jpg');
      imageFile = new File([blob], 'sample.jpg');
    });

    test("readImage() success", () => {
      wrapper.vm.readImage(imageFile, 0, () => {}, () => {});
    });
  });

  describe("readPDF()", () => {
    let wrapper;
    let pdfContents;
    let blob;
    let pdfFile;

    beforeEach(() => {
      wrapper = mount(FileUploader, {});
      pdfContents = fs.readFileSync('src/modules/common/components/file-uploader/test-files/sample.pdf', {encoding: 'base64'});
      blob = b64toBlob(pdfContents, 'application/pdf');
      pdfFile = new File([blob], 'sample.pdf');
    });
    
    test("readPDF()", (done) => {
      wrapper.vm.readPDF(
        pdfFile,
        new CommonImageScaleFactorsImpl(1,1),
        () => {
          done();
        }
      );
    });
  
    test("readPDF() with viewBox", (done) => {
      mockViewport = {
        width: null,
        height: null,
        viewBox: [null, null, 10, 10]
      }
      wrapper.vm.readPDF(
        pdfFile,
        new CommonImageScaleFactorsImpl(1,1),
        () => {
          done();
        }
      );
      
    });

    test("readPDF() throw page render error", (done) => {
      mockGetPage = () => {
        return {
          then: (resolve, reject) => {
            reject();
          }
        };
      };
      wrapper.vm.readPDF(
        pdfFile,
        new CommonImageScaleFactorsImpl(1,1),
        null,
        () => {
          done();
        }
      );
    });

    test("readPDF() throw error on getDocument", (done) => {
      PDFJS.getDocument = jest.fn(() => {
        return {
          promise: {
            then: function(resolve, reject) {
              reject();
            }
          }
        }
      });
      wrapper.vm.readPDF(
        pdfFile,
        new CommonImageScaleFactorsImpl(1,1),
        null,
        () => {
          done();
        }
      );
    });
  });
  

  test("makeGrayScale()", () => {
    const wrapper = mount(FileUploader, {});
    const canvas = document.createElement('canvas');
    canvas.width = 10;
    canvas.height = 10;
    wrapper.vm.makeGrayScale(canvas);
  });

  test("makeGrayScale() null context", () => {
    const wrapper = mount(FileUploader, {});
    const canvas = {
      getContext: () => {
        return null;
      }
    };
    wrapper.vm.makeGrayScale(canvas);
  });

  test("handleImageFile()", () => {
    const wrapper = mount(FileUploader, {});
    let image = new CommonImage("content");
    wrapper.vm.handleImageFile(image);
    for(let i=0; i<50; i++) {
      image = new CommonImage("content");
      wrapper.vm.handleImageFile(image);
    }
  });

  test("filterError()", () => {
    const wrapper = mount(FileUploader, {});
    wrapper.vm.filterError(getFilterError(CommonImageError.TooBig));
    wrapper.vm.filterError({
      errorCode: CommonImageError.CannotOpen,
      rawImageFile: {
        name: 'name.jpg'
      }
    });
    wrapper.vm.filterError(getFilterError(CommonImageError.CannotOpenPDF));
  });

  test("filterError() other error", () => {
    const wrapper = mount(FileUploader, {});
    const error = getFilterError(CommonImageError.AlreadyExists);
    expect(() => {
      wrapper.vm.filterError(error);
    }).toThrow();
  });

  test("handleError() handle empty image model", () => {
    const wrapper = mount(FileUploader, {});
    wrapper.vm.handleError(null, null, null);
  });

  test("getErrorMessage()", () => {
    const wrapper = mount(FileUploader, {});
    expect(wrapper.vm.getErrorMessage(CommonImageError.WrongType)).toBe('Wrong file type.');
    expect(wrapper.vm.getErrorMessage(CommonImageError.TooSmall)).toBe('File too small.');
    expect(wrapper.vm.getErrorMessage(CommonImageError.TooBig)).toBe('File too large.');
    expect(wrapper.vm.getErrorMessage(CommonImageError.AlreadyExists)).toBe('File already exists.');
    expect(wrapper.vm.getErrorMessage(CommonImageError.Unknown)).toBe('Unknown error.');
    expect(wrapper.vm.getErrorMessage(CommonImageError.CannotOpen)).toBe('Cannot open file.');
    expect(wrapper.vm.getErrorMessage(CommonImageError.PDFnotSupported)).toBe('This PDF file is not supported.');
    expect(wrapper.vm.getErrorMessage(CommonImageError.CannotOpenPDF)).toBe('Cannot open PDF file.');
    expect(wrapper.vm.getErrorMessage(null)).toBe('An error has occurred.');
  });

  test("deleteImage()", () => {
    const wrapper = mount(FileUploader, {});
    const image = new CommonImage("content");
    wrapper.vm.$emit('input', [image]);
    wrapper.vm.deleteImage(image);
    expect(wrapper.vm.images.length).toBe(0);
  });

  test("checkImageDimensions()", () => {
    const wrapper = mount(FileUploader, {});
    expect(wrapper.vm.checkImageDimensions({
      naturalWidth: 10,
      naturalHeight: 10
    })).toBeTruthy();

    expect(wrapper.vm.checkImageDimensions({
      naturalWidth: -10,
      naturalHeight: 10
    })).toBeFalsy();

    expect(wrapper.vm.checkImageDimensions({
      naturalWidth: 10,
      naturalHeight: -10
    })).toBeFalsy();
  });
});
