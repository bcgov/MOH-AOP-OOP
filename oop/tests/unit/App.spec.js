import { shallowMount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routeCollection } from "@/router/index";
import Component from "@/App.vue";
import { createStore } from "vuex";
import * as formTemplate from "@/store/modules/form";
import { cloneDeep } from "lodash";

const router = createRouter({
  history: createWebHistory(),
  routes: routeCollection,
});

let tempForm = cloneDeep(formTemplate.default);
let store = createStore({
  modules: {
    form: tempForm,
  },
});

describe("App.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
      data: () => {
        return {
          focusableEls: [],
          focusedEl: null,
          captchaAPIBasePath: "/oop/api/captcha",
          applicationUuid: "111",
          isCaptchaValid: false,
          isTermsAccepted: false,
        };
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});
