import { mount } from "@vue/test-utils";
import { render, fireEvent } from "@testing-library/vue";
import ConsentModal from "./ConsentModal.vue";

describe("ConsentModal component", () => {
  test("matches the primary snapshot", () => {
    const wrapper = mount(ConsentModal, {
      propsData: {
        heading: "Test"
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the accepted state snapshot", () => {
    const wrapper = mount(ConsentModal, {
      propsData: {
        heading: "Test"
      }
    });
    fireEvent.click(wrapper.element.querySelector('input[type="checkbox"]'));
    wrapper.vm.confirmCaptcha();
    fireEvent.click(wrapper.element.querySelector(".bcgov-button"));
    expect(wrapper.html()).toMatchSnapshot();
  });
});
