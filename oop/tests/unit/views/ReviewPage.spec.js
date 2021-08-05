import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import { cloneDeep } from "lodash";
import * as formTemplate from "@/store/modules/form";
import Component from "@/views/ReviewPage.vue";
import axios from "axios";
import logService from "@/services/log-service";
import pageStateService from "@/services/page-state-service";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(() => {
    return Promise.resolve();
  }),
}));

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
  scrollToError: jest.fn(),
}));

const spyOnLogSubmission = jest
  .spyOn(logService, "logSubmission")
  .mockImplementation(() => Promise.resolve("logged"));
jest
  .spyOn(logService, "logError")
  .mockImplementation(() => Promise.resolve("logged"));
jest
  .spyOn(logService, "logInfo")
  .mockImplementation(() => Promise.resolve("logged"));
jest
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));
jest
  .spyOn(pageStateService, "visitPage")
  .mockImplementation(() => Promise.resolve("visited"));

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
Vue.use(Vuelidate);
const router = new VueRouter();

const mockSubmit = {
  data: {
    applicationUuid: "6e42086b-5692-4faf-8389-6c8cd7f3a5df",
    returnCode: "0",
    referenceNumber: "426809",
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
    authorization: "Basic Z2NwZW1zcGRlOmdyZWVudGVhMzMk",
    breadcrumbid: "ID-vs-tapp046-1627312185090-0-97",
    "cache-control": "no-store",
    connection: "close",
    "content-security-policy":
      "default-src * data: blob: filesystem: 'unsafe-inline' 'unsafe-eval'",
    "content-type": "application/json",
    date: "Thu, 05 Aug 2021 22:09:21 GMT",
    forwarded:
      "for=216.232.32.188;host=oop-web-a3c641-test.apps.silver.devops.gov.bc.ca;proto=https",
    origin: "http://localhost:8080",
    pragma: "no-cache",
    referer: "http://localhost:8080/oop/review",
    "response-type": "application/json",
    "sec-ch-ua":
      '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    server: "nginx",
    "strict-transport-security": "max-age=86400; includeSubDomains",
    "transfer-encoding": "chunked",
    "user-agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36",
    uuid: "6e42086b-5692-4faf-8389-6c8cd7f3a5df",
    "x-content-type-options": "nosniff",
    "x-forwarded-for": "127.0.0.1, 216.232.32.188",
    "x-forwarded-host":
      "localhost:8080, oop-web-a3c641-test.apps.silver.devops.gov.bc.ca",
    "x-forwarded-port": "8080, 443",
    "x-forwarded-proto": "http, https",
    "x-frame-options": "DENY",
    "x-oracle-dms-ecid": "3b5774b5-75e1-4d39-9ad0-cf250cd27e11-0000fbe2",
    "x-oracle-dms-rid": "0",
    "x-powered-by": "Express",
    "x-weblogic-request-clusterinfo": "true",
    "x-xss-protection": "1",
  },
  config: {
    url: "/oop/api/oopIntegration/submission",
    method: "post",
    data:
      '{"uuid":"6e42086b-5692-4faf-8389-6c8cd7f3a5df","submissionDate":"2021-08-05","outOfProvinceMove":{"lastName":"PALXD","phn":"9310134963","phoneNumber":null,"applicantRole":"AH","whoIsMoving":"AH_ONLY","allDependentsMoving":false,"dependentPHNs":[],"moveFromBCDate":"2021-08-20","arriveDestinationDate":"2021-08-21","isNewAddressKnown":false,"newAddress":{"country":"Canada","addressLines":[],"province":"AB","city":null,"postalCode":null}}}',
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      "Response-Type": "application/json",
      "X-Authorization":
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5vbmNlIjoiNmU0MjA4NmItNTY5Mi00ZmFmLTgzODktNmM4Y2Q3ZjNhNWRmIn0sImlhdCI6MTYyODIwMTMxOSwiZXhwIjoxNjI4MjEyMTE5fQ.RtcDszM8E1o8OzSNsniGgo8bBFHGhba7M8JwC9wCFEg",
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

describe("ReviewPage.vue", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: cloneDeep(formTemplate),
      },
    });
    wrapper = shallowMount(Component, {
      localVue,
      store,
      router,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("renders", () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(mockSubmit));
    expect(wrapper.element).toBeDefined();
  });
});

describe("ReviewPage.vue submitForm()", () => {
  let wrapper;
  let store;

  const dummyFormData = {
    applicationUuid: "defaultUuid",
    captchaToken: "defaultCaptcha",
    lastName: "defaultLastname",
    phn: "defaultPhn",
    phone: "defaultPhone",
    moveFromBCDate: new Date(2021, 11, 17),
    arriveDestinationDate: new Date(2021, 11, 18),
    isNewAddressKnown: false,
    country: "fake-istan",
    addressLines: ["123 fake street", "unit 111"],
    province: "fakeprovince",
    city: "fakesville",
    postalCode: "H0H0H0",
    accountType: "AH",
    personMoving: null,
    isAllDependentsMoving: null,
    dependentPhns: [],
    submissionDate: null,
    referenceNumber: null,
    submissionResponse: null,
    submissionError: null,
  };

  let tempForm = cloneDeep(formTemplate.default);
  tempForm.state = dummyFormData;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: tempForm,
      },
    });
    wrapper = shallowMount(Component, {
      localVue,
      store,
      router,
    });

    axios.post.mockImplementation(() => Promise.resolve(mockSubmit));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("dispatches", () => {
    const spyOnDispatch = jest.spyOn(wrapper.vm.$store, "dispatch");
    wrapper.vm.submitForm();
    expect(spyOnDispatch).toHaveBeenCalled();
  });

  it("navigates to submission page on successful submission", async () => {
    const spyOnNavigate = jest.spyOn(wrapper.vm, "navigateToSubmissionPage");
    await wrapper.vm.submitForm();
    await wrapper.vm.$nextTick();
    expect(spyOnNavigate).toHaveBeenCalled();
  });

  it("calls logservice on successful submission", async () => {
    await wrapper.vm.submitForm();
    await wrapper.vm.$nextTick();
    expect(spyOnLogSubmission).toHaveBeenCalled();
  });

  it("calls dispatch on successful submission with correct parameters", async () => {
    const spyOnDispatch = jest.spyOn(wrapper.vm.$store, "dispatch");
    await wrapper.vm.submitForm();
    await wrapper.vm.$nextTick();
    expect(spyOnDispatch).toHaveBeenCalledTimes(2);
    //426809 is the reference number in the mockSubmit response
    expect(spyOnDispatch).toHaveBeenCalledWith("form/setReferenceNumber","426809");
  });
});
