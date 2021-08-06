import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import { cloneDeep } from "lodash";
import * as formTemplate from "@/store/modules/form";
import Component from "@/views/SubmissionPage.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import logService from "@/services/log-service";
import pageStateService from "@/services/page-state-service";

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
