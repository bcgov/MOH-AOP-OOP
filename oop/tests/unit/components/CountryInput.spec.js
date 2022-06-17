import { mount } from "@vue/test-utils";
import Component from "@/components/CountryInput.vue";

describe("CountryInput.vue", () => {
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
    await wrapper.setData({
      country: "PlaceholderCountry",
    });
    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([["PlaceholderCountry"]]);
  });
});
