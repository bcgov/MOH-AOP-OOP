import { mount } from "@vue/test-utils";
import Textarea from "./Textarea.vue";

describe("Textarea component", () => {
  test("without label matches the snapshot", () => {
    const wrapper = mount(Textarea, {
      propsData: {
        id: "1"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("with label matches the snapshot", () => {
    const wrapper = mount(Textarea, {
      propsData: {
        id: "1",
        label: "Textarea label"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("when is required matches the snapshot", () => {
    const wrapper = mount(Textarea, {
      propsData: {
        id: "1",
        label: "Textarea label",
        isRequired: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
