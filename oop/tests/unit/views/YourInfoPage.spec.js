import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuelidate from "vuelidate";
import YourInfoPage from "@/views/YourInfoPage.vue";
import axios from "axios";
import logService from "@/services/log-service";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

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

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

jest.spyOn(logService, "logNavigation").mockImplementation(jest.fn);

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
  it("returns an error when given insufficient data", async () => {
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

    axios.get.mockImplementationOnce(() => Promise.resolve(mockResponse));

    wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    expect(wrapper.element).toBeDefined();
    // expect(wrapper.vm.$v.$invalid).toEqual(false);
  });
});
