import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import { cloneDeep } from "lodash";
import * as formTemplate from "@/store/modules/form";
import Component from "@/views/ReviewPage.vue";
import axios from "axios";

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(() => {
    return Promise.resolve();
  }),
}));

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
Vue.use(Vuelidate);
const router = new VueRouter();

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
});
