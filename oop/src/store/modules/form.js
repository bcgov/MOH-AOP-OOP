import dummyData from '../states/form-dummy-data';
import settings from '../../settings';

export const MODULE_NAME = 'form';

export const RESET_FORM = 'resetForm';
export const SET_APPLICATION_UUID = 'setApplicationUuid';
export const SET_CAPTCHA_TOKEN = 'setCaptchaToken';
export const SET_SUBMISSION_DATE = 'setSubmissionDate';
export const SET_REFERENCE_NUMBER = 'setReferenceNumber';
export const SET_MAINTENANCE_MESSAGE = 'setMaintenanceMessage';

// Your info page:
export const SET_LAST_NAME = 'setLastName';
export const SET_PHN = 'setPhn';
export const SET_PHONE = 'setPhone';

// Move Info page
export const SET_MOVE_FROM_BC_DATE = 'setMoveFromBCDate';
export const SET_ARRIVE_DESTINATION_DATE = 'setArriveDestinationDate';
export const SET_IS_NEW_ADDRESS_KNOWN = 'setIsNewAddressKnown';
export const SET_COUNTRY = 'setCountry';
export const SET_ADDRESS_LINES = 'setAddressLines';
export const SET_PROVINCE = 'setProvince';
export const SET_CITY = 'setCity';
export const SET_POSTAL_CODE = 'setPostalCode';
export const SET_OTHER_STREET_ADDRESS = 'setOtherStreetAddress';
export const SET_ZIP_CODE = 'setZipCode';
export const SET_USA_STATE = 'setUsaState';

// Account type page:
export const SET_ACCOUNT_TYPE = 'setAccountType';
export const SET_PERSON_MOVING = 'setPersonMoving';
export const SET_IS_ALL_DEPENDENTS_MOVING = 'setIsAllDependentsMoving';
export const SET_DEPENDENT_PHNS = 'setDependentPhns';

// Sending page:
export const SET_SUBMISSION_RESPONSE = 'setSubmissionResponse';
export const SET_SUBMISSION_ERROR = 'setSubmissionError';

export default {
  namespaced: true,
  state: () => {
    const state = {
      applicationUuid: null,
      captchaToken: null,
      lastName: null,
      phn: null,
      phone: null,
      moveFromBCDate: null,
      arriveDestinationDate: null,
      isNewAddressKnown: null,
      country: null,
      addressLines: [],
      province: null,
      city: null,
      postalCode: null,
      otherStreetAddress: null,
      zipCode: null,
      state: null,
      accountType: null,
      personMoving: null,
      isAllDependentsMoving: null,
      dependentPhns: [],
      submissionDate: null,
      referenceNumber: null,
      submissionResponse: null,
      submissionError: null,
      maintenanceMessage: null,
    };
    if (settings.useDummyData) {
      Object.assign(state, dummyData);
    }
    return state;
  },
  mutations: {
    setApplicationUuid(state, payload) {
      state.applicationUuid = payload;
    },
    setCaptchaToken(state, payload) {
      state.captchaToken = payload;
    },
    setSubmissionDate(state, payload) {
      state.submissionDate = payload;
    },
    setReferenceNumber(state, payload) {
      state.referenceNumber = payload;
    },
    setMaintenanceMessage(state, payload) {
      state.maintenanceMessage = payload;
    },
    setLastName(state, payload) {
      state.lastName = payload;
    },
    setPhn(state, payload) {
      state.phn = payload;
    },
    setPhone(state, payload) {
      state.phone = payload;
    },
    setMoveFromBCDate(state, payload) {
      state.moveFromBCDate = payload;
    },
    setArriveDestinationDate(state, payload) {
      state.arriveDestinationDate = payload;
    },
    setIsNewAddressKnown(state, payload) {
      state.isNewAddressKnown = payload;
    },
    setCountry(state, payload) {
      state.country = payload;
    },
    setAddressLines(state, payload) {
      state.addressLines = payload;
    },
    setProvince(state, payload) {
      state.province = payload;
    },
    setCity(state, payload) {
      state.city = payload;
    },
    setPostalCode(state, payload) {
      state.postalCode = payload;
    },
    setOtherStreetAddress(state, payload) {
      state.otherStreetAddress = payload;
    },
    setZipCode(state, payload) {
      state.zipCode = payload;
    },
    setUsaState(state, payload) {
      state.state = payload;
    },
    setAccountType(state, payload) {
      state.accountType = payload;
    },
    setPersonMoving(state, payload) {
      state.personMoving = payload;
    },
    setIsAllDependentsMoving(state, payload) {
      state.isAllDependentsMoving = payload;
    },
    setDependentPhns(state, payload) {
      state.dependentPhns = payload;
    },
    setSubmissionResponse(state, payload) {
      state.submissionResponse = payload;
    },
    setSubmissionError(state, payload) {
      state.submissionError = payload;
    },
  },
  actions: {
    resetForm({ commit }) {
      commit(SET_APPLICATION_UUID, null);
      commit(SET_CAPTCHA_TOKEN, null);
      commit(SET_SUBMISSION_DATE, null);
      commit(SET_REFERENCE_NUMBER, null);
      commit(SET_LAST_NAME, null);
      commit(SET_PHN, null);
      commit(SET_PHONE, null);
      commit(SET_MOVE_FROM_BC_DATE, null);
      commit(SET_ARRIVE_DESTINATION_DATE, null);
      commit(SET_IS_NEW_ADDRESS_KNOWN, null);
      commit(SET_COUNTRY, null);
      commit(SET_ADDRESS_LINES, []);
      commit(SET_PROVINCE, null);
      commit(SET_CITY, null);
      commit(SET_POSTAL_CODE, null);
      commit(SET_OTHER_STREET_ADDRESS, null);
      commit(SET_ZIP_CODE, null);
      commit(SET_USA_STATE, null);
      commit(SET_ACCOUNT_TYPE, null);
      commit(SET_PERSON_MOVING, null);
      commit(SET_IS_ALL_DEPENDENTS_MOVING, null);
      commit(SET_DEPENDENT_PHNS, []);
      commit(SET_SUBMISSION_RESPONSE, null);
      commit(SET_SUBMISSION_ERROR, null);
    },
    setApplicationUuid({ commit }, applicationUuid) {
      commit(SET_APPLICATION_UUID, applicationUuid);
    },
    setCaptchaToken({ commit }, captchaToken) {
      commit(SET_CAPTCHA_TOKEN, captchaToken);
    },
    setSubmissionDate({ commit }, submissionDate) {
      commit(SET_SUBMISSION_DATE, submissionDate);
    },
    setReferenceNumber({ commit }, referenceNumber) {
      commit(SET_REFERENCE_NUMBER, referenceNumber);
    },
    setMaintenanceMessage({ commit }, maintenanceMessage) {
      commit(SET_MAINTENANCE_MESSAGE, maintenanceMessage);
    },
    setLastName({ commit }, lastName) {
      commit(SET_LAST_NAME, lastName);
    },
    setPhn({ commit }, phn) {
      commit(SET_PHN, phn);
    },
    setPhone({ commit }, phone) {
      commit(SET_PHONE, phone);
    },
    setMoveFromBCDate({ commit }, moveFromBCDate) {
      commit(SET_MOVE_FROM_BC_DATE, moveFromBCDate);
    },
    setArriveDestinationDate({ commit }, arriveDestinationDate) {
      commit(SET_ARRIVE_DESTINATION_DATE, arriveDestinationDate);
    },
    setIsNewAddressKnown({ commit }, isNewAddressKnown) {
      commit(SET_IS_NEW_ADDRESS_KNOWN, isNewAddressKnown);
    },
    setCountry({ commit }, country) {
      commit(SET_COUNTRY, country);
    },
    setAddressLines({ commit }, addressLines) {
      commit(SET_ADDRESS_LINES, addressLines);
    },
    setProvince({ commit }, province) {
      commit(SET_PROVINCE, province);
    },
    setCity({ commit }, city) {
      commit(SET_CITY, city);
    },
    setPostalCode({ commit }, postalCode) {
      commit(SET_POSTAL_CODE, postalCode);
    },
    setOtherStreetAddress({ commit }, otherStreetAddress) {
      commit(SET_OTHER_STREET_ADDRESS, otherStreetAddress);
    },
    setZipCode({ commit }, zipCode) {
      commit(SET_ZIP_CODE, zipCode);
    },
    setUsaState({ commit }, state) {
      commit(SET_USA_STATE, state);
    },
    setAccountType({ commit }, accountType) {
      commit(SET_ACCOUNT_TYPE, accountType);
    },
    setPersonMoving({ commit }, personMoving) {
      commit(SET_PERSON_MOVING, personMoving);
    },
    setIsAllDependentsMoving({ commit }, isAllDependentsMoving) {
      commit(SET_IS_ALL_DEPENDENTS_MOVING, isAllDependentsMoving);
    },
    setDependentPhns({ commit }, dependentPhns) {
      commit(SET_DEPENDENT_PHNS, dependentPhns);
    },
    setApiResponse({ commit }, response) {
      commit(SET_SUBMISSION_RESPONSE, response);
    },
    setApiError({ commit }, error) {
      commit(SET_SUBMISSION_ERROR, error);
    },
  },
  getters: {},
};
