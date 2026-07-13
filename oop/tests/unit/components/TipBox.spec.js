import { shallowMount } from "@vue/test-utils";
import Page from "@/components/TipBox.vue";

describe("TipBox.vue", () => {
  //This is a Shallow Mount as opposed to a regular mount because this test only checks for rendering
  it("renders", () => {
    const wrapper = shallowMount(Page, {
      global: {
        plugins: [],
        stubs: {
          FontAwesomeIcon: { template: "<div>Stubbed Global Component</div>" },
        },
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});
