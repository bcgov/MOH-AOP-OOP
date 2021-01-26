import { mount } from "@vue/test-utils";
import Sidecard from "./Sidecard.vue";

describe("Sidecard component", () => {
  test("matches the grey card snapshot", () => {
    const wrapper = mount(Sidecard, {
      propsData: {
        heading: "header",
        content: "content",
        type: "grey",
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the blue card snapshot", () => {
    const wrapper = mount(Sidecard, {
      propsData: {
        heading: "header",
        content: "content",
        type: "blue",
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the bluegrey card snapshot", () => {
    const wrapper = mount(Sidecard, {
      propsData: {
        heading: "header",
        content: "content",
        type: "bluegrey",
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the blue card with an image snapshot", () => {
    const wrapper = mount(Sidecard, {
      propsData: {
        heading: "header",
        content: "content",
        type: "blue",
        image: "image",
        imageLink: "imageLink",
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the isWide snapshot", () => {
    const wrapper = mount(Sidecard, {
      propsData: {
        heading: "header",
        content: "content",
        type: "grey",
        isWide: true
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches the long heading snapshot", () => {
    const wrapper = mount(Sidecard, {
      propsData: {
        heading: "heading is quite long so we can use custom styling to see it render",
        content: "content",
        type: "grey",
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
