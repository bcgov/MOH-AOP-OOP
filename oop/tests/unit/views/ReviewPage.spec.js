import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import { cloneDeep } from "lodash";
import * as formTemplate from "@/store/modules/form";
import Component from "@/views/ReviewPage.vue";
import axios from "axios";
import logService from "@/services/log-service";
import pageStateService from "@/services/page-state-service";
import { routes, routeStepOrder } from "@/router/routes";
import { routeCollection } from "@/router/index";

const scrollHelper = require("@/helpers/scroll");

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(() => {
    return Promise.resolve();
  }),
}));

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
  scrollToError: jest.fn(),
  getTopScrollPosition: jest.fn(),
}));

const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");
const spyOnScrollToError = jest.spyOn(scrollHelper, "scrollToError");

const spyOnGetTopScrollPosition = jest
  .spyOn(scrollHelper, "getTopScrollPosition")
  .mockImplementation(() => Promise.resolve("top scroll position returned"));
const spyOnLogSubmission = jest
  .spyOn(logService, "logSubmission")
  .mockImplementation(() => Promise.resolve("logged"));
const spyOnLogNavigation = jest
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));
const spyOnLogError = jest
  .spyOn(logService, "logError")
  .mockImplementation(() => Promise.resolve("logged"));
const spyOnSetPageComplete = jest
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));
const spyOnSetPageIncomplete = jest
  .spyOn(pageStateService, "setPageIncomplete")
  .mockImplementation(() => Promise.resolve("set"));
const spyOnVisitPage = jest
  .spyOn(pageStateService, "visitPage")
  .mockImplementation(() => Promise.resolve("visited"));

const router = createRouter({
  history: createWebHistory(),
  routes: routeCollection,
});

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
    data: '{"uuid":"6e42086b-5692-4faf-8389-6c8cd7f3a5df","submissionDate":"2021-08-05","outOfProvinceMove":{"lastName":"PALXD","phn":"9310134963","phoneNumber":null,"applicantRole":"AH","whoIsMoving":"AH_ONLY","allDependentsMoving":false,"dependentPHNs":[],"moveFromBCDate":"2021-08-20","arriveDestinationDate":"2021-08-21","isNewAddressKnown":false,"newAddress":{"country":"Canada","addressLines":[],"province":"AB","city":null,"postalCode":null}}}',
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

const mockSubmitError1 = {
  data: {
    applicationUuid: "6e42086b-5692-4faf-8389-6c8cd7f3a5df",
    returnCode: "1",
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
    data: '{"uuid":"6e42086b-5692-4faf-8389-6c8cd7f3a5df","submissionDate":"2021-08-05","outOfProvinceMove":{"lastName":"PALXD","phn":"9310134963","phoneNumber":null,"applicantRole":"AH","whoIsMoving":"AH_ONLY","allDependentsMoving":false,"dependentPHNs":[],"moveFromBCDate":"2021-08-20","arriveDestinationDate":"2021-08-21","isNewAddressKnown":false,"newAddress":{"country":"Canada","addressLines":[],"province":"AB","city":null,"postalCode":null}}}',
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

const mockSubmitError2 = {
  data: {
    applicationUuid: "6e42086b-5692-4faf-8389-6c8cd7f3a5df",
    returnCode: "2",
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
    data: '{"uuid":"6e42086b-5692-4faf-8389-6c8cd7f3a5df","submissionDate":"2021-08-05","outOfProvinceMove":{"lastName":"PALXD","phn":"9310134963","phoneNumber":null,"applicantRole":"AH","whoIsMoving":"AH_ONLY","allDependentsMoving":false,"dependentPHNs":[],"moveFromBCDate":"2021-08-20","arriveDestinationDate":"2021-08-21","isNewAddressKnown":false,"newAddress":{"country":"Canada","addressLines":[],"province":"AB","city":null,"postalCode":null}}}',
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

const mockSubmitError3 = {
  data: {
    applicationUuid: "6e42086b-5692-4faf-8389-6c8cd7f3a5df",
    returnCode: "3",
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
    data: '{"uuid":"6e42086b-5692-4faf-8389-6c8cd7f3a5df","submissionDate":"2021-08-05","outOfProvinceMove":{"lastName":"PALXD","phn":"9310134963","phoneNumber":null,"applicantRole":"AH","whoIsMoving":"AH_ONLY","allDependentsMoving":false,"dependentPHNs":[],"moveFromBCDate":"2021-08-20","arriveDestinationDate":"2021-08-21","isNewAddressKnown":false,"newAddress":{"country":"Canada","addressLines":[],"province":"AB","city":null,"postalCode":null}}}',
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

describe("ReviewPage.vue", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = createStore({
      modules: {
        form: cloneDeep(formTemplate),
      },
    });
    wrapper = shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
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
  // eslint-disable-next-line
  let spyOnRouter;

  let tempForm = cloneDeep(formTemplate.default);
  tempForm.state = dummyFormData;

  beforeEach(() => {
    store = createStore({
      modules: {
        form: tempForm,
      },
    });
    wrapper = shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
    });

    spyOnRouter = jest
      .spyOn(router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));

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
    expect(spyOnDispatch).toHaveBeenCalledWith(
      "form/setReferenceNumber",
      "426809"
    );
  });
});

describe("ReviewPage.vue submitForm() errors/exceptions", () => {
  let wrapper;
  let store;

  let tempForm = cloneDeep(formTemplate.default);
  tempForm.state = dummyFormData;

  beforeEach(() => {
    store = createStore({
      modules: {
        form: tempForm,
      },
    });
    wrapper = shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
      props: {
        isSystemUnavailable: false,
      },
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("does not call logSubmission, dispatch, or navigateToSubmission on return code 1", async () => {
    axios.post.mockImplementation(() => Promise.resolve(mockSubmitError1));
    const spyOnDispatch = jest.spyOn(wrapper.vm.$store, "dispatch");
    const spyOnNavigate = jest.spyOn(wrapper.vm, "navigateToSubmissionPage");
    await wrapper.vm.submitForm();
    await wrapper.vm.$nextTick();
    expect(spyOnDispatch).not.toHaveBeenCalledWith(
      "form/setReferenceNumber",
      "426809"
    );
    expect(spyOnNavigate).not.toHaveBeenCalled();
    expect(spyOnLogSubmission).not.toHaveBeenCalled();
  });

  it("does not call logSubmission, dispatch, or navigateToSubmission on return code 2", async () => {
    axios.post.mockImplementation(() => Promise.resolve(mockSubmitError2));
    const spyOnDispatch = jest.spyOn(wrapper.vm.$store, "dispatch");
    const spyOnNavigate = jest.spyOn(wrapper.vm, "navigateToSubmissionPage");
    await wrapper.vm.submitForm();
    await wrapper.vm.$nextTick();
    expect(spyOnDispatch).not.toHaveBeenCalledWith(
      "form/setReferenceNumber",
      "426809"
    );
    expect(spyOnNavigate).not.toHaveBeenCalled();
    expect(spyOnLogSubmission).not.toHaveBeenCalled();
  });

  it("logs error on return code 2", async () => {
    axios.post.mockImplementation(() => Promise.resolve(mockSubmitError2));
    await wrapper.vm.submitForm();
    await wrapper.vm.$nextTick();
    expect(spyOnLogError).toHaveBeenCalled();
  });

  it("calls navigateSubmissionError on return code 2", async () => {
    axios.post.mockImplementation(() => Promise.resolve(mockSubmitError2));
    const spyOnNavigateError = jest.spyOn(
      wrapper.vm,
      "navigateToSubmissionErrorPage"
    );
    await wrapper.vm.submitForm();
    await wrapper.vm.$nextTick();
    expect(spyOnNavigateError).toHaveBeenCalled();
  });

  it("logs error on return code 3", async () => {
    axios.post.mockImplementation(() => Promise.resolve(mockSubmitError3));
    await wrapper.vm.submitForm();
    await wrapper.vm.$nextTick();
    expect(spyOnLogError).toHaveBeenCalled();
  });

  it("scrolls to error on return code 3", async () => {
    axios.post.mockImplementation(() => Promise.resolve(mockSubmitError3));
    await wrapper.vm.submitForm();
    await wrapper.vm.$nextTick();
    expect(spyOnScrollToError).toHaveBeenCalled();
  });

  it("calls spyOnScrollToError on HTTP error", async () => {
    axios.post.mockImplementation(() => Promise.resolve("potato"));
    await wrapper.vm.submitForm();
    await wrapper.vm.$nextTick();
    expect(spyOnScrollToError).toHaveBeenCalled();
  });

  it("calls logError on HTTP error", async () => {
    axios.post.mockImplementation(() => Promise.resolve("potato"));
    await wrapper.vm.submitForm();
    await wrapper.vm.$nextTick();
    expect(spyOnLogError).toHaveBeenCalled();
  });

  it("sets system to unavailable on HTTP error", async () => {
    expect(wrapper.vm.isSystemUnavailable).toEqual(false);
    axios.post.mockImplementation(() => Promise.resolve("potato"));
    await wrapper.vm.submitForm();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.isSystemUnavailable).toEqual(true);
  });
});

describe("ReviewPage.vue navigateToSubmissionPage()", () => {
  let wrapper;
  let store;
  let spyOnRouter;

  beforeEach(() => {
    store = createStore({
      modules: {
        form: cloneDeep(formTemplate),
      },
    });
    wrapper = shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
    });

    spyOnRouter = jest
      .spyOn(router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls pageStateService.setPageComplete", async () => {
    await wrapper.vm.navigateToSubmissionPage();
    await wrapper.vm.$nextTick();
    expect(spyOnSetPageComplete).toHaveBeenCalled();
  });

  it("calls pageStateService.visitPage", async () => {
    await wrapper.vm.navigateToSubmissionPage();
    await wrapper.vm.$nextTick();
    expect(spyOnVisitPage).toHaveBeenCalled();
  });

  it("calls router.push", async () => {
    await wrapper.vm.navigateToSubmissionPage();
    await wrapper.vm.$nextTick();
    expect(spyOnRouter).toHaveBeenCalled();
  });

  it("calls scrollTo", async () => {
    await wrapper.vm.navigateToSubmissionPage();
    await wrapper.vm.$nextTick();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });
});

describe("ReviewPage.vue navigateToSubmissionErrorPage()", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = createStore({
      modules: {
        form: cloneDeep(formTemplate),
      },
    });
    wrapper = shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls pageStateService.setPageComplete", async () => {
    await wrapper.vm.navigateToSubmissionErrorPage();
    await wrapper.vm.$nextTick();
    expect(spyOnSetPageComplete).toHaveBeenCalled();
  });

  it("calls pageStateService.visitPage", async () => {
    await wrapper.vm.navigateToSubmissionErrorPage();
    await wrapper.vm.$nextTick();
    expect(spyOnVisitPage).toHaveBeenCalled();
  });

  it("calls router.push", async () => {
    const spyOnRouter = jest.spyOn(router, "push");
    await wrapper.vm.navigateToSubmissionErrorPage();
    await wrapper.vm.$nextTick();
    expect(spyOnRouter).toHaveBeenCalled();
  });

  it("calls scrollTo", async () => {
    await wrapper.vm.navigateToSubmissionErrorPage();
    await wrapper.vm.$nextTick();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });
});

describe("ReviewPage.vue created()", () => {
  let store;

  beforeEach(() => {
    store = createStore({
      modules: {
        form: cloneDeep(formTemplate),
      },
    });
    shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls logNavigation", () => {
    axios.post.mockImplementationOnce(() => Promise.resolve(mockSubmit));
    expect(spyOnLogNavigation).toHaveBeenCalled();
  });
});

describe("ReviewPage.vue beforeRouteLeave()", () => {
  let wrapper;
  let store;

  const next = jest.fn();

  let tempForm = cloneDeep(formTemplate.default);
  tempForm.state = dummyFormData;

  beforeEach(() => {
    store = createStore({
      modules: {
        form: tempForm,
      },
    });
    wrapper = shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls pageStateService.setPageIncomplete", () => {
    Component.beforeRouteLeave(routeStepOrder[1], routes.REVIEW_PAGE, next);
    expect(spyOnSetPageIncomplete).toHaveBeenCalled();
  });

  it("calls next() if destination is past path", () => {
    Component.beforeRouteLeave(routeStepOrder[1], routes.REVIEW_PAGE, next);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith();
  });

  it("calls next() with specific arguments if destination is same or later", async () => {
    Component.beforeRouteLeave(routes.REVIEW_PAGE, routes.REVIEW_PAGE, next);
    expect(next).toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith({
      path: routes.REVIEW_PAGE.path,
      replace: true,
    });
  });

  it("calls scrollTo() if destination is same or later", async () => {
    jest.useFakeTimers();
    Component.beforeRouteLeave.call(
      wrapper.vm,
      routes.REVIEW_PAGE,
      routes.REVIEW_PAGE,
      next
    );
    jest.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    expect(spyOnGetTopScrollPosition).toHaveBeenCalled();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });

  //the following test doesn't work, and I was unable to find a way to make it work
  //long story short, the spy on dispatch seems to require a wrapper to apply correctly
  //and I can't seem to call beforeRouteLeave() from the wrapper without causing errors
  //I leave it here for posterity in case someone finds a way to make it work down the road

  it.skip("dispatches formReset if destination is home page", async () => {
    jest.useFakeTimers();
    const beforeRouteLeave = wrapper.vm.$options.beforeRouteLeave;
    console.log("potato", wrapper.vm.$options);
    if (beforeRouteLeave instanceof Function) {
      console.log("yes function");
    } else {
      console.log("no function");
    }
    const spyOnDispatch = jest.spyOn(store, "dispatch");

    // Component.beforeRouteLeave(routeStepOrder[0], routes.REVIEW_PAGE, next);
    // wrapper.vm.$options.beforeRouteLeave(routeStepOrder[0], routes.REVIEW_PAGE, next);
    beforeRouteLeave(wrapper.vm, routeStepOrder[0], routes.REVIEW_PAGE, next);
    jest.advanceTimersByTime(5);
    await wrapper.vm.$nextTick;
    // store.dispatch("form/resetForm")
    expect(spyOnDispatch).toHaveBeenCalled();
  });
});
