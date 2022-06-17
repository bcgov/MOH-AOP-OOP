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
    wrapper.vm.inputHandler("PlaceholderRegion");
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([["PlaceholderRegion"]]);
  });
});
