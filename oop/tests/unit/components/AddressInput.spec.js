import { mount } from "@vue/test-utils";
import Component from "@/components/AddressInput.vue";

describe("AddressInput.vue", () => {
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
    const fakeEvent = { target: { value: "potato" } };
    wrapper.vm.inputHandler(fakeEvent);
    // wrapper.vm.$emit('foo');
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([["potato"]]);
  });
});
