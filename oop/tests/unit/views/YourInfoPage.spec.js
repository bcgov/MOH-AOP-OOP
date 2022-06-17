import { mount } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import { routeCollection } from "@/router/index";
import Component from "@/views/YourInfoPage.vue";
import axios from "axios";
import logService from "@/services/log-service";
import apiService from "@/services/api-service";
import pageStateService from "@/services/page-state-service";
import formTemplate from "@/store/modules/form";

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

const spyOnLogNavigation = jest
  .spyOn(logService, "logNavigation")
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

jest.mock("@/helpers/scroll", () => ({
  scrollToError: jest.fn(),
  scrollTo: jest.fn(),
}));

const scrollHelper = require("@/helpers/scroll");

const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");
const spyOnScrollToError = jest.spyOn(scrollHelper, "scrollToError");

const router = createRouter({
  history: createWebHistory(),
  routes: routeCollection,
});

const spyOnRouter = jest
  .spyOn(router, "push")
  .mockImplementation(() => Promise.resolve("pushed"));

describe("YourInfoPage.vue", () => {
  let state;
  let store;

  beforeEach(() => {
    state = {
      lastName: null,
      phn: null,
      phone: null,
    };

    store = createStore({
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
    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe("YourInfoPage.vue nameValidator()", () => {
  it("validates as true when supplied a last name", async () => {
    const store = createStore({
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
    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    });

    wrapper.vm.$v.$touch();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.lastName.$error).toEqual(false);
  });

  it("validates as false when supplied a falsy last name value", async () => {
    const store = createStore({
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
    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    });

    wrapper.vm.$v.$touch();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.lastName.$error).toEqual(true);
  });
});

describe("YourInfoPage.vue phoneValidator()", () => {
  it("does not throw an error when supplied a string containing 10 numerical digits", async () => {
    const store = createStore({
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
    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    });

    wrapper.vm.$v.$touch();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.phone.$error).toEqual(false);
  });

  it("does not throw an error when supplied a null value, as the field is optional", async () => {
    const store = createStore({
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
    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    });

    wrapper.vm.$v.$touch();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.phone.$error).toEqual(false);
  });

  it("does throw an error when phone number length <10", async () => {
    const store = createStore({
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
    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    });

    wrapper.vm.$v.$touch();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.phone.$error).toEqual(true);
  });

  it("does throw an error when phone number contains invalid characters", async () => {
    const store = createStore({
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
    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    });

    wrapper.vm.$v.$touch();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.phone.$error).toEqual(true);
  });

  it("strips out surplus invalid characters so the phone number length is correct", async () => {
    const store = createStore({
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
    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    });

    wrapper.vm.$v.$touch();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.phone.$error).toEqual(false);
  });
});

describe("YourInfoPage.vue nextPage()", () => {
  let mockApiService;

  beforeEach(() => {
    mockApiService = jest.spyOn(apiService, "validateLastNamePhn");
  });

  afterEach(() => {
    mockApiService.mockReset();
    spyOnScrollToError.mockReset();
    logService.logError.mockReset();
    logService.logNavigation.mockReset();
    logService.logInfo.mockReset();
  });

  it("throws an error, does not call api service when last name is not present", async () => {
    const store = createStore({
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
    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    });

    mockApiService.mockImplementation(() => Promise.resolve(mockResponse));

    wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.$invalid).toEqual(true);
    expect(mockApiService).not.toHaveBeenCalled();
    expect(spyOnScrollToError).toHaveBeenCalled();
  });

  it("throws an error, does not call api service when phn is not present", async () => {
    const store = createStore({
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
    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    });

    mockApiService.mockImplementation(() => Promise.resolve(mockResponse));

    wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.$invalid).toEqual(true);
    expect(mockApiService).not.toHaveBeenCalled();
    expect(spyOnScrollToError).toHaveBeenCalled();
  });

  it("does call api service when last name and phn are present", async () => {
    const store = createStore({
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
        },
      },
    });
    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    });

    jest
      .spyOn(wrapper.vm, "handleValidationSuccess")
      .mockImplementation(() => Promise.resolve("handled"));

    expect(wrapper.element).toBeDefined();

    mockApiService.mockImplementation(() => Promise.resolve(mockResponse));

    wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.$invalid).toEqual(false);
    expect(spyOnScrollToError).not.toHaveBeenCalled();
    expect(mockApiService).toHaveBeenCalledWith(
      "defaultCaptchaToken",
      "defaultUUID",
      "Picket Boatxe",
      "9353166544"
    );
  });

  it("runs the code in case 0 (success) when info is found in the database", async () => {
    const store = createStore({
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
    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
      data: () => {
        return {
          accountType: "default",
        };
      },
    });

    mockApiService.mockImplementation(() => Promise.resolve(mockResponse));

    const mockHandleValidationSuccess = jest
      .spyOn(wrapper.vm, "handleValidationSuccess")
      .mockImplementation(() => Promise.resolve("handled"));

    await wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    expect(apiService.validateLastNamePhn).toHaveBeenCalled();
    expect(mockHandleValidationSuccess).toHaveBeenCalled();
    expect(spyOnScrollToError).not.toHaveBeenCalled();

    mockHandleValidationSuccess.mockReset();
  });

  it("runs the code in case 1 (error) when info doesn't match what's found in the database", async () => {
    const store = createStore({
      modules: {
        form: {
          state: {
            applicationUuid: "defaultUUID",
            captchaToken: "defaultCaptchaToken",
            lastName: "Picket Boatxee",
            phn: "9353 166 544",
            phone: "2222222222",
            applicantRole: "default",
            isValidationCode1Shown: false,
          },
          namespaced: true,
        },
      },
    });
    const wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
      data: () => {
        return {
          accountType: "default",
        };
      },
    });

    mockApiService.mockImplementation(() =>
      Promise.resolve(mockResponsePhnDoesNotMatch)
    );

    const mockHandleValidationSuccess = jest
      .spyOn(wrapper.vm, "handleValidationSuccess")
      .mockImplementation(() => jest.fn);

    await wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    expect(mockResponsePhnDoesNotMatch.data.returnCode).toEqual("1");
    expect(wrapper.vm.isValidationCode1Shown).toEqual(true);
    expect(logService.logInfo).toHaveBeenCalled();
    expect(spyOnScrollToError).toHaveBeenCalled();
    expect(mockHandleValidationSuccess).not.toHaveBeenCalled();

    mockHandleValidationSuccess.mockReset();
  });

  /* 
  In the future, it might be good to include tests for return codes 2 and 3.
  I had difficulty reproducing those conditions in order to test them, and was told
  not to worry about it by the rest of my team. However, if you're reading this,
  perhaps it has become relevant.
  */
});

describe("YourInfoPage.vue handleValidationSuccess()", () => {
  const mutations = formTemplate.mutations;
  const actions = formTemplate.actions;

  let store;

  beforeEach(() => {
    const storeTemplate = {
      modules: {
        form: {
          mutations,
          actions,
          state: {
            lastName: "defaultlastname",
            phn: "defaultphn",
            phone: "defaultphone",
            accountType: "default",
            personMoving: "default",
            isAllDependentsMoving: "default",
            dependentPhns: ["default"],
          },
          namespaced: true,
        },
      },
    };
    store = createStore(storeTemplate);
  });

  afterEach(() => {
    logService.logNavigation.mockReset();
    logService.logError.mockReset();
    logService.logInfo.mockReset();
    pageStateService.setPageComplete.mockReset();
    pageStateService.visitPage.mockReset();
    scrollHelper.scrollToError.mockReset();
    scrollHelper.scrollTo.mockReset();
  });

  it("renders", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
    });

    wrapper.vm.handleValidationSuccess();
    await wrapper.vm.$nextTick();

    expect(wrapper.element).toBeDefined();
  });

  it("updates the last name in the store with whatever is in the data", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
    });

    //await setData required because created() sets the data to whatever's in the store, which gets in the way of testing
    await wrapper.vm.$nextTick();
    await wrapper.setData({ lastName: "updatedlastname" });
    await wrapper.vm.$nextTick();

    wrapper.vm.handleValidationSuccess();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$store.state.form.lastName).toEqual("updatedlastname");
  });

  it("updates the phn in the store with whatever is in the data", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.setData({ phn: "updatedphn" });
    await wrapper.vm.$nextTick();

    wrapper.vm.handleValidationSuccess();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$store.state.form.phn).toEqual("updatedphn");
  });

  it("updates the phone in the store with whatever is in the data", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.setData({ phone: "updatedphone" });
    await wrapper.vm.$nextTick();
    wrapper.vm.handleValidationSuccess();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$store.state.form.phone).toEqual("updatedphone");
  });

  it("updates the account type in the store with whatever is in the data", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.setData({ accountType: "updatedaccountType" });
    await wrapper.vm.$nextTick();

    wrapper.vm.handleValidationSuccess();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$store.state.form.accountType).toEqual(
      "updatedaccountType"
    );
  });

  it("if account type is DEP, it updates the setPersonMoving in the store to null", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.setData({ accountType: "DEP" });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$store.state.form.personMoving).toEqual("default");

    wrapper.vm.handleValidationSuccess();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$store.state.form.personMoving).toBeNull();
  });

  it("if account type is DEP, it updates the isAllDependentsMoving in the store to null", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
    });

    expect(wrapper.vm.$store.state.form.isAllDependentsMoving).toEqual(
      "default"
    );

    await wrapper.vm.$nextTick();
    await wrapper.setData({ accountType: "DEP" });
    await wrapper.vm.$nextTick();

    wrapper.vm.handleValidationSuccess();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$store.state.form.isAllDependentsMoving).toBeNull();
  });

  it("if account type is DEP, it updates the dependentPhns in the store to an empty array", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
    });

    expect(wrapper.vm.$store.state.form.dependentPhns).toEqual(["default"]);

    await wrapper.vm.$nextTick();
    await wrapper.setData({ accountType: "DEP" });
    await wrapper.vm.$nextTick();

    wrapper.vm.handleValidationSuccess();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$store.state.form.dependentPhns).toEqual([]);
  });

  it("calls pageStateService", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
    });

    wrapper.vm.handleValidationSuccess();
    await wrapper.vm.$nextTick();

    expect(pageStateService.setPageComplete).toHaveBeenCalled();
    expect(pageStateService.visitPage).toHaveBeenCalled();
  });

  it("calls scrollTo with the parameter 0", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
    });

    wrapper.vm.handleValidationSuccess();
    await wrapper.vm.$nextTick();

    expect(spyOnScrollTo).toHaveBeenCalledWith(0);
  });

  it("calls routerPush to change page", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
    });

    wrapper.vm.handleValidationSuccess();
    await wrapper.vm.$nextTick();

    expect(spyOnRouter).toHaveBeenCalled();
  });
});

describe("YourInfoPage.vue handleLastNameInputChange()", () => {
  const mutations = formTemplate.mutations;
  const actions = formTemplate.actions;

  let store;

  const dataTemplate = {
    lastName: null,
    phn: null,
    phone: null,
    isLoading: false,
    isValidationCode1Shown: true,
    isValidationCode2Shown: true,
    isSystemUnavailable: false,
    accountType: null,
    lastNameInputStyle: {
      width: "350px",
      maxWidth: "100%",
    },
    phnInputStyle: {
      width: "160px",
      maxWidth: "100%",
    },
    phoneInputStyle: {
      width: "160px",
      maxWidth: "100%",
    },
  };

  beforeEach(() => {
    const storeTemplate = {
      modules: {
        form: {
          mutations,
          actions,
          state: {
            lastName: "defaultlastname",
            phn: "defaultphn",
            phone: "defaultphone",
            accountType: "default",
            personMoving: "default",
            isAllDependentsMoving: "default",
            dependentPhns: ["default"],
          },
          namespaced: true,
        },
      },
    };

    store = createStore(storeTemplate);
  });

  it("renders", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
      data: () => {
        return dataTemplate;
      },
    });

    wrapper.vm.handleLastNameInputChange();
    await wrapper.vm.$nextTick();

    expect(wrapper.element).toBeDefined();
  });

  it("sets validation code 1 to false in the data", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
      data: () => {
        return dataTemplate;
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.setData({ isValidationCode1Shown: true });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isValidationCode1Shown).toEqual(true);

    wrapper.vm.handleLastNameInputChange();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isValidationCode1Shown).toEqual(false);
  });

  it("sets validation code 2 to false in the data", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
      data: () => {
        return dataTemplate;
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.setData({ isValidationCode2Shown: true });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isValidationCode2Shown).toEqual(true);

    wrapper.vm.handleLastNameInputChange();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isValidationCode2Shown).toEqual(false);
  });
});

describe("YourInfoPage.vue handlePhnInputChange()", () => {
  const mutations = formTemplate.mutations;
  const actions = formTemplate.actions;

  let store;

  const dataTemplate = {
    lastName: null,
    phn: null,
    phone: null,
    isLoading: false,
    isValidationCode1Shown: true,
    isValidationCode2Shown: true,
    isSystemUnavailable: false,
    accountType: null,
    lastNameInputStyle: {
      width: "350px",
      maxWidth: "100%",
    },
    phnInputStyle: {
      width: "160px",
      maxWidth: "100%",
    },
    phoneInputStyle: {
      width: "160px",
      maxWidth: "100%",
    },
  };

  beforeEach(() => {
    const storeTemplate = {
      modules: {
        form: {
          mutations,
          actions,
          state: {
            lastName: "defaultlastname",
            phn: "defaultphn",
            phone: "defaultphone",
            accountType: "default",
            personMoving: "default",
            isAllDependentsMoving: "default",
            dependentPhns: ["default"],
          },
          namespaced: true,
        },
      },
    };

    store = createStore(storeTemplate);
  });

  it("renders", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
      data: () => {
        return dataTemplate;
      },
    });

    wrapper.vm.handlePhnInputChange();
    await wrapper.vm.$nextTick();

    expect(wrapper.element).toBeDefined();
  });

  it("sets validation code 1 to false in the data", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
      data: () => {
        return dataTemplate;
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.setData({ isValidationCode1Shown: true });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isValidationCode1Shown).toEqual(true);

    wrapper.vm.handlePhnInputChange();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isValidationCode1Shown).toEqual(false);
  });

  it("sets validation code 2 to false in the data", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [store, router],
      },
      data: () => {
        return dataTemplate;
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.setData({ isValidationCode2Shown: true });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isValidationCode2Shown).toEqual(true);

    wrapper.vm.handlePhnInputChange();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isValidationCode2Shown).toEqual(false);
  });
});

describe("YourInfoPage.vue created()", () => {
  let state;
  let store;
  let wrapper;

  beforeEach(() => {
    state = {
      lastName: "default1",
      phn: "default2",
      phone: "default3",
    };

    store = createStore({
      modules: {
        form: {
          state,
          namespaced: true,
        },
      },
    });

    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    wrapper = mount(Component, {
      global: {
        plugins: [store],
      },
    });
  });

  it("calls logNavigation() on page load", () => {
    expect(spyOnLogNavigation).toHaveBeenCalled();
  });

  it("sets data to values in state", () => {
    expect(wrapper.vm.lastName).toEqual("default1");
    expect(wrapper.vm.phn).toEqual("default2");
    expect(wrapper.vm.phone).toEqual("default3");
  });
});
