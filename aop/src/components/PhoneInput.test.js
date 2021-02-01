import { mount } from "@vue/test-utils";
import { render, fireEvent } from "@testing-library/vue";
import PhoneInput from "./PhoneInput.vue";

describe("PhoneInput component", () => {
  test("matches the primary snapshot", () => {
    const wrapper = mount(PhoneInput, {
      propsData: {
        value: "2506422000"
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the edited snapshot", () => {
    const wrapper = mount(PhoneInput, {
      propsData: {
        value: "2506422000"
      }
    });
    fireEvent.input(wrapper.element.querySelector(".form-control"), {
      value: "2506422000"
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
