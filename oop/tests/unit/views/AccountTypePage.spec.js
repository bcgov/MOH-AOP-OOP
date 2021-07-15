import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import Component from "@/views/AccountTypePage.vue";
// import axios from "axios";
import logService from "@/services/log-service";
// import apiService from "@/services/api-service";
import pageStateService from "@/services/page-state-service";
import formTemplate from "@/store/modules/form";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

// const mockResponse = {
//   data: {
//     applicationUuid: "89695849-cfc1-49ef-8bc9-552a71b891f1",
//     returnCode: "0",
//     message: "PHN and last name matches. Applicant PHN is DEP",
//     applicantRole: "DEP",
//   },
//   status: 200,
//   statusText: "OK",
//   headers: {
//     accept: "application/json, text/plain, */*",
//     "accept-encoding": "gzip, deflate, br",
//     "accept-language": "en-US,en;q=0.9",
//     "access-control-allow-credentials": "true",
//     "access-control-allow-headers":
//       "Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With",
//     "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//     "access-control-allow-origin": "https://my.gov.bc.ca",
//     "access-control-expose-headers": "Authorization",
//     breadcrumbid: "ID-vs-dapp045-maximusbchealth-local-1624634339960-0-11",
//     "cache-control": "no-store",
//     checkr32: "Y",
//     connection: "close",
//     "content-security-policy":
//       "default-src * data: blob: filesystem: 'unsafe-inline' 'unsafe-eval'",
//     "content-type": "application/json",
//     date: "Tue, 29 Jun 2021 18:19:51 GMT",
//     expires: "Wed, 17 Jun 2020 17:30:34 GMT",
//     forwarded:
//       "for=216.232.32.188;host=oop-web-a3c641-dev.apps.silver.devops.gov.bc.ca;proto=https",
//     origin: "http://localhost:8080",
//     phn: "9353166544",
//     pragma: "no-cache",
//     "response-type": "application/json",
//     "sec-ch-ua":
//       '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
//     "sec-ch-ua-mobile": "?0",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     server: "nginx",
//     "strict-transport-security": "max-age=86400; includeSubDomains",
//     "transfer-encoding": "chunked",
//     uuid: "89695849-cfc1-49ef-8bc9-552a71b891f1",
//     "www-authenticate": "Basic",
//     "x-content-type-options": "nosniff",
//     "x-forwarded-for": "127.0.0.1, 216.232.32.188",
//     "x-forwarded-host":
//       "localhost:8080, oop-web-a3c641-dev.apps.silver.devops.gov.bc.ca",
//     "x-forwarded-port": "8080, 443",
//     "x-forwarded-proto": "http, https",
//     "x-frame-options": "DENY",
//     "x-oracle-dms-ecid": "c0428783-e7f8-4eb2-8cf9-614a6821cc48-0000aef8",
//     "x-oracle-dms-rid": "0",
//     "x-powered-by": "Express",
//     "x-rm-jurisdiction": "bc",
//     "x-weblogic-request-clusterinfo": "true",
//     "x-xss-protection": "1",
//   },
//   config: {
//     url: "/oop/api/oopIntegration/validatePhnName",
//     method: "post",
//     data:
//       '{"applicationUuid":"89695849-cfc1-49ef-8bc9-552a71b891f1","lastName":"PICKET BOATXE","phn":"9353166544"}',
//     headers: {
//       Accept: "application/json, text/plain, */*",
//       "Content-Type": "application/json",
//       "Response-Type": "application/json",
//       "X-Authorization":
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5vbmNlIjoiODk2OTU4NDktY2ZjMS00OWVmLThiYzktNTUyYTcxYjg5MWYxIn0sImlhdCI6MTYyNDk5MDc4MiwiZXhwIjoxNjI1MDAxNTgyfQ.U5920Pa6686A4PXQ-8fhX3MLmxe22bTrqqnzSgoJ10g",
//     },
//     transformRequest: [null],
//     transformResponse: [null],
//     timeout: 0,
//     xsrfCookieName: "XSRF-TOKEN",
//     xsrfHeaderName: "X-XSRF-TOKEN",
//     maxContentLength: -1,
//     maxBodyLength: -1,
//   },
//   request: {},
// };

// const mockResponsePhnDoesNotMatch = {
//   data: {
//     applicationUuid: "f4c826ed-5c30-4127-9cc8-c4d4cf358d42",
//     returnCode: "1",
//     message: "PHN and last name does not match",
//   },
//   status: 200,
//   statusText: "OK",
//   headers: {
//     accept: "application/json, text/plain, */*",
//     "accept-encoding": "gzip, deflate, br",
//     "accept-language": "en-US,en;q=0.9",
//     "access-control-allow-credentials": "true",
//     "access-control-allow-headers":
//       "Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With",
//     "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
//     "access-control-allow-origin": "https://my.gov.bc.ca",
//     "access-control-expose-headers": "Authorization",
//     breadcrumbid: "ID-vs-dapp046-maximusbchealth-local-1624634336247-0-41",
//     "cache-control": "no-store",
//     checkr32: "Y",
//     connection: "close",
//     "content-security-policy":
//       "default-src * data: blob: filesystem: 'unsafe-inline' 'unsafe-eval'",
//     "content-type": "application/json",
//     date: "Tue, 29 Jun 2021 22:14:07 GMT",
//     expires: "Wed, 17 Jun 2020 17:30:34 GMT",
//     forwarded:
//       "for=216.232.32.188;host=oop-web-a3c641-dev.apps.silver.devops.gov.bc.ca;proto=https",
//     origin: "http://localhost:8080",
//     phn: "9353166544",
//     pragma: "no-cache",
//     "response-type": "application/json",
//     "sec-ch-ua":
//       '" Not;A Brand";v="99", "Google Chrome";v="91", "Chromium";v="91"',
//     "sec-ch-ua-mobile": "?0",
//     "sec-fetch-dest": "empty",
//     "sec-fetch-mode": "cors",
//     "sec-fetch-site": "same-origin",
//     server: "nginx",
//     "strict-transport-security": "max-age=86400; includeSubDomains",
//     "transfer-encoding": "chunked",
//     uuid: "f4c826ed-5c30-4127-9cc8-c4d4cf358d42",
//     "www-authenticate": "Basic",
//     "x-content-type-options": "nosniff",
//     "x-forwarded-for": "127.0.0.1, 216.232.32.188",
//     "x-forwarded-host":
//       "localhost:8080, oop-web-a3c641-dev.apps.silver.devops.gov.bc.ca",
//     "x-forwarded-port": "8080, 443",
//     "x-forwarded-proto": "http, https",
//     "x-frame-options": "DENY",
//     "x-oracle-dms-ecid": "8bb3eb62-41e2-4023-99ab-8719620d31b8-0000b5e6",
//     "x-oracle-dms-rid": "0",
//     "x-powered-by": "Express",
//     "x-rm-jurisdiction": "bc",
//     "x-weblogic-request-clusterinfo": "true",
//     "x-xss-protection": "1",
//   },
//   config: {
//     url: "/oop/api/oopIntegration/validatePhnName",
//     method: "post",
//     data:
//       '{"applicationUuid":"f4c826ed-5c30-4127-9cc8-c4d4cf358d42","lastName":"aaaaaaaaaa","phn":"9353166544"}',
//     headers: {
//       Accept: "application/json, text/plain, */*",
//       "Content-Type": "application/json",
//       "Response-Type": "application/json",
//       "X-Authorization":
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5vbmNlIjoiZjRjODI2ZWQtNWMzMC00MTI3LTljYzgtYzRkNGNmMzU4ZDQyIn0sImlhdCI6MTYyNTAwNDgyNiwiZXhwIjoxNjI1MDE1NjI2fQ.nl9StLFRCtgrE8lWTLiBqznoCxNdq2uEkugFu5frEBU",
//     },
//     transformRequest: [null],
//     transformResponse: [null],
//     timeout: 0,
//     xsrfCookieName: "XSRF-TOKEN",
//     xsrfHeaderName: "X-XSRF-TOKEN",
//     maxContentLength: -1,
//     maxBodyLength: -1,
//   },
//   request: {},
// };

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

jest
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
// const spyOnScrollToError = jest.spyOn(scrollHelper, "scrollToError");

describe("AccountTypePage.vue", () => {
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

    store = new Vuex.Store(storeTemplate);
    // axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));
  });

  it("renders", () => {
    const wrapper = mount(Component, {
      store,
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe("AccountTypePage.vue handleValidationSuccess()", () => {
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
    store = new Vuex.Store(storeTemplate);
  });

  it("calls saveValues() function", async () => {
    const $route = {
      path: "/",
    };

    const $router = new VueRouter({
      $route,
    });

    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: {
        $router,
      },
    });

    const spyOnSaveValues = jest
      .spyOn(wrapper.vm, "saveValues")
      .mockImplementation(() => Promise.resolve("saved"));

    wrapper.vm.handleValidationSuccess();
    await wrapper.vm.$nextTick();

    expect(spyOnSaveValues).toHaveBeenCalled();
  });

  it("calls nextPage() function", async () => {
    const $route = {
      path: "/",
    };

    const $router = new VueRouter({
      $route,
    });

    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: {
        $router,
      },
    });

    const spyOnNextPage = jest
      .spyOn(wrapper.vm, "nextPage")
      .mockImplementation(() => Promise.resolve("next"));

    wrapper.vm.handleValidationSuccess();
    await wrapper.vm.$nextTick();

    expect(spyOnNextPage).toHaveBeenCalled();
  });
});

describe("AccountTypePage.vue saveValues()", () => {
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
    store = new Vuex.Store(storeTemplate);
  });

  it("changes account type in store", async () => {
    const $route = {
      path: "/",
    };

    const $router = new VueRouter({
      $route,
    });

    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: {
        $router,
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.setData({ accountType: "updatedaccount" });
    await wrapper.vm.$nextTick();

    wrapper.vm.saveValues();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$store.state.form.accountType).toEqual("updatedaccount");
  });

  it("changes person moving in store", async () => {
    const $route = {
      path: "/",
    };

    const $router = new VueRouter({
      $route,
    });

    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: {
        $router,
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.setData({ personMoving: "updatedpersonmoving" });
    await wrapper.vm.$nextTick();

    wrapper.vm.saveValues();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$store.state.form.personMoving).toEqual(
      "updatedpersonmoving"
    );
  });

  it("changes isAllDependentsMoving in store", async () => {
    const $route = {
      path: "/",
    };

    const $router = new VueRouter({
      $route,
    });

    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: {
        $router,
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.setData({ isAllDependentsMoving: "updateddependentsmoving" });
    await wrapper.vm.$nextTick();

    wrapper.vm.saveValues();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$store.state.form.isAllDependentsMoving).toEqual(
      "updateddependentsmoving"
    );
  });

  it("changes dependentPhns in store", async () => {
    const $route = {
      path: "/",
    };

    const $router = new VueRouter({
      $route,
    });

    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: {
        $router,
      },
    });

    await wrapper.vm.$nextTick();
    await wrapper.setData({ dependentPhns: ["updateddependentphns"] });
    await wrapper.vm.$nextTick();

    wrapper.vm.saveValues();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$store.state.form.dependentPhns).toEqual([
      "updateddependentphns",
    ]);
  });
});

describe("AccountTypePage.vue nextPage()", () => {
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
    store = new Vuex.Store(storeTemplate);
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

  it("pushes to router", async () => {
    const $route = {
      path: "/",
    };

    const $router = new VueRouter({
      $route,
    });

    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: {
        $router,
      },
    });

    const spyOnRouter = jest
      .spyOn($router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));

    wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    expect(spyOnRouter).toHaveBeenCalled();
  });

  it("calls scrollTo with the parameter 0", async () => {
    const $route = {
      path: "/",
    };

    const $router = new VueRouter({
      $route,
    });

    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: {
        $router,
      },
    });

    wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    expect(spyOnScrollTo).toHaveBeenCalledWith(0);
  });

  it("calls pageStateService", async () => {
    const $route = {
      path: "/",
    };

    const $router = new VueRouter({
      $route,
    });

    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: {
        $router,
      },
    });

    wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    expect(pageStateService.setPageComplete).toHaveBeenCalled();
    expect(pageStateService.visitPage).toHaveBeenCalled();
  });
});

//add dependent field test goes here

describe("AccountTypePage.vue getDependentPhns()", () => {
  const mutations = formTemplate.mutations;
  const actions = formTemplate.actions;

  const storeTemplate3 = {
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
          dependentPhns: [
            { value: "default1" },
            { value: "default2" },
            { value: "default3" },
          ],
        },
        namespaced: true,
      },
    },
  };

  const storeTemplate6 = {
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
          dependentPhns: [
            { value: "default1" },
            { value: "default2" },
            { value: "default3" },
            { value: "default4" },
            { value: "default5" },
            { value: "default6" },
          ],
        },
        namespaced: true,
      },
    },
  };

  it("returns an array that's the same length as the array in the store if the store contains 6-9 elements", async () => {
    const store = new Vuex.Store(storeTemplate6);

    const $route = {
      path: "/",
    };

    const $router = new VueRouter({
      $route,
    });

    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: {
        $router,
      },
    });

    const result = wrapper.vm.getDependentPhns();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.dependentPhns).toHaveLength(result.length);
    expect(wrapper.vm.$store.state.form.dependentPhns).toHaveLength(
      result.length
    );
  });

  it("returns an array of equal length to the number of elements put in if store contains 1-5 elements", async () => {
    //the code tops off the store and data with null elements, so there will always be five of them
    //this test is to check to make sure that if three non-null elements are put into the store 
    //then the result from this code will contain 3 non-null elements
    const store = new Vuex.Store(storeTemplate3);

    const $route = {
      path: "/",
    };

    const $router = new VueRouter({
      $route,
    });

    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: {
        $router,
      },
    });

    const result = wrapper.vm.getDependentPhns();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$store.state.form.dependentPhns).toHaveLength(5);
    expect(wrapper.vm.dependentPhns).toHaveLength(5);
    expect(result).toHaveLength(3);
  });

  it("returns an array containing the values of the store if the store contains 6-9 elements", async () => {
    const store = new Vuex.Store(storeTemplate6);

    const $route = {
      path: "/",
    };

    const $router = new VueRouter({
      $route,
    });

    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: {
        $router,
      },
    });

    const result = wrapper.vm.getDependentPhns();
    await wrapper.vm.$nextTick();

    expect(result).toEqual(["default1", "default2", "default3", "default4", "default5", "default6"]);
  });

  it("returns an array containing the values of the store if the store contains 1-5 elements", async () => {
    const store = new Vuex.Store(storeTemplate3);

    const $route = {
      path: "/",
    };

    const $router = new VueRouter({
      $route,
    });

    const wrapper = mount(Component, {
      store,
      localVue,
      mocks: {
        $router,
      },
    });

    const result = wrapper.vm.getDependentPhns();
    await wrapper.vm.$nextTick();

    expect(result).toEqual(["default1", "default2", "default3"]);
  });
});
