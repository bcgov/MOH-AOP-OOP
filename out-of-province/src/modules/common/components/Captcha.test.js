import { mount } from "@vue/test-utils";
import { render, fireEvent } from "@testing-library/vue";
import { jest } from '@jest/globals';
import Captcha from "./Captcha.vue";

jest.useFakeTimers();

describe("Captcha component", () => {
  test("matches the primary snapshot", () => {
    window.grecaptcha = {
      render: () => {}
    };
    const wrapper = mount(Captcha);
    wrapper.vm.setConfirmation();
    jest.advanceTimersByTime(1500);
    expect(wrapper.html()).toMatchSnapshot();
  });
});