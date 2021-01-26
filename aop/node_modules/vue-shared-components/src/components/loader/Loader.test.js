import { mount } from "@vue/test-utils";
import Loader from "./Loader.vue";

describe("Loader component", () => {
  test("button version matches the snapshot", () => {
    const wrapper = mount(Loader);

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("page version matches the snapshot", () => {
    const wrapper = mount(Loader, {
      propsData: {
        page: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
