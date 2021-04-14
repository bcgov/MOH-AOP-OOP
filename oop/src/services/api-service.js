import axios from 'axios';

const BASE_API_PATH = '/oop/api/';
const VALIDATE_LAST_NAME_PHN_URL = BASE_API_PATH + 'oopIntegration/validatePhnName';
const VALIDATE_AH_DEP_URL = BASE_API_PATH + 'oopIntegration/validateAhDep';
const SUBMIT_APPLICATION_URL = BASE_API_PATH + 'oopIntegration/submission';

class ApiService {
  validateLastNamePhn(lastName, phn) {
    const headers = this.getHeaders(null);
    return axios.post(VALIDATE_LAST_NAME_PHN_URL, {
      lastName,
      phn,
    },
    {
      headers
    });
  }

  validateAhDep() {
    const headers = this.getHeaders(null);
    return axios.post(VALIDATE_AH_DEP_URL, {}, {
      headers
    });
  }

  submitApplication() {
    const headers = this.getHeaders(null);
    return axios.post(SUBMIT_APPLICATION_URL, {}, {
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
