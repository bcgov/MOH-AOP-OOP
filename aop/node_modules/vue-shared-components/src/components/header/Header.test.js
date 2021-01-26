import { createMemoryHistory } from "history";
import { mount } from "@vue/test-utils";
import Header from "./Header.vue";
import { render, fireEvent, getAllByAltText } from "@testing-library/vue";

describe("Header component", () => {
  const history = createMemoryHistory();

  test("matches the snapshot", () => {
    const wrapper = mount(Header, {
      propsData: {
        name: "File Submission",
        history
      }
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("clicking HeadingImage takes you back to home", () => {
    const { container } = render(Header, {
      propsData: {
        name: "File Submission",
        history
      }
    });

    history.replace("/somepageroute");
    fireEvent.click(getAllByAltText(container, "B.C. Government Logo")[0]);

    expect(history.location.pathname).toEqual("/");
  });
});
