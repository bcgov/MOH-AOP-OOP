import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import { routeCollection } from "@/router/index";
import { cloneDeep } from "lodash";
import * as formTemplate from "@/store/modules/form";
import Component from "@/views/SubmissionErrorPage.vue";
import logService from "@/services/log-service";

const spyOnLogNavigation = vi
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));

vi.mock("@/helpers/scroll", () => ({
  scrollTo: vi.fn(),
  scrollToError: vi.fn(),
}));

const router = createRouter({
  history: createWebHistory("oop"),
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
        stubs: {
          FontAwesomeIcon: { template: "<div>Stubbed Global Component</div>" },
        },
      },
    });
  });

  afterEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });

  it("calls logService on load", () => {
    expect(spyOnLogNavigation).toHaveBeenCalled();
  });
});
