import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
// import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import pageStateService from "@/services/page-state-service";
import { cloneDeep } from "lodash";
// import * as stepRoutes from "@/router/step-routes";
// import { routeStepOrder } from "@/router/routes";
import * as formTemplate from "@/store/modules/form";
import * as appTemplate from "@/store/modules/app";
import Component from "@/views/ReviewPage.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
Vue.use(Vuelidate);
// Vue.component("font-awesome-icon", FontAwesomeIcon);
const router = new VueRouter();


describe("ReviewPage.vue", () => {
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
