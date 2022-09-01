import { mount } from "@vue/test-utils";
import Component from "@/components/StateInput.vue";

describe("StateInput.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
      },
    });
    expect(wrapper.element).toBeDefined();
  });

  it("emits input correctly through built in method", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
      },
    });
    console.log("kumquat", wrapper.emitted())
    wrapper.vm.onChange("PlaceholderRegion");
    console.log("kumquat2", wrapper.emitted())
    expect(wrapper.emitted()).toBeTruthy();
    expect(wrapper.emitted()).toEqual({'update:modelValue': [ [ 'PlaceholderRegion' ] ]});
  });
});
