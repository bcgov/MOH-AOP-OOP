import { mount } from "@vue/test-utils";
import Footer from "./Footer.vue";

describe("Footer component", () => {
  const wrapper = mount(Footer);

  test("matches the snapshot", () => {
    expect(wrapper.html()).toMatchSnapshot();
  });
});
