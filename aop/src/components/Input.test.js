import { mount } from "@vue/test-utils";
import { render, fireEvent } from "@testing-library/vue";
import Input from "./Input.vue";

describe("Input component", () => {
  test("matches the primary snapshot", () => {
    const wrapper = mount(Input, {
      propsData: {
        value: "test"
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the edited snapshot", () => {
    const wrapper = mount(Input, {
      propsData: {
        value: "test"
      }
    });
    fireEvent.input(wrapper.element.querySelector(".form-control"));
    expect(wrapper.html()).toMatchSnapshot();
  });
});
