import { mount } from "@vue/test-utils";
import { render, fireEvent } from "@testing-library/vue";
import DateInput, {
  distantFutureValidator,
  distantPastValidator,
  beforeDateValidator,
  afterDateValidator
} from "./DateInput.vue";

describe("DateInput component", () => {
  test("matches the primary snapshot", () => {
    const wrapper = mount(DateInput, {
      propsData: {
        value: new Date("2020-01-01")
      }
    });
    expect(wrapper.html()).toMatchSnapshot();
  });

  test("matches a filled in snapshot", () => {
    const { container, html } = render(DateInput, {
      propsData: {
        value: new Date("2020-01-01")
      }
    });
    container.querySelector(".monthSelect").selectedIndex = 2;
    fireEvent.blur(container.querySelector(".monthSelect"));
    container.querySelector(".dayInput").value = "1";
    fireEvent.blur(container.querySelector(".dayInput"));
    container.querySelector(".yearInput").value = "2020";
    fireEvent.blur(container.querySelector(".yearInput"));

    expect(html()).toMatchSnapshot();
  });

  test("matches an invalid date snapshot", () => {
    const wrapper = mount(DateInput, {
      propsData: {
        value: new Date("2020-01-01")
      }
    });
    wrapper.element.querySelector(".monthSelect").selectedIndex = 0;
    fireEvent.blur(wrapper.element.querySelector(".monthSelect"));
    wrapper.element.querySelector(".dayInput").value = "";
    fireEvent.blur(wrapper.element.querySelector(".dayInput"));
    wrapper.element.querySelector(".yearInput").value = "";
    fireEvent.blur(wrapper.element.querySelector(".yearInput"));

    expect(wrapper.html()).toMatchSnapshot();
  });

  test("passes distantFutureValidator.", () => {
    const date = new Date("2020-01-01");
    expect(distantFutureValidator(date)).toBeTruthy();
  });

  test("passes distantPastValidator.", () => {
    const date = new Date("2020-01-01");
    expect(distantPastValidator(date)).toBeTruthy();
  });

  test("passes beforeDateValidator.", () => {
    const date = new Date("2020-01-01");
    const callback = beforeDateValidator("endDate");
    expect(
      callback(date, {
        endDate: new Date("2020-02-02")
      })
    ).toBeTruthy();
  });

  test("passes afterDateValidator.", () => {
    const date = new Date("2020-03-03");
    const callback = afterDateValidator("endDate");
    expect(
      callback(date, {
        endDate: new Date("2020-02-02")
      })
    ).toBeTruthy();
  });
});
