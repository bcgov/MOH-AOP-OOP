import axios from "axios";
import validate from "../services/validation-service";
import bypassCaptcha from "./captcha-bypass-service";

/********************************************************
 ATTACHMENT FUNCTIONS
********************************************************/
const setAttachmentUrl = (attachment, uuid) => {
  let url =
    "/aop/api/submit-attachment/" + uuid + "/attachments/" + attachment.uuid;

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
  console.log('attachment:', attachment);

  const url = setAttachmentUrl(attachment, applicationUUID);

  const headers = setAttachmentHeaders(attachment.contentType, token);

  const config = { headers };

  const binary = atob(attachment.source.split(",")[1]);
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
          console.log('error 3:', error);
          return reject(error);
        }
      )
      .catch(error => {
        console.log('error 2:', error);
        return error;
      });
  });
};

/********************************************************
 APPLICATION FUNCTIONS
********************************************************/
const setApplicationUrl = uuid => "/aop/api/aopIntegration/" + uuid;

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
    uuid: state.uuid
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
const escapeSpecialChar = str => {
  return str
    .replace(/[\\]/g, '')
    .replace(/[\"]/g, '')
    .replace(/[\/]/g, '')
    .replace(/[\b]/g, '')
    .replace(/[\f]/g, '')
    .replace(/[\n]/g, '')
    .replace(/[\r]/g, '')
    .replace(/[\t]/g, '');
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
  app.phoneExtension = trimPhone(state.phoneExtension);
  app.organization = escapeSpecialChar(state.organization);
  app.facility = escapeSpecialChar(state.facility);
  app.submissionType = state.submissionType;
  app.primaryNumber = state.primaryNumber;
  app.primaryLastName = state.primaryLastName;
  app.secondaryNumber = state.secondaryNumber;
  app.secondaryLastName = state.secondaryLastName;
  app.comments = escapeSpecialChar(state.comments);

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
export const submitApplication = async (state) => {
  const AOPApplication = prepareAOPApplication(state);
  const token = bypassCaptcha(AOPApplication.uuid, state.salt);

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
              return reject('error in sendAOPApplication:', error);
            });
        })
        .catch(error => {
          console.log('error 1:', error);
          return reject('error in sendAttachments:', error);
        });
    });
  });
};
