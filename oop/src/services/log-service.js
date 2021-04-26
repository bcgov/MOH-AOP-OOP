import axios from 'axios';
import { getBCTimestamp } from '../helpers/date';

const LOG_SERVICE_URL = '/oop/api/logging';

class LogService {
  logSubmission(logBody, uuid, refNumber) {
    const headers = {
      'Content-Type': 'application/json',
      logsource: window.location.hostname,
      timestamp: getBCTimestamp(),
      program: 'oop',
      severity: refNumber ? 'info' : 'error',
      referenceNumber: refNumber,
      applicationId: uuid,
    };
  
    const options = {
      headers: headers,
      responseType: 'text'
    };
  
    const body = {
      body: logBody
    };
  
    return axios.post(LOG_SERVICE_URL, body, options)
      // Use below then for troubleshooting if needed
      .then(() => {})
      .catch(() => {});
  }

  logError(logBody, uuid) {
    const headers = {
      'Content-Type': 'application/json',
      logsource: window.location.hostname,
      timestamp: getBCTimestamp(),
      program: 'oop',
      severity: 'error',
      referenceNumber: 'N/A',
      applicationId: uuid,
    };
  
    const options = {
      headers: headers,
      responseType: 'text'
    };
  
    const body = {
      body: logBody
    };
  
    return axios.post(LOG_SERVICE_URL, body, options)
      // Use below then for troubleshooting if needed
      .then(() => {})
      .catch(() => {});
  }
}

export default new LogService();
