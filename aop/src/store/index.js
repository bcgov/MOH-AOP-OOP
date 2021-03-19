import Vue from "vue";
import Vuex from "vuex";

export const RESET_FORM = "resetForm";
export const NEW_FORM = "newForm";
export const SET_UPLOAD_TYPE = "setUploadType";
export const SET_CREDENTIALS_REQUIRED = "setCredentialsRequired";
export const SET_FIRST_NAME = "setFirstName";
export const SET_LAST_NAME = "setLastName";
export const SET_EMAIL_ADDRESS = "setEmailAddress";
export const SET_PHONE_NUMBER = "setPhoneNumber";
export const SET_PHONE_EXTENSION = "setPhoneExtension";
export const SET_ORGANIZATION = "setOrganization";
export const SET_FACILITY = "setFacility";
export const SET_SUBMISSION_TYPE = "setSubmissionType";
export const SET_PRIMARY_NUMBER = "setPrimaryNumber";
export const SET_PRIMARY_LAST_NAME = "setPrimaryLastName";
export const SET_SECONDARY_NUMBER = "setSecondaryNumber";
export const SET_SECONDARY_LAST_NAME = "setSecondaryLastName";
export const SET_COMMENTS = "setComments";
export const SET_UPLOADED_FORMS = "setUploadedForms";
export const SET_UPLOADED_CREDENTIALS = "setUploadedCredentials";
export const SET_API_RESPONSE = "setApiResponse";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    uploadType: '',
    credentialsRequired: '',
    firstName: '',
    lastName: '',
    emailAddress: '',
    phoneNumber: '',
    phoneExtension: '',
    organization: '',
    facility: '',
    submissionType: '',
    primaryNumber: '',
    primaryLastName: '',
    secondaryNumber: '',
    secondaryLastName: '',
    comments: '',
    uploadedForms: [],
    uploadedCredentials: [],
    apiResponse: '',
  },
  mutations: {
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
    setPhoneExtension(state, payload) {
      state.phoneExtension = payload;
    },
    setOrganization(state, payload) {
      state.organization = payload;
    },
    setFacility(state, payload) {
      state.facility = payload;
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
    setApiResponse(state, payload) {
      state.apiResponse = payload;
    },
  },
  actions: {
    resetForm({ commit }) {
      commit(SET_UPLOAD_TYPE, '');
      commit(SET_CREDENTIALS_REQUIRED, '');
      commit(SET_FIRST_NAME, '');
      commit(SET_LAST_NAME, '');
      commit(SET_EMAIL_ADDRESS, '');
      commit(SET_PHONE_NUMBER, '');
      commit(SET_PHONE_EXTENSION, '');
      commit(SET_ORGANIZATION, '');
      commit(SET_FACILITY, '');
      commit(SET_SUBMISSION_TYPE, '');
      commit(SET_PRIMARY_NUMBER, '');
      commit(SET_PRIMARY_LAST_NAME, '');
      commit(SET_SECONDARY_NUMBER, '');
      commit(SET_SECONDARY_LAST_NAME, '');
      commit(SET_COMMENTS, '');
      commit(SET_UPLOADED_FORMS, []);
      commit(SET_UPLOADED_CREDENTIALS, []);
      commit(SET_API_RESPONSE, '');
    },
    newForm({ commit }) {
      commit(SET_UPLOAD_TYPE, '');
      commit(SET_CREDENTIALS_REQUIRED, '');
      commit(SET_SUBMISSION_TYPE, '');
      commit(SET_PRIMARY_NUMBER, '');
      commit(SET_PRIMARY_LAST_NAME, '');
      commit(SET_SECONDARY_NUMBER, '');
      commit(SET_SECONDARY_LAST_NAME, '');
      commit(SET_COMMENTS, '');
      commit(SET_UPLOADED_FORMS, []);
      commit(SET_UPLOADED_CREDENTIALS, []);
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
    setPhoneExtension({ commit }, phoneExtension) {
      commit(SET_PHONE_EXTENSION, phoneExtension);
    },
    setOrganization({ commit }, setOrganization) {
      commit(SET_ORGANIZATION, setOrganization);
    },
    setFacility({ commit }, setFacility) {
      commit(SET_FACILITY, setFacility);
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
    setApiResponse({ commit }, response) {
      commit(SET_API_RESPONSE, response);
    },
  },
  getters: {}
});
