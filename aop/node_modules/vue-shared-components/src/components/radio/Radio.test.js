import { mount } from "@vue/test-utils";
import Radio from "./Radio.vue";

describe("Radio component", () => {
  test("matches the snapshot", () => {
    const wrapper = mount(Radio, {
      propsData: {
        label: "Yes",
        id: "yes",
        name: "yes"
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
