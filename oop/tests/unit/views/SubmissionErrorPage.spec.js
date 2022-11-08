import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import { routeCollection } from "@/router/index";
import { cloneDeep } from "lodash";
import * as formTemplate from "@/store/modules/form";
import Component from "@/views/SubmissionErrorPage.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import logService from "@/services/log-service";

const spyOnLogNavigation = jest
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
  scrollToError: jest.fn(),
}));

const router = createRouter({
  history: createWebHistory(),
  routes: routeCollection,
});

describe("SubmissionErrorPage.vue", () => {
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
    expect(wrapper.element).toBeDefined();
  });

  it("calls logService on load", () => {
    expect(spyOnLogNavigation).toHaveBeenCalled();
  });
});
