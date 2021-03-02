import dummyData from '../states/form-dummy-data';
import settings from '../../settings';

export const MODULE_NAME = 'form';

export const RESET_FORM = 'resetForm';

// Your info page:
export const SET_LAST_NAME = 'setLastName';
export const SET_PHN = 'setPhn';
export const SET_EMAIL = 'setEmail';
export const SET_PHONE = 'setPhone';

// Account type page:
export const SET_ACCOUNT_TYPE = 'setAccountType';
export const SET_PERSON_MOVING = 'setPersonMoving';
export const SET_IS_ALL_DEPENDENTS_MOVING = 'setIsAllDependentsMoving';

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
      accountType: null,
      personMoving: null,
      isAllDependentsMoving: null,
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
    setAccountType(state, payload) {
      state.accountType = payload;
    },
    setPersonMoving(state, payload) {
      state.personMoving = payload;
    },
    setIsAllDependentsMoving(state, payload) {
      state.isAllDependentsMoving = payload;
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
    setAccountType({ commit }, accountType) {
      commit(SET_ACCOUNT_TYPE, accountType);
    },
    setPersonMoving({ commit }, personMoving) {
      commit(SET_PERSON_MOVING, personMoving);
    },
    setIsAllDependentsMoving({ commit }, isAllDependentsMoving) {
      commit(SET_IS_ALL_DEPENDENTS_MOVING, isAllDependentsMoving);
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
