import { mount } from "@vue/test-utils";
import Component from "@/components/ProvinceInput.vue";

describe("ProvinceInput.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
      },
    });
    expect(wrapper.element).toBeDefined();
  });

  it("emits input correctly through built in method", () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
      },
    });
    const fakeEvent = "potato";
    wrapper.vm.inputHandler(fakeEvent);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([["potato"]]);
  });
});
