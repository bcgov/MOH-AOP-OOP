import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import Component from "@/components/ProgressBar.vue";
import pageStateService from "@/services/page-state-service";
import { cloneDeep } from "lodash";
import * as stepRoutes from "@/router/step-routes";
import { routeStepOrder } from "@/router/routes";
import * as formTemplate from "@/store/modules/form";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
Vue.use(Vuelidate);
const router = new VueRouter();

// const scrollHelper = require("@/helpers/scroll");
// const addressHelper = require("@/helpers/address");
// const stringHelper = require("@/helpers/string");

jest
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));
jest
  .spyOn(pageStateService, "visitPage")
  .mockImplementation(() => Promise.resolve("visited"));

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
  scrollToError: jest.fn(),
}));

// const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");
// const spyOnScrollToError = jest.spyOn(scrollHelper, "scrollToError");



describe("ProgressBar.vue", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(formTemplate));
    wrapper = mount(Component, {
      localVue,
      store,
      propsData: {
        routes: stepRoutes.default,
      },
      router,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("renders", async () => {
    expect(wrapper.element).toBeDefined();
  });
});

describe("ProgressBar.vue onClickLink()", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store(cloneDeep(formTemplate));
    wrapper = mount(Component, {
      localVue,
      store,
      propsData: {
        routes: stepRoutes.default,
      },
      router,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls pageStateService.setPageComplete when passed path", async () => {
    await wrapper.vm.onClickLink(routeStepOrder[0].path);
    await wrapper.vm.$nextTick();
    expect(pageStateService.setPageComplete).toHaveBeenCalled();
  });

  it("does not call pageStateService.setPageComplete when passed wrong path", async () => {
    await wrapper.vm.onClickLink("/asdf");
    await wrapper.vm.$nextTick();
    expect(pageStateService.setPageComplete).not.toHaveBeenCalled();
  });
});
