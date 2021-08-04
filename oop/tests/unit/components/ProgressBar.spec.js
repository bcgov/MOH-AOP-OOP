import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import Component from "@/components/ProgressBar.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import pageStateService from "@/services/page-state-service";
import { cloneDeep } from "lodash";
import * as stepRoutes from "@/router/step-routes";
import { routeStepOrder } from "@/router/routes";
import * as formTemplate from "@/store/modules/form";
import * as appTemplate from "@/store/modules/app";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
Vue.use(Vuelidate);
Vue.component("font-awesome-icon", FontAwesomeIcon);
const router = new VueRouter();

const scrollHelper = require("@/helpers/scroll");
// const addressHelper = require("@/helpers/address");
// const stringHelper = require("@/helpers/string");

jest
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));
jest
  .spyOn(pageStateService, "setPageIncomplete")
  .mockImplementation(() => Promise.resolve("set"));
jest
  .spyOn(pageStateService, "visitPage")
  .mockImplementation(() => Promise.resolve("visited"));

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
  scrollToError: jest.fn(),
}));

const spyOnRouter = jest.spyOn(router, "push");

const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");
// const spyOnScrollToError = jest.spyOn(scrollHelper, "scrollToError");

describe("ProgressBar.vue", () => {
  let wrapper;
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: cloneDeep(formTemplate),
        app: cloneDeep(appTemplate),
      },
    });
    wrapper = shallowMount(Component, {
      localVue,
      store,
      propsData: {
        currentPath: routeStepOrder[1].path,
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
    store = new Vuex.Store({
      modules: {
        form: cloneDeep(formTemplate),
        app: cloneDeep(appTemplate),
      },
    });
    wrapper = shallowMount(Component, {
      localVue,
      store,
      global: {
        stubs: {
          FontAwesomeIcon: {
            template: "<span />",
          },
        },
      },
      propsData: {
        currentPath: routeStepOrder[1].path,
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
    expect(pageStateService.setPageComplete).toHaveBeenCalledWith(
      routeStepOrder[0].path
    );
  });

  it("calls pageStateService.setPagesetPageIncomplete when passed path", async () => {
    await wrapper.vm.onClickLink(routeStepOrder[0].path);
    await wrapper.vm.$nextTick();
    expect(pageStateService.setPageIncomplete).toHaveBeenCalledWith(
      routeStepOrder[1].path
    );
  });

  it("calls scrollTo when passed path", async () => {
    await wrapper.vm.onClickLink(routeStepOrder[0].path);
    await wrapper.vm.$nextTick();
    expect(spyOnScrollTo).toHaveBeenCalledWith(0);
  });

  it("calls router when passed path", async () => {
    await wrapper.vm.onClickLink(routeStepOrder[0].path);
    await wrapper.vm.$nextTick();
    expect(spyOnRouter).toHaveBeenCalledWith(routeStepOrder[0].path);
  });

  it("does not call pageStateService.setPageComplete when passed wrong path", async () => {
    await wrapper.vm.onClickLink("/thisroutedoesnotexist");
    await wrapper.vm.$nextTick();
    expect(pageStateService.setPageComplete).not.toHaveBeenCalled();
  });

  it("does not call pageStateService.setPageIncomplete when passed wrong path", async () => {
    await wrapper.vm.onClickLink("/thisroutedoesnotexist");
    await wrapper.vm.$nextTick();
    expect(pageStateService.setPageIncomplete).not.toHaveBeenCalled();
  });

  it("does not call scrollTo() when passed wrong path", async () => {
    await wrapper.vm.onClickLink("/thisroutedoesnotexist");
    await wrapper.vm.$nextTick();
    expect(spyOnScrollTo).not.toHaveBeenCalled();
  });

  it("does not call router when passed wrong path", async () => {
    await wrapper.vm.onClickLink("/thisroutedoesnotexist");
    await wrapper.vm.$nextTick();
    expect(spyOnRouter).not.toHaveBeenCalled();
  });
});
