import axios from "axios";
import validate from "../services/validation-service";
import { v4 as uuidv4 } from "uuid";
import bypassCaptcha from "./captcha-bypass-service";

/********************************************************
 ATTACHMENT FUNCTIONS
********************************************************/
const setAttachmentUrl = (attachment, uuid) => {
  let url =
    "/api/submit-attachment/" + uuid + "/attachments/" + attachment.uuid;

  url += "?programArea=CLAIMS";

  if (attachment.documentType === "AOPCREDENTIAL") {
    url += "&attachmentDocumentType=AOPCREDENTIAL";
  } else {
    url += "&attachmentDocumentType=AOPFORM";
  }

  url += "&contentType=" + attachment.contentType;

  url += "&imageSize=" + attachment.size;

  return url;
};

const setAttachmentHeaders = (contentType, token) => {
  return contentType === "application/json"
    ? {
        "Content-Type": contentType,
        "Response-Type": "application/json",
        "X-Authorization": "Bearer " + token
      }
    : {
        "Content-Type": contentType,
        "Access-Control-Allow-Origin": "*",
        "X-Authorization": "Bearer " + token
      };
};

const sendAttachment = (token, applicationUUID, attachment) => {
  const url = setAttachmentUrl(attachment, applicationUUID);

  const headers = setAttachmentHeaders(attachment.contentType, token);

  const config = { headers };

  const binary = atob(attachment.fileContent.split(",")[1]);
  const array = [];

  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }

  const blob = new Blob([new Uint8Array(array)], {
    type: attachment.contentType
  });

  return axios.post(url, blob, config);
};

const sendAttachments = (token, applicationUUID, attachments) => {
  return new Promise((resolve, reject) => {
    // Make a list of promises for each attachment
    const attachmentPromises = [];
    for (const attachment of attachments) {
      attachmentPromises.push(
        sendAttachment(token, applicationUUID, attachment)
      );
    }

    // Execute all promises are waiting for results
    return Promise.all(attachmentPromises)
      .then(
        responses => {
          return resolve(responses);
        },
        error => {
          return reject(error);
        }
      )
      .catch(error => {
        return error;
      });
  });
};

/********************************************************
 APPLICATION FUNCTIONS
********************************************************/
const setApplicationUrl = uuid => "/api/aopIntegration/" + uuid;

const setApplicationHeaders = token => ({
  "Content-Type": "application/json",
  "Response-Type": "application/json",
  "X-Authorization": "Bearer " + token
});

const sendAOPApplication = (token, app) => {
  const url = setApplicationUrl(app.uuid);

  const headers = setApplicationHeaders(token);

  const config = { headers };

  return axios.post(url, app, config);
};

// assignmentOfPayment ready for submission
const prepareAOPApplication = state => {
  const preparedApp = {
    assignmentOfPayment: convertAOPApp(state),
    attachments: convertAttachments([
      ...state.uploadedForms,
      ...state.uploadedCredentials
    ]),
    uuid: uuidv4()
  };

  return preparedApp;
};

// trim phone number
const trimPhone = ph => {
  const trimmedPhone = Array.from(ph).filter(
    char => char !== " " && char !== "-" && char !== "(" && char !== ")"
  );
  return trimmedPhone.join('');
}

// JSON escape
const escapeSpecialChar = (str, maxlength) => {
  return str
    .replace(/[\\]/g, '\\\\')
    .replace(/[\"]/g, '\\\"')
    .replace(/[\/]/g, '\\/')
    .replace(/[\b]/g, '\\b')
    .replace(/[\f]/g, '\\f')
    .replace(/[\n]/g, '\\n')
    .replace(/[\r]/g, '\\r')
    .replace(/[\t]/g, '\\t')
    .substring(0, maxlength);
}

// get AOP data ready for submission
const convertAOPApp = state => {
  const app = {};
  app.uploadType = state.uploadType;
  app.credentialsRequired = state.credentialsRequired === "true" ? true : false;
  app.firstName = state.firstName;
  app.lastName = state.lastName;
  app.emailAddress = state.emailAddress;
  app.phoneNumber = trimPhone(state.phoneNumber);
  app.organization = escapeSpecialChar(state.organization, 70);
  app.facility = escapeSpecialChar(state.facility, 70);
  app.submissionType = state.submissionType;
  app.primaryNumber = state.primaryNumber;
  app.primaryLastName = state.primaryLastName;
  app.secondaryNumber = state.secondaryNumber;
  app.secondaryLastName = state.secondaryLastName;
  app.comments = escapeSpecialChar(state.comments, 210);

  return app;
};

// get attachments ready for submission in assignmentOfPayment submission
const convertAttachments = images => {
  const output = [];
  images.map((image, i) => {
    const partial = {
      attachmentDocumentType: image.documentType,
      attachmentOrder: (i + 1).toString(),
      attachmentUuid: image.uuid
    };
    output.push(partial);
  });

  return output;
};

/********************************************************
 TOP LEVEL FUNCTION
********************************************************/
export const submitApplication = async state => {
  const AOPApplication = prepareAOPApplication(state);
  const token = await bypassCaptcha(AOPApplication.uuid);

  return new Promise((resolve, reject) => {
    if (!token) reject("Invalid token");

    // validating application data before sending
    validate(AOPApplication).then(async validator => {
      
      const valid = await validator(AOPApplication);

      if (!valid) {

        // if there are multiple errors only show one
        const error = `Invalid value in field '${ validator.errors[0].dataPath}'`; 
        
        return reject(error);
        
      }

      // send attachments first, then the application if the attachments are sent successfully
      return sendAttachments(token, AOPApplication.uuid, [
        ...state.uploadedForms,
        ...state.uploadedCredentials
      ])
        .then(() => {
          return sendAOPApplication(token, AOPApplication)
            .then(applicationResponse => {
              // contains reference number
              return resolve(applicationResponse);
            })
            .catch(error => {
              return reject(error);
            });
        })
        .catch(error => {
          return reject(error);
        });
    });
  });
};
