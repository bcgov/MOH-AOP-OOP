import { mount } from "@vue/test-utils";
import Component from "@/views/MaintenancePage.vue";

describe("MaintenancePage.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});
