import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import { cloneDeep } from "lodash";
import * as formTemplate from "@/store/modules/form";
import Component from "@/views/SubmissionErrorPage.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import pageStateService from "@/services/page-state-service";
import logService from "@/services/log-service";

const spyOnPrint = jest.spyOn(window, "print").mockImplementation(() => {});

const spyOnSetPageComplete = jest
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));

const spyOnSetPageIncomplete = jest
  .spyOn(pageStateService, "setPageIncomplete")
  .mockImplementation(() => Promise.resolve("set"));

const scrollHelper = require("@/helpers/scroll");

const spyOnLogNavigation = jest
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
  scrollToError: jest.fn(),
}));

const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
Vue.use(Vuelidate);
Vue.component("font-awesome-icon", FontAwesomeIcon);
const router = new VueRouter();

describe("SubmissionErrorPage.vue", () => {
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

  it("calls logService on load", () => {
    expect(spyOnLogNavigation).toHaveBeenCalled();
  });
});

/*
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
    const spyOnRouter = jest
      .spyOn(router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));
    wrapper.vm.navigateToHomePage();
    expect(spyOnRouter).toHaveBeenCalled();
  });

  it("calls scrollTo", async () => {
    wrapper.vm.navigateToHomePage();
    expect(spyOnScrollTo).toHaveBeenCalled();
  });
});

*/