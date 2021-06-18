import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuelidate from "vuelidate";
import Component from "@/components/CountryInput.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

describe("CountryInput.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });

  it("emits input correctly through built in method", async () => {
    const wrapper = mount(Component, {
      localVue,
    });
    await wrapper.setData({
      country: "PlaceholderCountry",
    });
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([["PlaceholderCountry"]]);
  });
});
