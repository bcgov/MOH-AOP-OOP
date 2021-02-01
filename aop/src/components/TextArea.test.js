import { mount } from "@vue/test-utils";
import { render, fireEvent } from "@testing-library/vue";
import TextArea from "./TextArea.vue";

describe("TextArea component", () => {
  test("matches the primary snapshot", () => {
    const wrapper = mount(TextArea, {
      propsData: {
        value: "test"
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the edited snapshot", () => {
    const wrapper = mount(TextArea, {
      propsData: {
        value: "test"
      }
    });
    fireEvent.input(wrapper.element.querySelector(".form-control"));
    expect(wrapper.html()).toMatchSnapshot();
  });
});
