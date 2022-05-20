import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from "vue-router";
import Vuex from "vuex";
import Page from "../../src/views/LogIn";
import storeTemplate from "@/store/index";

const localVue = createLocalVue();
localVue.use(VueRouter);
localVue.use(Vuex);
const router = new VueRouter();

describe("LogIn.vue", () => {
  let wrapper;
  let store;

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("renders", () => {
    store = new Vuex.Store({
      modules: {
        form: storeTemplate,
      },
      data: () => {
        return {
          showConsentModal: true,
        };
      },
    });
    const wrapper = shallowMount(Page, {
      localVue,
      store,
      router,
    });
    // expect(wrapper.text()).to.include("BC Services Card");
    expect(wrapper.element).toBeDefined();
  });
});
