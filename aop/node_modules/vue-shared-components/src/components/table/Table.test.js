import { mount } from "@vue/test-utils";
import Table from "./Table.vue";
import { getTableElementsTestData } from "../../modules/tableTestData";

describe("Table component", () => {
  test("matches the default snapshot", () => {
    const wrapper = mount(Table, {
      propsData: {
        heading: "Table heading",
        elements: getTableElementsTestData()
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the empty elements snapshot", () => {
    const wrapper = mount(Table, {
      propsData: {
        heading: "Table heading"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the blue-striped snapshot", () => {
    const wrapper = mount(Table, {
      propsData: {
        heading: "Table heading",
        elements: getTableElementsTestData(),
        styling: "bcgov-blue-stripe"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
