import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuelidate from "vuelidate";
import Component from "@/components/ConsentModal.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

describe("ConsentModal.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component, {
      localVue,
      mocks: {
        $store: {
          state: {
            form: {
              applicationUuid: "default1",
            },
          },
        },
      },
      data: () => {
        return {
          focusableEls: [],
          focusedEl: null,
          captchaAPIBasePath: "/oop/api/captcha",
          applicationUuid: null,
          isCaptchaValid: false,
          isTermsAccepted: false,
        };
      },
    });

    expect(wrapper.element).toBeDefined();
  });
});
