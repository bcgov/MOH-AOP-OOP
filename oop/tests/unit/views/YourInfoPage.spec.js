import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuelidate from "vuelidate";
import YourInfoPage from "@/views/YourInfoPage.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

describe("YourInfoPage.vue", () => {
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
          state,
          namespaced: true,
        },
      },
    });
  });

  it("renders", () => {
    const wrapper = shallowMount(YourInfoPage, {
      store,
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe("YourInfoPage.vue nameValidator()", () => {
  it("validates name", async () => {
    const store = new Vuex.Store({
      modules: {
        form: {
          state: {
            lastName: "data",
            phn: null,
            phone: null,
          },
          namespaced: true,
        },
      },
    });
    const wrapper = shallowMount(YourInfoPage, {
      store,
      localVue,
    });

    wrapper.vm.$v.$touch();

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.lastName.$error).toEqual(true);
  });
});
