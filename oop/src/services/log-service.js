import axios from 'axios';
import { getBCTimestamp } from '../helpers/date';

const LOG_SERVICE_URL = '/oop/api/logging';
const PROGRAM = 'oop';

class LogService {
  logSubmission(uuid, message, refNumber) {
    return this._sendLog('info', uuid, message, refNumber);
  }

  logError(uuid, message) {
    return this._sendLog('error', uuid, message);
  }

  logNavigation(uuid, path, pageTitle) {
    const message = {
      event: 'navigation',
      url: path,
      title: pageTitle
    };
    return this._sendLog('info', uuid, message);
  }

  _sendLog(severity, uuid, logMessage, refNumber) {
    const headers = {
      'Content-Type': 'application/json',
      logsource: window.location.hostname,
      timestamp: getBCTimestamp(),
      program: PROGRAM,
      severity: severity,
      referenceNumber: refNumber ? refNumber : 'N/A',
      applicationId: uuid,
    };
  
    const options = {
      headers: headers,
      responseType: 'text'
    };
  
    const body = {
      message: logMessage
    };
  
    return axios.post(LOG_SERVICE_URL, body, options)
      // Use below then for troubleshooting if needed
      .then(() => {})
      .catch(() => {});
  }
}

export default new LogService();
