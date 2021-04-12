import axios from 'axios';

const BASE_API_PATH = '/oop/api/';
const CAPTCHA_URL = BASE_API_PATH + 'captcha/captcha';
const CAPTCHA_VERIFY_URL = BASE_API_PATH + 'captcha/verify/captcha';
const CAPTCHA_AUDIO_URL = BASE_API_PATH + 'captcha/captcha/audio';

class ApiService {
  getCaptcha(nonce) {
    const headers = this.getHeaders(null);
    return axios.post(CAPTCHA_URL, {
      nonce
    },
    {
      headers
    });
  }

  verifyCaptcha() {
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
