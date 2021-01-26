import Alert from "./Alert.vue";
import CheckboxMarked from "mdi-vue/CheckboxMarked.vue";
import AlertCircle from "mdi-vue/AlertCircle.vue";
import CloseCircle from "mdi-vue/CloseCircle.vue";
import Information from "mdi-vue/Information.vue";
import { mount } from "@vue/test-utils";

describe("Alert component", () => {
  test("matches the success snapshot", () => {
    const wrapper = mount(Alert, {
      propsData: {
        styling: "bcgov-success-background",
        element: "This is a success message!",
        alertType: "success",
        icon: CheckboxMarked,
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the warning snapshot", () => {
    const wrapper = mount(Alert, {
      propsData: {
        styling: "bcgov-warning-background",
        element: "This is a warning message!",
        alertType: "warning",
        icon: AlertCircle,
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the error snapshot", () => {
    const wrapper = mount(Alert, {
      propsData: {
        styling: "bcgov-error-background",
        element: "This is an error message!",
        alertType: "error",
        icon: CloseCircle,
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the info snapshot", () => {
    const wrapper = mount(Alert, {
      propsData: {
        styling: "bcgov-info-background",
        element: "This is an info message!",
        alertType: "info",
        icon: Information,
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
