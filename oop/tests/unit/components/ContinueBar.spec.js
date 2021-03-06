import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuelidate from "vuelidate";
import Component from "@/components/ContinueBar.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

describe("ContinueBar.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });

  it("emits continue event correctly through built in method", () => {
    const wrapper = mount(Component, {
      localVue,
    });
    wrapper.vm.onContinue();
    expect(wrapper.emitted().continue).toBeTruthy();
  });

  it("runs continue method on button click", async () => {
    const wrapper = mount(Component, {
      localVue,
    });
    const spyOnContinue = jest.spyOn(wrapper.vm, "onContinue");
    await wrapper.find("button").trigger("click");
    expect(spyOnContinue).toHaveBeenCalled();
  });
});
