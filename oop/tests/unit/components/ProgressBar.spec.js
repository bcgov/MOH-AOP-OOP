import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import Component from "@/components/ProgressBar.vue";
import pageStateService from "@/services/page-state-service";
import { cloneDeep } from "lodash";
import * as stepRoutes from "@/router/step-routes";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

// const scrollHelper = require("@/helpers/scroll");
// const addressHelper = require("@/helpers/address");
// const stringHelper = require("@/helpers/string");

jest
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));
jest
  .spyOn(pageStateService, "visitPage")
  .mockImplementation(() => Promise.resolve("visited"));

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
  scrollToError: jest.fn(),
}));

// const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");
// const spyOnScrollToError = jest.spyOn(scrollHelper, "scrollToError");

describe("ProgressBar.vue", () => {
  it("renders", async () => {
    const $route = {
      path: "/",
    };
    const $router = new VueRouter({
      $route,
    });

    const wrapper = mount(Component, {
      localVue,
      propsData: {
        routes: stepRoutes.default,
      },
      mocks: {
        $router,
      },
    });
    expect(wrapper.element).toBeDefined();
  });

  it.skip("redirects", () => {
    const wrapper = mount(Component);

    wrapper.vm.onClickLink("/");

    expect(wrapper.element).toBeDefined();
  });
});
