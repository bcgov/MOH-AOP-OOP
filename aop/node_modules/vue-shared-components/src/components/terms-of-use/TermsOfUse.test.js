import { mount } from "@vue/test-utils";
import TermsOfUse from "./TermsOfUse.vue";
import TermsOfUseTestData from "../../modules/TermsOfUseTestData.vue";
import { render, fireEvent, getByText } from "@testing-library/vue";

describe("TermsOfUse component", () => {
  window.print = jest.fn();

  test("matches the snapshot", () => {
    const wrapper = mount(TermsOfUse, {
      propsData: {
        content: TermsOfUseTestData,
        confirmText: "I accept these terms and conditions",
        heading: "Terms of Use"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("print terms of use (click)", () => {
    const { container } = render(TermsOfUse, {
      props: {
        content: TermsOfUseTestData,
        confirmText: "I accept these terms and conditions",
        heading: "Terms of Use"
      }
    });

    fireEvent.click(getByText(container, "Print"));

    expect(window.print).toHaveBeenCalled();
  });
});
