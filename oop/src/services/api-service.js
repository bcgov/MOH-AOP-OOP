import axios from 'axios';

const BASE_API_PATH = '/oop/api/';
const VALIDATE_ACCOUNT_TYPE_URL = BASE_API_PATH + 'oopIntegration/validateAccountType'; //needs to create an endpoint for validating account type
const VALIDATE_LAST_NAME_PHN_URL = BASE_API_PATH + 'oopIntegration/validatePhnName';
const VALIDATE_AH_DEP_URL = BASE_API_PATH + 'oopIntegration/validateAhDep';
const SUBMIT_APPLICATION_URL = BASE_API_PATH + 'oopIntegration/submission';

class ApiService {
  validateLastNamePhn(token, applicationUuid, lastName, phn) {
    const headers = this.getHeaders(token);
    return axios.post(VALIDATE_LAST_NAME_PHN_URL, {
      applicationUuid,
      lastName,
      phn,
    },
    {
      headers
    });
  }

  validateAccountType(token, applicationUuid, phn) {
    const headers = this.getHeaders(token);
    return axios.post(VALIDATE_ACCOUNT_TYPE_URL, {
      applicationUuid,
      phn,
    },
    {
      headers
    });
  }

  validateAhDep(token, applicationUuid, phn, dependentPHNs) {
    const headers = this.getHeaders(token);
    return axios.post(VALIDATE_AH_DEP_URL, {
      applicationUuid,
      phn,
      dependentPHNs,
    },
    {
      headers
    });
  }

  submitApplication(token) {
    const headers = this.getHeaders(token);
    return axios.post(SUBMIT_APPLICATION_URL, {
      // Include submission payload here (pass form state as param).
    },
    {
      headers
    });
  }

  getHeaders(token) {
    return {
      "Content-Type": "application/json",
      "Response-Type": "application/json",
      "X-Authorization": "Bearer " + token
    }
  }
}

export default new ApiService();
