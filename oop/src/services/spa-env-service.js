import axios from 'axios';

const SPA_ENV_SERVER_URL = '/oop/api/env';

/**
 * The list of all server envs we expect back from the spa-env-server. By adding
 * a value here it'll both be retrieved from the server, and the type/interface
 * will be updated.
 */
const serverEnvs = {
  SPA_ENV_OOP_MAINTENANCE_FLAG: '',
  SPA_ENV_OOP_MAINTENANCE_START: '',
  SPA_ENV_OOP_MAINTENANCE_END: '',
  SPA_ENV_OOP_MAINTENANCE_MESSAGE: '',
  SPA_ENV_OOP_ENABLE_ADDRESS_VALIDATOR: '',
};

// Used in HTTP request
const stringifiedEnvs = JSON.stringify(serverEnvs);

/**
 * All the serverEnvs, provided as an object, converted to a type which we can
 * use as an interface or for responses.  By doing it this way, we can
 * accomplish **both** of the following without duplication:
 *
 * 1. Automatically added to the HTTP request
 * 2. Added to the type/interface
 *
 * Thus, we're updating types and modifying runtime behaviour in one stroke.
 */

/**
 * Responsible for retrieving values from the spa-env-server on OpenShift.
 */
class SpaEnvService {
  
  values = {};

  loadEnvs() {
    const headers = {
      SPA_ENV_NAME: stringifiedEnvs,
    };
    const axiosPromise = axios.post(SPA_ENV_SERVER_URL, null, {
      headers: headers
    });
    axiosPromise
      .then((response) => {
        this.values = response.data;
      })
      .catch(() => {
        this.values = {};
      });
    return axiosPromise;
  }
}

export default new SpaEnvService();
