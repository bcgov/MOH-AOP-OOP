import { mount } from "@vue/test-utils";
import Input from "./Input.vue";

describe("Input component", () => {
  test("when mandatory and with label matches the snapshot (editable white)", () => {
    const wrapper = mount(Input, {
      propsData: {
        styling: "bcgov-editable-white",
        id: "textInputId",
        isRequired: true,
        placeholder: "Enter id",
        label: "Submission ID"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("when not mandatory and with label matches the snapshot (editable white)", () => {
    const wrapper = mount(Input, {
      propsData: {
        styling: "bcgov-editable-white",
        id: "textInputId",
        isRequired: false,
        placeholder: "Enter id",
        label: "Submission ID"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("when mandatory and no label matches the snapshot (editable white)", () => {
    const wrapper = mount(Input, {
      propsData: {
        styling: "bcgov-editable-white",
        id: "textInputId",
        isRequired: true,
        placeholder: "Enter id",
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("when not mandatory and no label matches the snapshot (editable white)", () => {
    const wrapper = mount(Input, {
      propsData: {
        styling: "bcgov-editable-white",
        id: "textInputId",
        isRequired: false,
        placeholder: "Enter id",
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the snapshot (non-editable-grey)", () => {
    const wrapper = mount(Input, {
      propsData: {
        styling: "bcgov-non-editable-grey",
        id: "textInputId",
        isRequired: false,
        placeholder: "Enter id",
        isReadOnly: true,
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
