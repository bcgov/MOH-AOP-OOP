import { mount } from "@vue/test-utils";
import Button from "./Button.vue";

describe("Button component", () => {
  test("matches the primary snapshot", () => {
    const wrapper = mount(Button, {
      propsData: {
        label: "Button label",
        styling: "bcgov-normal-blue btn"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the secondary snapshot", () => {
    const wrapper = mount(Button, {
      propsData: {
        label: "Button label",
        styling: "bcgov-normal-white btn"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the disabled snapshot", () => {
    const wrapper = mount(Button, {
      propsData: {
        label: "Button label",
        styling: "bcgov-normal-blue btn",
        disabled: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the has loader snapshot", () => {
    const wrapper = mount(Button, {
      propsData: {
        label: "Button label",
        styling: "bcgov-normal-blue btn",
        disabled: true,
        hasLoader: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
