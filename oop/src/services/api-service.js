import axios from 'axios';
import { formatISODate } from '../helpers/date';
import { replaceSpecialCharacters } from '../helpers/string';

const BASE_API_PATH = '/oop/api/';
const VALIDATE_LAST_NAME_PHN_URL = BASE_API_PATH + 'oopIntegration/validatePhnName';
const VALIDATE_DEP_URL = BASE_API_PATH + 'oopIntegration/validateDep';
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

  validateDep(token, applicationUuid, phn, dependentPHNs) {
    const headers = this.getHeaders(token);
    return axios.post(VALIDATE_DEP_URL, {
      applicationUuid,
      phn,
      dependentPHNs,
    },
    {
      headers
    });
  }

  submitApplication(token, formState) {
    const phn = formState.phn.replace(/ /g, '');
    const postalCode = formState.postalCode ? formState.postalCode.replace(/ /g, '') : null;
    const dependentPhns = [];
    const addressLines = [];
    let phoneNumber = null;

    formState.dependentPhns.forEach((phn) => {
      if (phn.value) {
        const dependentPhn = phn.value.replace(/ /g, '');
        dependentPhns.push(dependentPhn);
      }
    });

    // If country is Canada, add each address line value to addressLines
    if (formState.country === 'Canada'){
      formState.addressLines.forEach((addressLine) => {
        if (addressLine.value) {
          addressLines.push(addressLine.value);
        }
      });
    }
    // If country is USA, add a special case: append city and state into one field - addressLines[1]
    else if (formState.country === 'United States'){
      const appendedCityState = formState.addressLines[1].value + ' ' +  formState.province + ' USA';
      for (let i=0; i<formState.addressLines.length; i++) {
        if (i === 1){
          addressLines.push(appendedCityState);
        }
        else {
          addressLines.push(formState.addressLines[i].value);
        }
      }
    }
    // Otherwise, add a special case: remove commas from "City, province" field
    else {
      addressLines.push(formState.addressLines[0].value);
      addressLines.push(formState.addressLines[1].value.replace(',', ''));
    }

    if (formState.phone) {
      phoneNumber = formState.phone
        .replace(/_/g, '') // remove underlines
        .replace(/ /g, '') // spaces
        .replace(/\+|-/g, '') // + or - symbol
        .replace('(', '')
        .replace(')', '');
    }

    const whoIsMoving = formState.accountType === 'DEP' ? 'DEP_ONLY' : formState.personMoving
    const jsonPayload = {
      uuid: formState.applicationUuid,
      submissionDate: formatISODate(formState.submissionDate),
      outOfProvinceMove: {
        lastName: formState.lastName,
        phn: phn,
        phoneNumber: phoneNumber,
        applicantRole: formState.accountType,
        whoIsMoving: whoIsMoving,
        allDependentsMoving: formState.isAllDependentsMoving === 'Y' ? true : false,
        dependentPHNs: dependentPhns,
        moveFromBCDate: formatISODate(formState.moveFromBCDate),
        arriveDestinationDate: formatISODate(formState.arriveDestinationDate),
        isNewAddressKnown: formState.isNewAddressKnown === 'Y' ? true : false,
        newAddress: {
          country: replaceSpecialCharacters(formState.country),
          addressLines: addressLines,
          province: formState.country === 'United States' ? null : formState.province,
          city: formState.city,
          postalCode: postalCode
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
