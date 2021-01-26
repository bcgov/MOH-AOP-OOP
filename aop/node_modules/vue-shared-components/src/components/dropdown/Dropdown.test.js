import { mount } from "@vue/test-utils";
import Dropdown from "./Dropdown.vue";

describe("Dropdown component", () => {
  test("matches the snapshot", () => {
    const wrapper = mount(Dropdown, {
      propsData: {
        label: "Yes",
        items: ["Item 1", "Item 2", "Item 3"]
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
