import axios from "axios";
import moment from "moment";

export const log = (logItem, refNumber, uuid) => {
  const baseUrl = "/api/logging";

  const headers = {
    "Content-Type": "application/json",
    logsource: window.location.hostname,
    timestamp: moment().toISOString(),
    program: "msp",
    severity: "info",
    referenceNumber: refNumber,
    applicationId: uuid,
  };

  const options = { headers: headers, responseType: "text" };

  const body = {
    body: logItem
  };

  axios.post(baseUrl, body, options)
    .then(res => {
      console.log('Logging response:', res);
    })
    .catch(err => {
      console.log('Logging error:', err);
    });
};
