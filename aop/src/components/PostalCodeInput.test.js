import { mount } from "@vue/test-utils";
import { render, fireEvent } from "@testing-library/vue";
import PostalCodeInput from "./PostalCodeInput.vue";

describe("PostalCodeInput component", () => {
  test("matches the primary snapshot", () => {
    const wrapper = mount(PostalCodeInput, {
      propsData: {
        value: "V1V 1V1"
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the edited snapshot", () => {
    const wrapper = mount(PostalCodeInput, {
      propsData: {
        value: "V1V 1V1"
      }
    });
    fireEvent.input(wrapper.element.querySelector(".form-control"), {
      value: "V0V 0V0"
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
