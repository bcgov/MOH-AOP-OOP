import { mount } from "@vue/test-utils";
import Component from "@/components/ContinueBar.vue";

describe("ContinueBar.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
      },
    });
    expect(wrapper.element).toBeDefined();
  });

  it("emits continue event correctly through built in method", () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
      },
    });
    wrapper.vm.onContinue();
    expect(wrapper.emitted().continue).toBeTruthy();
  });

  it("runs continue method on button click", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
      },
    });
    const spyOnContinue = jest.spyOn(wrapper.vm, "onContinue");
    await wrapper.find("button").trigger("click");
    expect(spyOnContinue).toHaveBeenCalled();
  });
});
