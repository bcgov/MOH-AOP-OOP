import { mount } from "@vue/test-utils";
import Component from "@/components/TextArea.vue";

describe("TextArea.vue", () => {
  //This is a Shallow Mount as opposed to a regular mount because this test only checks for rendering
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
    wrapper.vm.emitInput(fakeEvent);
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([["potato"]]);
  });
});
