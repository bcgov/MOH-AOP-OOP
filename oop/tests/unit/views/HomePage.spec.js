import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Component from "@/views/HomePage.vue";
import spaEnvService from "@/services/spa-env-service";
import pageStateService from "@/services/page-state-service";
import formTemplate from "@/store/modules/form";
import { cloneDeep } from "lodash";

const spaEnvServiceResponse = {
  data: {
    SPA_ENV_OOP_MAINTENANCE_FLAG: "false",
    SPA_ENV_OOP_MAINTENANCE_START: "2021-05-20 11:00:00 AM",
    SPA_ENV_OOP_MAINTENANCE_END: "2021-05-20 11:00:00 PM",
    SPA_ENV_OOP_MAINTENANCE_MESSAGE:
      "This application is temporarily unavailable. We apologize for any inconvenience. Please try again later.",
    SPA_ENV_OOP_ENABLE_ADDRESS_VALIDATOR: "true",
  },
  status: 200,
  statusText: "OK",
  headers: {
    "access-control-allow-credentials": "true",
    "access-control-allow-headers":
      "Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-origin": "https://my.gov.bc.ca",
    "access-control-expose-headers": "Authorization",
    "cache-control": "no-store",
    connection: "close",
    "content-length": "339",
    "content-security-policy":
      "default-src * data: blob: filesystem: 'unsafe-inline' 'unsafe-eval'",
    "content-type": "application/json; charset=utf-8",
    date: "Fri, 16 Jul 2021 17:13:20 GMT",
    etag: 'W/"153-GDCv0dFpnRzks5Q4aJXEeiTyqxw"',
    pragma: "no-cache",
    server: "nginx",
    "strict-transport-security": "max-age=86400; includeSubDomains",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "x-powered-by": "Express",
    "x-xss-protection": "1",
  },
  config: {
    url: "/oop/api/env",
    method: "post",
    data: null,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/x-www-form-urlencoded",
      SPA_ENV_NAME:
        '{"SPA_ENV_OOP_MAINTENANCE_FLAG":"","SPA_ENV_OOP_MAINTENANCE_START":"","SPA_ENV_OOP_MAINTENANCE_END":"","SPA_ENV_OOP_MAINTENANCE_MESSAGE":"","SPA_ENV_OOP_ENABLE_ADDRESS_VALIDATOR":""}',
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

const spaEnvServiceMaintenance = {
  data: {
    SPA_ENV_OOP_MAINTENANCE_FLAG: "true",
    SPA_ENV_OOP_MAINTENANCE_START: "2021-05-20 11:00:00 AM",
    SPA_ENV_OOP_MAINTENANCE_END: "2021-05-20 11:00:00 PM",
    SPA_ENV_OOP_MAINTENANCE_MESSAGE:
      "This application is temporarily unavailable. We apologize for any inconvenience. Please try again later.",
    SPA_ENV_OOP_ENABLE_ADDRESS_VALIDATOR: "true",
  },
  status: 200,
  statusText: "OK",
  headers: {
    "access-control-allow-credentials": "true",
    "access-control-allow-headers":
      "Accept,Authorization,Cache-Control,Content-Type,DNT,If-Modified-Since,Keep-Alive,Origin,User-Agent,X-Requested-With",
    "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
    "access-control-allow-origin": "https://my.gov.bc.ca",
    "access-control-expose-headers": "Authorization",
    "cache-control": "no-store",
    connection: "close",
    "content-length": "339",
    "content-security-policy":
      "default-src * data: blob: filesystem: 'unsafe-inline' 'unsafe-eval'",
    "content-type": "application/json; charset=utf-8",
    date: "Fri, 16 Jul 2021 17:13:20 GMT",
    etag: 'W/"153-GDCv0dFpnRzks5Q4aJXEeiTyqxw"',
    pragma: "no-cache",
    server: "nginx",
    "strict-transport-security": "max-age=86400; includeSubDomains",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
    "x-powered-by": "Express",
    "x-xss-protection": "1",
  },
  config: {
    url: "/oop/api/env",
    method: "post",
    data: null,
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/x-www-form-urlencoded",
      SPA_ENV_NAME:
        '{"SPA_ENV_OOP_MAINTENANCE_FLAG":"","SPA_ENV_OOP_MAINTENANCE_START":"","SPA_ENV_OOP_MAINTENANCE_END":"","SPA_ENV_OOP_MAINTENANCE_MESSAGE":"","SPA_ENV_OOP_ENABLE_ADDRESS_VALIDATOR":""}',
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

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();

const scrollHelper = require("@/helpers/scroll");

jest
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));
jest
  .spyOn(pageStateService, "visitPage")
  .mockImplementation(() => Promise.resolve("visited"));

jest
  .spyOn(spaEnvService, "loadEnvs")
  .mockImplementation(() => Promise.resolve(spaEnvServiceResponse));

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
}));

const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");

describe("HomePage.vue", () => {
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
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});

describe("HomePage.vue handleCloseConsentModal()", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: cloneDeep(formTemplate),
      },
      data: () => {
        return {
          showConsentModal: true,
        };
      },
    });
    wrapper = shallowMount(Component, {
      localVue,
      store,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("changes showConsentModal to false", async () => {
    wrapper.vm.handleCloseConsentModal();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.showConsentModal).toEqual(false);
  });
});

describe("HomePage.vue nextPage()", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: cloneDeep(formTemplate),
      },
      data: () => {
        return {
          showConsentModal: true,
        };
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

  it("pushes to router", async () => {
    const spyOnRouter = jest
      .spyOn(router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));

    wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    expect(spyOnRouter).toHaveBeenCalled();
  });

  it("calls scrollTo with the parameter 0", async () => {
    wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    expect(spyOnScrollTo).toHaveBeenCalledWith(0);
  });

  it("calls pageStateService", async () => {
    wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    expect(pageStateService.setPageComplete).toHaveBeenCalled();
    expect(pageStateService.visitPage).toHaveBeenCalled();
  });
});

describe("HomePage.vue created()", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: cloneDeep(formTemplate),
      },
      data: () => {
        return {
          showConsentModal: true,
        };
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
  
  jest
    .spyOn(spaEnvService, "loadEnvs")
    .mockImplementationOnce(() => Promise.resolve(spaEnvServiceMaintenance));

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});
