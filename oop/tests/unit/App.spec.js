import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import Component from "@/App.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
Vue.use(Vuelidate);
const router = new VueRouter();

describe("App.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component, {
      localVue,
      router,
    });
    expect(wrapper.element).toBeDefined();
  });
});
