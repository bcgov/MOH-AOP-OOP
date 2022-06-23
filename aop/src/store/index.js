import { createStore } from 'vuex';
import dummyData from './dummy-data';
import settings from '../settings';

export const SET_UUID = 'setUUID';
export const SET_LOADING = "setLoading";
export const SET_SHOW_SIGN_OUT_MODAL = "setShowSignOutModal";
export const HIDE_SIGN_OUT_MODAL = "hideSignOutModal";
export const SHOW_SIGN_OUT_MODAL = "showSignOutModal";
export const SET_SHOW_MOBILE_PROGRESS = "setShowMobileProgress";
export const SHOW_MOBILE_PROGRESS = "showMobileProgress";
export const HIDE_MOBILE_PROGRESS = "hideMobileProgress";
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
export const SET_SALT = "setSalt";

export default createStore({
  state: () => {
    const state = {
      uuid: '',
      loading: true,
      showSignOutModal: false,
      showMobileProgress: false,
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
      salt: '',
    };

    if (settings.useDummyData) {
      Object.assign(state, dummyData);
    }

    return state;
  },
  mutations: {
    setUUID(state, payload) {
      state.uuid = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setShowSignOutModal(state, payload) {
      state.showSignOutModal = payload;
    },
    setShowMobileProgress(state, payload) {
      state.showMobileProgress = payload;
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
    setSalt(state, payload) {
      state.salt = payload;
    },
  },
  actions: {
    showSignOutModal({ commit }) {
      commit(SET_SHOW_SIGN_OUT_MODAL, true);
    },
    hideSignOutModal({ commit }) {
      commit(SET_SHOW_SIGN_OUT_MODAL, false);
    },
    showMobileProgress({ commit }) {
      commit(SET_SHOW_MOBILE_PROGRESS, true);
    },
    hideMobileProgress({ commit }) {
      commit(SET_SHOW_MOBILE_PROGRESS, false);
    },
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
  },
  getters: {}
});
