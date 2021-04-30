import axios from "axios";
import moment from "moment-timezone";

export const log = (logItem, uuid, refNumber) => {
  const baseUrl = "/aop/api/logging";

  const headers = {
    "Content-Type": "application/json",
    logsource: window.location.hostname,
    timestamp: moment().tz("America/Vancouver").format(),
    program: "aop",
    severity: refNumber ? "info" : "error",
    referenceNumber: refNumber,
    applicationId: uuid,
  };

  const options = { headers: headers, responseType: "text" };

  const body = {
    body: logItem
  };

  axios.post(baseUrl, body, options)
    // Use below then for troubleshooting if needed
    .then(() => {})
    .catch(err => {
      console.log('Logging error:', err);
    });
};
