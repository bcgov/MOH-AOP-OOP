import dummyData from '../states/form-dummy-data';
import settings from '../../settings';

export const MODULE_NAME = 'form';

export const RESET_FORM = 'resetForm';

// Your info page
export const SET_LAST_NAME = 'setLastName';
export const SET_PHN = 'setPhn';
export const SET_EMAIL = 'setEmail';
export const SET_PHONE = 'setPhone';

// Move Info page
export const SET_MOVE_FROM_BC_DATE = 'setMoveFromBCDate';
export const SET_ARRIVE_DESTINATION_DATE = 'setArriveDestinationDate';
export const SET_COUNTRY = 'setCountry';
export const SET_ADDRESS_LINE = 'setAddressLine';
export const SET_PROVINCE = 'setProvince';
export const SET_CITY = 'setCity';
export const SET_POSTAL_CODE = 'setPostalCode';

// Sending page:
export const SET_SUBMISSION_RESPONSE = 'setSubmissionResponse';
export const SET_SUBMISSION_ERROR = 'setSubmissionError';

export default {
  namespaced: true,
  state: () => {
    const state = {
      lastName: null,
      phn: null,
      email: null,
      phone: null,
      moveFromBCDate: null,
      arriveDestinationDate: null,
      country: null,
      addressLine: null,
      province: null,
      city: null,
      postalCode: null,
      submissionResponse: null,
      submissionError: null,
    };
    if (settings.useDummyData) {
      Object.assign(state, dummyData);
    }
    return state;
  },
  mutations: {
    setLastName(state, payload) {
      state.lastName = payload;
    },
    setPhn(state, payload) {
      state.phn = payload;
    },
    setEmail(state, payload) {
      state.email = payload;
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
    setCountry(state, payload) {
      state.country = payload;
    },
    setAddressLine(state, payload) {
      state.addressLine = payload;
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
    setSubmissionResponse(state, payload) {
      state.submissionResponse = payload;
    },
    setSubmissionError(state, payload) {
      state.submissionError = payload;
    }
  },
  actions: {
    resetForm({ commit }) {
      commit(SET_LAST_NAME, null);
      commit(SET_PHN, null);
      commit(SET_EMAIL, null);
      commit(SET_PHONE, null);
      commit(SET_MOVE_FROM_BC_DATE, null);
      commit(SET_ARRIVE_DESTINATION_DATE, null);
      commit(SET_COUNTRY, null);
      commit(SET_ADDRESS_LINE, null);
      commit(SET_PROVINCE, null);
      commit(SET_CITY, null);
      commit(SET_POSTAL_CODE, null);
      commit(SET_SUBMISSION_RESPONSE, null);
      commit(SET_SUBMISSION_ERROR, null);
    },
    setLastName({ commit }, lastName) {
      commit(SET_LAST_NAME, lastName);
    },
    setPhn({ commit }, phn) {
      commit(SET_PHN, phn);
    },
    setEmail({ commit }, email) {
      commit(SET_EMAIL, email);
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
    setCountry({ commit }, country) {
      commit(SET_COUNTRY, country);
    },
    setAddressLine({ commit }, addressLine) {
      commit(SET_ADDRESS_LINE, addressLine);
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
    setApiResponse({ commit }, response) {
      commit(SET_SUBMISSION_RESPONSE, response);
    },
    setApiError({ commit }, error) {
      commit(SET_SUBMISSION_ERROR, error);
    }
  },
  getters: {}
};
