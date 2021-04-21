import axios from 'axios';
import { formatISODate } from '../helpers/date';

const BASE_API_PATH = '/oop/api/';
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

  submitApplication(token, formState) {
    const dependentPhns = [];
    formState.dependentPhns.forEach((phn) => {
      if (phn.value) {
        dependentPhns.push(phn.value);
      }
    });
    const addressLines = [];
    formState.addressLines.forEach((addressLine) => {
      if (addressLine.value) {
        addressLines.push(addressLine.value);
      }
    });
    const whoIsMoving = formState.accountType === 'DEP' ? 'DEP_ONLY' : formState.personMoving
    const jsonPayload = {
      uuid: formState.applicationUuid,
      submissionDate: formatISODate(formState.submissionDate),
      outOfProvinceMove: {
        lastName: formState.lastName,
        phn: formState.phn,
        phoneNumber: formState.phone,
        applicantRole: formState.accountType,
        whoIsMoving: whoIsMoving,
        allDependentsMoving: formState.isAllDependentsMoving === 'Y' ? true : false,
        dependentPHNs: dependentPhns,
        moveFromBCDate: formatISODate(formState.moveFromBCDate),
        arriveDestinationDate: formatISODate(formState.arriveDestinationDate),
        isNewAddressKnown: formState.isNewAddressKnown === 'Y' ? true : false,
        newAddress: {
          country: formState.country,
          addressLines: addressLines,
          province: formState.province,
          city: formState.city,
          postalCode: formState.postalCode
        }
      }
    };
    const headers = this.getHeaders(token);
    return axios.post(SUBMIT_APPLICATION_URL, jsonPayload, { headers });
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
