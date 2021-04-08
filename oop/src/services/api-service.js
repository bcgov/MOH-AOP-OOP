import axios from 'axios';

const BASE_API_PATH = '/oop/api/oopIntegration/';
const VALIDATE_LAST_NAME_PHN_URL = BASE_API_PATH + 'validatePhnName';
const VALIDATE_AH_DEP_URL = BASE_API_PATH + 'validateAhDep';
const SUBMIT_APPLICATION_URL = BASE_API_PATH + 'submission';

class ApiService {
  validateLastNamePhn(lastName, phn) {
    return axios.post(VALIDATE_LAST_NAME_PHN_URL, {
      lastName,
      phn,
    });
  }

  validateAhDep() {
    return axios.post(VALIDATE_AH_DEP_URL, {});
  }

  submitApplication() {
    return axios.post(SUBMIT_APPLICATION_URL, {});
  }
}

export default new ApiService();
