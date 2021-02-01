import { mount } from "@vue/test-utils";
import { render, fireEvent } from "@testing-library/vue";
import ProgressBar from "./ProgressBar.vue";
import environment from "../../../environments/environment";

describe("ProgressBar component", () => {
  beforeEach(() => {
    environment.bypassRouteGuards = true;
  });
  afterAll(() => {
    environment.bypassRouteGuards = false;
  });

  test("matches the primary snapshot", () => {
    const wrapper = mount(ProgressBar, {
      propsData: {
        currentPath: "/my-path",
        routes: [
          {
            title: "My Path",
            path: "/my-path"
          }
        ]
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the primary snapshot", () => {
    const wrapper = mount(ProgressBar, {
      propsData: {
        currentPath: "/my-path",
        routes: [
          {
            title: "My Path",
            path: "/my-path"
          }
        ]
      }
    });
    wrapper.vm.$router = {
      push: () => {}
    };
    fireEvent.click(wrapper.element.querySelector(".step-container a"));
    expect(wrapper.html()).toMatchSnapshot();
  });
});
