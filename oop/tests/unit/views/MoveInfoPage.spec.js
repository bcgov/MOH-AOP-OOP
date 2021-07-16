import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
// import VueRouter from "vue-router";
import Component from "@/views/HomePage.vue";
// import spaEnvService from "@/services/spa-env-service";
import pageStateService from "@/services/page-state-service";
import formTemplate from "@/store/modules/form";

const localVue = createLocalVue();
localVue.use(Vuex);
// Vue.use(Vuelidate);

// const scrollHelper = require("@/helpers/scroll");

jest
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));
jest
  .spyOn(pageStateService, "visitPage")
  .mockImplementation(() => Promise.resolve("visited"));

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
}));

// const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");

describe("MoveInfoPage.vue", () => {
  const mutations = formTemplate.mutations;
  const actions = formTemplate.actions;
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
          mutations,
          actions,
          state,
          namespaced: true,
        },
      },
    });
  });

  it("renderss", () => {
    const wrapper = shallowMount(Component, {
      localVue,
      store
    });
    expect(wrapper.element).toBeDefined();
  });
});
