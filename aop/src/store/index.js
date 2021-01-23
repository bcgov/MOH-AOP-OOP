import Vue from 'vue';
import Vuex from 'vuex';

export const RESET_FORM = 'resetForm';
export const SET_HAS_ACCEPTED_TERMS = 'setHasAcceptedTerms';
export const SET_UPLOAD_TYPE = 'setUploadType';
export const SET_CREDENTIALS_REQUIRED = 'setCredentialsRequired';
export const SET_FIRST_NAME = 'setFirstName';
export const SET_LAST_NAME = 'setLastName';
export const SET_EMAIL_ADDRESS = 'setEmailAddress';
export const SET_PHONE_NUMBER = 'setPhoneNumber';
export const SET_ORGANIZATION = 'setOrganization';
export const SET_FACILITY_NAME = 'setFacilityName';
export const SET_SUBMISSION_TYPE = 'setSubmissionType';
export const SET_PRIMARY_NUMBER = 'setPrimaryNumber';
export const SET_PRIMARY_LAST_NAME = 'setPrimaryLastName';
export const SET_SECONDARY_NUMBER = 'setSecondaryNumber';
export const SET_SECONDARY_LAST_NAME = 'setSecondaryLastName';
export const SET_COMMENTS = 'setComments';
export const SET_UPLOADED_FORMS = 'setUploadedForms';
export const SET_UPLOADED_CREDENTIALS = 'setUploadedCredentials';
export const SET_SIGNATURE = 'setSignature';
export const SET_API_RESPONSE = 'setApiResponse';
export const SET_API_ERROR = 'setApiError';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hasAcceptedTerms: false,
    uploadType: null,
    credentialsRequired: null,
    firstName: null,
    lastName: null,
    emailAddress: null,
    phoneNumber: null,
    organization: null,
    facilityName: null,
    submissionType: null,
    primaryNumber: null,
    primaryLastName: null,
    secondaryNumber: null,
    secondaryLastName: null,
    comments: null,
    uploadedForms: [],
    uploadedCredentials: [],
    signature: null,
    apiResponse: null,
    apiError: null
  },
  mutations: {
    setHasAcceptedTerms(state, payload) {
      state.hasAcceptedTerms = payload;
    },
    setUploadType(state, payload) {
      state.uploadType = payload;
    },
    setCredentialsRequired(state, payload) {
      state.credentialsRequired = payload;
    },
    setFirstName(state, payload) {
      state.firstName = payload;
    },
    setLastName(state, payload) {
      state.lastName = payload;
    },
    setEmailAddress(state, payload) {
      state.emailAddress = payload;
    },
    setPhoneNumber(state, payload) {
      state.phoneNumber = payload;
    },
    setOrganization(state, payload) {
      state.organization = payload;
    },
    setFacilityName(state, payload) {
      state.facilityName = payload;
    },
    setSubmissionType(state, payload) {
      state.submissionType = payload;
    },
    setPrimaryNumber(state, payload) {
      state.primaryNumber = payload;
    },
    setPrimaryLastName(state, payload) {
      state.primaryLastName = payload;
    },
    setSecondaryNumber(state, payload) {
      state.secondaryNumber = payload;
    },
    setSecondaryLastName(state, payload) {
      state.secondaryLastName = payload;
    },
    setComments(state, payload) {
      state.comments = payload;
    },
    setUploadedForms(state, payload) {
      state.uploadedForms = payload;
    },
    setUploadedCredentials(state, payload) {
      state.uploadedCredentials = payload;
    },
    setSignature(state, payload) {
      state.signature = payload;
    },
    setApiResponse(state, payload) {
      state.apiResponse = payload;
    },
    setApiError(state, payload) {
      state.apiError = payload;
    }
  },
  actions: {
    resetForm({ commit }) {
      commit(SET_HAS_ACCEPTED_TERMS, false);
      commit(SET_UPLOAD_TYPE, null);
      commit(SET_CREDENTIALS_REQUIRED, null);
      commit(SET_FIRST_NAME, null);
      commit(SET_LAST_NAME, null);
      commit(SET_EMAIL_ADDRESS, null);
      commit(SET_PHONE_NUMBER, null);
      commit(SET_ORGANIZATION, null);
      commit(SET_FACILITY_NAME, null);
      commit(SET_SUBMISSION_TYPE, null);
      commit(SET_PRIMARY_NUMBER, null);
      commit(SET_PRIMARY_LAST_NAME, null);
      commit(SET_SECONDARY_NUMBER, null);
      commit(SET_SECONDARY_LAST_NAME, null);
      commit(SET_COMMENTS, null);
      commit(SET_UPLOADED_FORMS, []);
      commit(SET_UPLOADED_CREDENTIALS, []);
      commit(SET_SIGNATURE, null);
      commit(SET_API_RESPONSE, null);
      commit(SET_API_ERROR, null);
    },
    setHasAcceptedTerms({ commit }, hasAcceptedTerms) {
      commit(SET_HAS_ACCEPTED_TERMS, hasAcceptedTerms);
    },
    setUploadType({ commit }, uploadType) {
      commit(SET_UPLOAD_TYPE, uploadType);
    },
    setCredentialsRequired({ commit }, credentialsRequired) {
      commit(SET_CREDENTIALS_REQUIRED, credentialsRequired);
    },
    setFirstName({ commit }, firstName) {
      commit(SET_FIRST_NAME, firstName);
    },
    setLastName({ commit }, lastName) {
      commit(SET_LAST_NAME, lastName);
    },
    setEmailAddress({ commit }, emailAddress) {
      commit(SET_EMAIL_ADDRESS, emailAddress);
    },
    setPhoneNumber({ commit }, phoneNumber) {
      commit(SET_PHONE_NUMBER, phoneNumber);
    },
    setOrganization({ commit }, setOrganization) {
      commit(SET_ORGANIZATION, setOrganization);
    },
    setFacilityName({ commit }, setFacilityName) {
      commit(SET_FACILITY_NAME, setFacilityName);
    },
    setSubmissionType({ commit }, setSubmissionType) {
      commit(SET_SUBMISSION_TYPE, setSubmissionType);
    },
    setPrimaryNumber({ commit }, setPrimaryNumber) {
      commit(SET_PRIMARY_NUMBER, setPrimaryNumber);
    },
    setPrimaryLastName({ commit }, setPrimaryLastName) {
      commit(SET_PRIMARY_LAST_NAME, setPrimaryLastName);
    },
    setSecondaryNumber({ commit }, setSecondaryNumber) {
      commit(SET_SECONDARY_NUMBER, setSecondaryNumber);
    },
    setSecondaryLastName({ commit }, setSecondaryLastName) {
      commit(SET_SECONDARY_LAST_NAME, setSecondaryLastName);
    },
    setComments({ commit }, setComments) {
      commit(SET_COMMENTS, setComments);
    },
    setUploadedForms({ commit }, forms) {
      commit(SET_UPLOADED_FORMS, forms);
    },
    setUploadedCredentials({ commit }, credentials) {
      commit(SET_UPLOADED_CREDENTIALS, credentials);
    },
    setSignature({ commit }, signature) {
      commit(SET_SIGNATURE, signature);
    },
    setApiResponse({ commit }, response) {
      commit(SET_API_RESPONSE, response);
    },
    setApiError({ commit }, error) {
      commit(SET_API_ERROR, error);
    }
  },
  getters: {}
});
