import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuelidate from "vuelidate";
import YourInfoPage from "@/views/YourInfoPage.vue";
import axios from "axios";
import logService from "@/services/log-service";
import apiService from "@/services/api-service";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

// const MODULE_NAME = 'form';
// const RESET_FORM = 'resetForm';

const SET_APPLICATION_UUID = "setApplicationUuid";
const SET_CAPTCHA_TOKEN = "setCaptchaToken";
const SET_SUBMISSION_DATE = "setSubmissionDate";
const SET_REFERENCE_NUMBER = "setReferenceNumber";

// Your info page:
const SET_LAST_NAME = "setLastName";
const SET_PHN = "setPhn";
const SET_PHONE = "setPhone";

// Move Info page
const SET_MOVE_FROM_BC_DATE = "setMoveFromBCDate";
const SET_ARRIVE_DESTINATION_DATE = "setArriveDestinationDate";
const SET_IS_NEW_ADDRESS_KNOWN = "setIsNewAddressKnown";
const SET_COUNTRY = "setCountry";
const SET_ADDRESS_LINES = "setAddressLines";
const SET_PROVINCE = "setProvince";
const SET_CITY = "setCity";
const SET_POSTAL_CODE = "setPostalCode";

// Account type page:
const SET_ACCOUNT_TYPE = "setAccountType";
const SET_PERSON_MOVING = "setPersonMoving";
const SET_IS_ALL_DEPENDENTS_MOVING = "setIsAllDependentsMoving";
const SET_DEPENDENT_PHNS = "setDependentPhns";

// Sending page:
const SET_SUBMISSION_RESPONSE = "setSubmissionResponse";
const SET_SUBMISSION_ERROR = "setSubmissionError";


  
const mutations = {
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
  }
const actions = {
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
  }


const mockResponse = {
  data: {
    applicationUuid: "89695849-cfc1-49ef-8bc9-552a71b891f1",
    returnCode: "0",
    message: "PHN and last name matches. Applicant PHN is DEP",
    applicantRole: "DEP",
  },
  status: 200,
  statusText: "OK",
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
    "access-control-allow-credentials": "true",
    "access-control-allow-headers":
      "Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-origin": "https://my.gov.bc.ca",
    "access-control-expose-headers": "Authorization",
    breadcrumbid: "ID-vs-dapp045-maximusbchealth-local-1624634339960-0-11",
    "cache-control": "no-store",
    checkr32: "Y",
    connection: "close",
    "content-security-policy":
      "default-src * data: blob: filesystem: 'unsafe-inline' 'unsafe-eval'",
    "content-type": "application/json",
    date: "Tue, 29 Jun 2021 18:19:51 GMT",
    expires: "Wed, 17 Jun 2020 17:30:34 GMT",
    forwarded:
      "for=216.232.32.188;host=oop-web-a3c641-dev.apps.silver.devops.gov.bc.ca;proto=https",
    origin: "http://localhost:8080",
    phn: "9353166544",
    pragma: "no-cache",
    "response-type": "application/json",
    "sec-ch-ua":
      '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    server: "nginx",
    "strict-transport-security": "max-age=86400; includeSubDomains",
    "transfer-encoding": "chunked",
    uuid: "89695849-cfc1-49ef-8bc9-552a71b891f1",
    "www-authenticate": "Basic",
    "x-content-type-options": "nosniff",
    "x-forwarded-for": "127.0.0.1, 216.232.32.188",
    "x-forwarded-host":
      "localhost:8080, oop-web-a3c641-dev.apps.silver.devops.gov.bc.ca",
    "x-forwarded-port": "8080, 443",
    "x-forwarded-proto": "http, https",
    "x-frame-options": "DENY",
    "x-oracle-dms-ecid": "c0428783-e7f8-4eb2-8cf9-614a6821cc48-0000aef8",
    "x-oracle-dms-rid": "0",
    "x-powered-by": "Express",
    "x-rm-jurisdiction": "bc",
    "x-weblogic-request-clusterinfo": "true",
    "x-xss-protection": "1",
  },
  config: {
    url: "/oop/api/oopIntegration/validatePhnName",
    method: "post",
    data:
      '{"applicationUuid":"89695849-cfc1-49ef-8bc9-552a71b891f1","lastName":"PICKET BOATXE","phn":"9353166544"}',
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Response-Type": "application/json",
      "X-Authorization":
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5vbmNlIjoiODk2OTU4NDktY2ZjMS00OWVmLThiYzktNTUyYTcxYjg5MWYxIn0sImlhdCI6MTYyNDk5MDc4MiwiZXhwIjoxNjI1MDAxNTgyfQ.U5920Pa6686A4PXQ-8fhX3MLmxe22bTrqqnzSgoJ10g",
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
  },
  request: {},
};

const mockResponsePhnDoesNotMatch = {
  data: {
    applicationUuid: "f4c826ed-5c30-4127-9cc8-c4d4cf358d42",
    returnCode: "1",
    message: "PHN and last name does not match",
  },
  status: 200,
  statusText: "OK",
  headers: {
    accept: "application/json, text/plain, */*",
    "accept-encoding": "gzip, deflate, br",
    "accept-language": "en-US,en;q=0.9",
    "access-control-allow-credentials": "true",
    "access-control-allow-headers":
      "Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-origin": "https://my.gov.bc.ca",
    "access-control-expose-headers": "Authorization",
    breadcrumbid: "ID-vs-dapp046-maximusbchealth-local-1624634336247-0-41",
    "cache-control": "no-store",
    checkr32: "Y",
    connection: "close",
    "content-security-policy":
      "default-src * data: blob: filesystem: 'unsafe-inline' 'unsafe-eval'",
    "content-type": "application/json",
    date: "Tue, 29 Jun 2021 22:14:07 GMT",
    expires: "Wed, 17 Jun 2020 17:30:34 GMT",
    forwarded:
      "for=216.232.32.188;host=oop-web-a3c641-dev.apps.silver.devops.gov.bc.ca;proto=https",
    origin: "http://localhost:8080",
    phn: "9353166544",
    pragma: "no-cache",
    "response-type": "application/json",
    "sec-ch-ua":
      '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    server: "nginx",
    "strict-transport-security": "max-age=86400; includeSubDomains",
    "transfer-encoding": "chunked",
    uuid: "f4c826ed-5c30-4127-9cc8-c4d4cf358d42",
    "www-authenticate": "Basic",
    "x-content-type-options": "nosniff",
    "x-forwarded-for": "127.0.0.1, 216.232.32.188",
    "x-forwarded-host":
      "localhost:8080, oop-web-a3c641-dev.apps.silver.devops.gov.bc.ca",
    "x-forwarded-port": "8080, 443",
    "x-forwarded-proto": "http, https",
    "x-frame-options": "DENY",
    "x-oracle-dms-ecid": "8bb3eb62-41e2-4023-99ab-8719620d31b8-0000b5e6",
    "x-oracle-dms-rid": "0",
    "x-powered-by": "Express",
    "x-rm-jurisdiction": "bc",
    "x-weblogic-request-clusterinfo": "true",
    "x-xss-protection": "1",
  },
  config: {
    url: "/oop/api/oopIntegration/validatePhnName",
    method: "post",
    data:
      '{"applicationUuid":"f4c826ed-5c30-4127-9cc8-c4d4cf358d42","lastName":"aaaaaaaaaa","phn":"9353166544"}',
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Response-Type": "application/json",
      "X-Authorization":
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5vbmNlIjoiZjRjODI2ZWQtNWMzMC00MTI3LTljYzgtYzRkNGNmMzU4ZDQyIn0sImlhdCI6MTYyNTAwNDgyNiwiZXhwIjoxNjI1MDE1NjI2fQ.nl9StLFRCtgrE8lWTLiBqznoCxNdq2uEkugFu5frEBU",
    },
    transformRequest: [null],
    transformResponse: [null],
    timeout: 0,
    xsrfCookieName: "XSRF-TOKEN",
    xsrfHeaderName: "X-XSRF-TOKEN",
    maxContentLength: -1,
    maxBodyLength: -1,
  },
  request: {},
};

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

jest.spyOn(logService, "logNavigation").mockImplementation(() => Promise.resolve("logged"));
jest.spyOn(logService, "logError").mockImplementation(() => Promise.resolve("logged"));
jest.spyOn(logService, "logInfo").mockImplementation(() => Promise.resolve("logged"));

describe("YourInfoPage.vue", () => {
  let state;
  let store;

  beforeEach(() => {
    state = {
      lastName: null,
      phn: null,
      phone: null,
    };

    store = new Vuex.Store({
      modules: {
        form: {
          state,
          namespaced: true,
        },
      },
    });

    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
  });

  it("renders", () => {
    const wrapper = mount(YourInfoPage, {
      store,
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe("YourInfoPage.vue nameValidator()", () => {
  it("validates as true when supplied a last name", async () => {
    const store = new Vuex.Store({
      modules: {
        form: {
          state: {
            lastName: "data",
            phn: null,
            phone: null,
          },
          namespaced: true,
        },
      },
    });
    const wrapper = mount(YourInfoPage, {
      store,
      localVue,
    });

    wrapper.vm.$v.$touch();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.lastName.$error).toEqual(false);
  });

  it("validates as false when supplied a falsy last name value", async () => {
    const store = new Vuex.Store({
      modules: {
        form: {
          state: {
            lastName: null,
            phn: null,
            phone: null,
          },
          namespaced: true,
        },
      },
    });
    const wrapper = mount(YourInfoPage, {
      store,
      localVue,
    });

    wrapper.vm.$v.$touch();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.lastName.$error).toEqual(true);
  });
});

describe("YourInfoPage.vue phoneValidator()", () => {
  it("does not throw an error when supplied a string containing 10 numerical digits", async () => {
    const store = new Vuex.Store({
      modules: {
        form: {
          state: {
            lastName: null,
            phn: null,
            phone: "2222222222",
          },
          namespaced: true,
        },
      },
    });
    const wrapper = mount(YourInfoPage, {
      store,
      localVue,
    });

    wrapper.vm.$v.$touch();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.phone.$error).toEqual(false);
  });

  it("does not throw an error when supplied a null value, as the field is optional", async () => {
    const store = new Vuex.Store({
      modules: {
        form: {
          state: {
            lastName: null,
            phn: null,
            phone: null,
          },
          namespaced: true,
        },
      },
    });
    const wrapper = mount(YourInfoPage, {
      store,
      localVue,
    });

    wrapper.vm.$v.$touch();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.phone.$error).toEqual(false);
  });

  it("does throw an error when phone number length <10", async () => {
    const store = new Vuex.Store({
      modules: {
        form: {
          state: {
            lastName: null,
            phn: null,
            phone: "33",
          },
          namespaced: true,
        },
      },
    });
    const wrapper = mount(YourInfoPage, {
      store,
      localVue,
    });

    wrapper.vm.$v.$touch();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.phone.$error).toEqual(true);
  });

  it("does throw an error when phone number contains invalid characters", async () => {
    const store = new Vuex.Store({
      modules: {
        form: {
          state: {
            lastName: null,
            phn: null,
            phone: "$$$$$$$",
          },
          namespaced: true,
        },
      },
    });
    const wrapper = mount(YourInfoPage, {
      store,
      localVue,
    });

    wrapper.vm.$v.$touch();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.phone.$error).toEqual(true);
  });

  it("strips out surplus invalid characters so the phone number length is correct", async () => {
    const store = new Vuex.Store({
      modules: {
        form: {
          state: {
            lastName: null,
            phn: null,
            phone: "(222) 222 - 2222",
          },
          namespaced: true,
        },
      },
    });
    const wrapper = mount(YourInfoPage, {
      store,
      localVue,
    });

    wrapper.vm.$v.$touch();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.phone.$error).toEqual(false);
  });
});

describe("YourInfoPage.vue nextPage()", () => {

  it("throws an error, does not call api service when last name is not present", async () => {
    const store = new Vuex.Store({
      modules: {
        form: {
          state: {
            lastName: null,
            phn: "9353 166 544",
            phone: "2222222222",
          },
          namespaced: true,
        },
      },
    });
    const wrapper = mount(YourInfoPage, {
      store,
      localVue,
    });

    const mockApiService = jest
      .spyOn(apiService, "validateLastNamePhn")
      .mockImplementation(() => Promise.resolve(mockResponse));

    wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.$invalid).toEqual(true);
    expect(mockApiService).not.toHaveBeenCalled();
  });

  it("throws an error, does not call api service when phn is not present", async () => {
    const store = new Vuex.Store({
      modules: {
        form: {
          state: {
            lastName: "Picket Boatxe",
            phn: null,
            phone: "2222222222",
          },
          namespaced: true,
        },
      },
    });
    const wrapper = mount(YourInfoPage, {
      store,
      localVue,
    });

    // axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
    const mockApiService = jest
      .spyOn(apiService, "validateLastNamePhn")
      .mockImplementation(() => Promise.resolve(mockResponse));

    wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    // expect(wrapper.element).toBeDefined();
    expect(wrapper.vm.$v.$invalid).toEqual(true);
    expect(mockApiService).not.toHaveBeenCalled();
  });

  it("does call api service when last name and phn are present", async () => {
    const store = new Vuex.Store({
      modules: {
        form: {
          state: {
            applicationUuid: "defaultUUID",
            captchaToken: "defaultCaptchaToken",
            lastName: "Picket Boatxe",
            phn: "9353 166 544",
            phone: "2222222222",
          },
          namespaced: true,
          mutations,
          actions
        },
      },
    });
    const wrapper = mount(YourInfoPage, {
      store,
      localVue,
    });

    jest
      .spyOn(wrapper.vm, "handleValidationSuccess")
      .mockImplementation(() => Promise.resolve("handled"));

    expect(wrapper.element).toBeDefined();

    const mockApiService = jest
      .spyOn(apiService, "validateLastNamePhn")
      .mockImplementation(() => Promise.resolve(mockResponse));

    wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.$invalid).toEqual(false);
    expect(mockApiService).toHaveBeenCalledWith(
      "defaultCaptchaToken",
      "defaultUUID",
      "Picket Boatxe",
      "9353166544"
    );
    // await wrapper.vm.$nextTick();
    // mockApiService.mockReset();
  });

  /*
  The following two tests do not work yet. 
  The YourInfoPage.vue nextPage() function has a switch that handles the apiResponse.
  For some reason, in the test, I haven't been able to track the handleValidationSuccess()
  function call on line 225. The data change on 220 happens, but nothing after the logService
  call does in the test environment. I suspect it's an issue with an insufficient/improper mock,
  but I haven't gotten it working yet. I leave my half-finished tests below in case someone
  wants to finish them in the future.
  */

  it.skip("returns code 0 when info is found in the database", async () => {
    const store = new Vuex.Store({
      modules: {
        form: {
          state: {
            applicationUuid: "defaultUUID",
            captchaToken: "defaultCaptchaToken",
            lastName: "Picket Boatxe",
            phn: "9353 166 544",
            phone: "2222222222",
            applicantRole: "default",
          },
          namespaced: true,
        },
      },
    });
    const wrapper = mount(YourInfoPage, {
      store,
      localVue,
      data: () => {
        return {
          accountType: "default",
        };
      },
    });

    expect(store.state.form.applicantRole).toEqual("default");

    jest
      .spyOn(apiService, "validateLastNamePhn")
      .mockImplementation(() => Promise.resolve(mockResponse));

    const mockHandleValidationSuccess = jest
      .spyOn(wrapper.vm, "handleValidationSuccess")
      .mockImplementation(() => jest.fn);

    // await wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    //troubleshooting
    // expect(wrapper.vm.$v.$invalid).toEqual(false);
    expect(apiService.validateLastNamePhn).toHaveBeenCalled();
    // expect(wrapper.vm.accountType).toEqual("DEP");

    // expect(mockResponse.data.returnCode).toEqual("0");
    // expect(logService.logNavigation).toHaveBeenCalled();
    expect(mockHandleValidationSuccess).toHaveBeenCalled();
  });

  it.skip("returns code 1 when info is not found in the database", async () => {
    const store = new Vuex.Store({
      modules: {
        form: {
          state: {
            applicationUuid: "defaultUUID",
            captchaToken: "defaultCaptchaToken",
            lastName: "Picket Boatxee",
            phn: "9353 166 540",
            phone: "2222222222",
            applicantRole: "default",
          },
          namespaced: true,
        },
      },
    });
    const wrapper = mount(YourInfoPage, {
      store,
      localVue,
      data: () => {
        return {
          accountType: "default",
        };
      },
    });

    expect(store.state.form.applicantRole).toEqual("default");

    jest
      .spyOn(apiService, "validateLastNamePhn")
      .mockImplementation(() => Promise.resolve(mockResponsePhnDoesNotMatch));

    const mockHandleValidationSuccess = jest
      .spyOn(wrapper.vm, "handleValidationSuccess")
      .mockImplementation(() => jest.fn);

    await wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    //troubleshooting
    // expect(wrapper.vm.$v.$invalid).toEqual(false);
    // expect(apiService.validateLastNamePhn).toHaveBeenCalled();
    // expect(wrapper.vm.accountType).toEqual("DEP");

    expect(mockResponsePhnDoesNotMatch.data.returnCode).toEqual("1");
    // expect(logService.logNavigation).toHaveBeenCalled();
    expect(mockHandleValidationSuccess).toHaveBeenCalled();
  });
});
