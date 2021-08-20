import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import { cloneDeep } from "lodash";
import * as formTemplate from "@/store/modules/form";
import Component from "@/views/SubmissionPage.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import pageStateService from "@/services/page-state-service";
import logService from "@/services/log-service";

const spyOnPrint = jest.spyOn(window, "print").mockImplementation(() => {});

const spyOnLogNavigation = jest
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));

const spyOnSetPageComplete = jest
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));

const spyOnSetPageIncomplete = jest
  .spyOn(pageStateService, "setPageIncomplete")
  .mockImplementation(() => Promise.resolve("set"));

const scrollHelper = require("@/helpers/scroll");

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
  scrollToError: jest.fn(),
}));

const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");

const formattedDate = new Date("2021-08-21T03:24:00");

const dummyData = {
  applicationUuid: null,
  captchaToken: null,
  lastName: null,
  phn: null,
  phone: null,
  moveFromBCDate: null,
  arriveDestinationDate: null,
  isNewAddressKnown: null,
  country: null,
  addressLines: [],
  province: null,
  city: null,
  postalCode: null,
  accountType: null,
  personMoving: null,
  isAllDependentsMoving: null,
  dependentPhns: [],
  submissionDate: formattedDate,
  referenceNumber: "1234567",
  submissionResponse: null,
  submissionError: null,
};

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
Vue.use(Vuelidate);
Vue.component("font-awesome-icon", FontAwesomeIcon);
const router = new VueRouter();

describe("SubmissionPage.vue", () => {
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

describe("SubmissionPage.vue printPage()", () => {
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

  it("calls window print function", () => {
    wrapper.vm.printPage();
    expect(spyOnPrint).toHaveBeenCalled();
  });
});

describe("SubmissionPage.vue navigateToHomePage()", () => {
  let wrapper;
  let store;
  let spyOnRouter;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: cloneDeep(formTemplate.default),
      },
    });
    wrapper = shallowMount(Component, {
      localVue,
      store,
      router,
    });

    spyOnRouter = jest
      .spyOn(router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls store dispatch", () => {
    const spyOnDispatch = jest.spyOn(wrapper.vm.$store, "dispatch");
    wrapper.vm.navigateToHomePage();
    expect(spyOnDispatch).toHaveBeenCalled();
  });

  it("calls pageStateService.setPageComplete", async () => {
    wrapper.vm.navigateToHomePage();
    expect(spyOnSetPageComplete).toHaveBeenCalled();
  });

  it("calls pageStateService.setPageIncomplete", async () => {
    wrapper.vm.navigateToHomePage();
    expect(spyOnSetPageIncomplete).toHaveBeenCalled();
  });

  it("calls router push", async () => {
    wrapper.vm.navigateToHomePage();
    expect(spyOnRouter).toHaveBeenCalled();
  });

  it("calls scrollTo", async () => {
    wrapper.vm.navigateToHomePage();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });
});

describe("SubmissionPage.vue created()", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    let tempForm = cloneDeep(formTemplate.default);
    tempForm.state = cloneDeep(dummyData);

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

  it("calls logNavigation() on page load", () => {
    expect(spyOnLogNavigation).toHaveBeenCalled();
  });

  it("sets data", () => {
    expect(wrapper.vm.submissionDate).toEqual("August 21, 2021");
    expect(wrapper.vm.referenceNumber).toEqual("1234567");
  });
});
