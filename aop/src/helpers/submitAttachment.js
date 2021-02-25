import axios from 'axios';

const setFileUrl = (attachment, uuid) => {
  let url =
    '/msp/api/submit-attachment/' +
    uuid +
    '/attachments/' +
    attachment.uuid;

    url += '?programArea=CLAIMS';
    
    if (isCredentials) {
      url += '&attachmentDocumentType=AOPCREDENTIAL';
    } else {
      url += '&attachmentDocumentType=AOPFORM';
  }

  url += '&contentType=' + attachment.contentType;

  url += '&imageSize=' + attachment.size;
  
  return url;
}

const setHeaders = (contentType, token) => {
  return contentType === 'application/json'
    ? new HttpHeaders({
        'Content-Type': contentType,
        'Response-Type': 'application/json',
        'X-Authorization': 'Bearer ' + token
      })
    : new HttpHeaders({
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
        'X-Authorization': 'Bearer ' + token
      });
}


const sendFile = (token, applicationUUID, attachment) => {
  const url = setFileUrl(attachment, applicationUUID);

  const headers = setHeaders(attachment.contentType, token);

  const options = { headers, responseType: 'text' };

  const binary = atob(attachment.fileContent.split(',')[1]);
  const array = [];

  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }

  const blob = new Blob([new Uint8Array(array)], {
    type: attachment.contentType
  });

  return axios.post(url, blob, options);
}
