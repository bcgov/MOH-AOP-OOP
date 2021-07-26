import { shallowMount, mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import Component from "@/components/TipBox.vue";
// import RouteProps from "@/router/step-routes"

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

describe("ProgressBar.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component)
    expect(wrapper.element).toBeDefined();
  });
});

