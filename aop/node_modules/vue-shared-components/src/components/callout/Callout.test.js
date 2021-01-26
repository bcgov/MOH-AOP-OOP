import { mount } from "@vue/test-utils";
import Callout from "./Callout.vue";

describe("Callout component", () => {
  test("with text matches the snapshot", () => {
    const wrapper = mount(Callout, {
      propsData: {
        text: "Callout text"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("with checkbox matches the snapshot", () => {
    const wrapper = mount(Callout, {
      propsData: {
        text: "Callout text",
        checkboxLabel: "I agree"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
