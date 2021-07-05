import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuelidate from "vuelidate";
import Component from "@/components/DatePicker.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCalendarAlt);

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);
Vue.component("font-awesome-icon", FontAwesomeIcon);

describe("DatePicker.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe("DatePicker.vue setDateValue()", () => {
  it("does not change data when function is called with a falsy value", async () => {
    const wrapper = mount(Component, {
      localVue,
      data() {
        return {
          year: "default",
          month: "default",
          day: "default",
          dateToday: "default2",
        };
      },
    });

    await wrapper.setData({
      year: "default",
      month: "default",
      day: "default",
      dateToday: "default2",
    });
    await wrapper.vm.$nextTick();

    const value = null;
    wrapper.vm.setDateValue(value);
    expect(wrapper.vm.year).toEqual("default");
    expect(wrapper.vm.month).toEqual("default");
    expect(wrapper.vm.day).toEqual("default");
  });

  it("updates data when function is called with a truthy value", async () => {
    const wrapper = mount(Component, {
      localVue,
      data() {
        return {
          year: "default",
          month: "default",
          day: "default",
          dateToday: "default2",
        };
      },
    });

    await wrapper.setData({
      year: "default",
      month: "default",
      day: "default",
      dateToday: "default2",
    });
    await wrapper.vm.$nextTick();

    const value = {
      getFullYear: () => {
        return "placeholderYear";
      },
      getMonth: () => {
        return "placeholderMonth";
      },
      getDate: () => {
        return "placeholderDay";
      },
    };
    wrapper.vm.setDateValue(value);
    expect(wrapper.vm.year).toEqual("placeholderYear");
    expect(wrapper.vm.month).toEqual("placeholderMonth");
    expect(wrapper.vm.day).toEqual("placeholderDay");
  });
});

describe("DatePicker.vue handleDaySelect()", () => {
  it("emits input signal with argument on function call", async () => {
    const wrapper = mount(Component, {
      localVue,
      data() {
        return {
          year: "default",
          month: "default",
          day: "default",
          dateToday: "default",
        };
      },
    });

    const value = "date";
    wrapper.vm.handleDaySelect(value);

    expect(wrapper.emitted().input).toBeTruthy();
    expect(wrapper.emitted().input).toEqual([["date"]]);
  });

  it("emits dateSelected signal with argument on function call", async () => {
    const wrapper = mount(Component, {
      localVue,
      data() {
        return {
          year: "default",
          month: "default",
          day: "default",
          dateToday: "default",
        };
      },
    });

    const value = "date";
    wrapper.vm.handleDaySelect(value);

    expect(wrapper.emitted().dateSelected).toBeTruthy();
    expect(wrapper.emitted().dateSelected).toEqual([["date"]]);
  });
});

describe("DatePicker.vue nextMonth()", () => {
  it("increments month by one on function call", async () => {
    const wrapper = mount(Component, {
      localVue,
      data() {
        return {
          year: "default",
          month: "default",
          day: "default",
          dateToday: "default",
        };
      },
    });
    await wrapper.setData({
      month: 1,
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.nextMonth();

    expect(wrapper.vm.month).toEqual(2);
  });

  it("turns over properly when month is december on function call", async () => {
    const wrapper = mount(Component, {
      localVue,
      data() {
        return {
          year: "default",
          month: "default",
          day: "default",
          dateToday: "default",
        };
      },
    });
    await wrapper.setData({
      //Remember 0 is January, so 11 is December
      month: 11,
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.nextMonth();

    expect(wrapper.vm.month).toEqual(0);
  });
});

describe("DatePicker.vue previousMonth()", () => {
  it("decrements month by one on function call", async () => {
    const wrapper = mount(Component, {
      localVue,
      data() {
        return {
          year: "default",
          month: "default",
          day: "default",
          dateToday: "default",
        };
      },
    });
    await wrapper.setData({
      month: 1,
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.previousMonth();

    expect(wrapper.vm.month).toEqual(0);
  });

  it("turns over properly when month is january on function call", async () => {
    const wrapper = mount(Component, {
      localVue,
      data() {
        return {
          year: "default",
          month: "default",
          day: "default",
          dateToday: "default",
        };
      },
    });
    await wrapper.setData({
      //Remember 0 is January, so 11 is December
      month: 0,
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.previousMonth();

    expect(wrapper.vm.month).toEqual(11);
  });
});

describe("DatePicker.vue nextYear()", () => {
  it("increments year by one on function call", async () => {
    const wrapper = mount(Component, {
      localVue,
      data() {
        return {
          year: "default",
          month: "default",
          day: "default",
          dateToday: "default",
        };
      },
    });
    await wrapper.setData({
      year: 1990,
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.nextYear();

    expect(wrapper.vm.year).toEqual(1991);
  });
});

describe("DatePicker.vue previousYear()", () => {
  it("decrements year by one on function call", async () => {
    const wrapper = mount(Component, {
      localVue,
      data() {
        return {
          year: "default",
          month: "default",
          day: "default",
          dateToday: "default",
        };
      },
    });
    await wrapper.setData({
      year: 1990,
    });
    await wrapper.vm.$nextTick();
    wrapper.vm.previousYear();

    expect(wrapper.vm.year).toEqual(1989);
  });
});

describe("DatePicker.vue isSelectedDate()", () => {
  const fakeDate = new Date(1995, 11, 17);

  it("returns false if value is set to null", async () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        value: null,
      },
    });

    const date = fakeDate;
    const result = wrapper.vm.isSelectedDate(date);

    expect(result).toEqual(false);
  });

  it("returns false if date is set to null", async () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        value: fakeDate,
      },
    });

    const date = null;
    const result = wrapper.vm.isSelectedDate(date);

    expect(result).toEqual(false);
  });

  it("returns false if the years don't match", async () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        value: fakeDate,
      },
    });

    const date = new Date(1994, 11, 17);
    const result = wrapper.vm.isSelectedDate(date);

    expect(result).toEqual(false);
  });

  it("returns false if the months don't match", async () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        value: fakeDate,
      },
    });

    const date = new Date(1995, 10, 17);
    const result = wrapper.vm.isSelectedDate(date);

    expect(result).toEqual(false);
  });

  it("returns false if the days don't match", async () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        value: fakeDate,
      },
    });

    const date = new Date(1995, 11, 18);
    const result = wrapper.vm.isSelectedDate(date);

    expect(result).toEqual(false);
  });

  it("returns true if everything does match", async () => {
    const wrapper = mount(Component, {
      localVue,
      propsData: {
        value: fakeDate,
      },
    });

    const date = new Date(1995, 11, 17);
    const result = wrapper.vm.isSelectedDate(date);

    expect(result).toEqual(true);
  });
});

describe("DatePicker.vue isDateToday()", () => {
  const fakeDate = new Date(1995, 11, 17);

  it("returns false if date is set to null", async () => {
    const wrapper = mount(Component, {
      localVue,
      data() {
        return {
          dateToday: fakeDate,
        };
      },
    });

    const date = null;
    const result = wrapper.vm.isDateToday(date);

    expect(result).toEqual(false);
  });

  it("returns false if the years don't match", async () => {
    const wrapper = mount(Component, {
      localVue,
      data() {
        return {
          dateToday: fakeDate,
        };
      },
    });

    await wrapper.setData({ dateToday: fakeDate });

    const date = new Date(1994, 11, 17);
    const result = wrapper.vm.isDateToday(date);

    expect(result).toEqual(false);
  });

  it("returns false if the months don't match", async () => {
    const wrapper = mount(Component, {
      localVue,
      data() {
        return {
          dateToday: fakeDate,
        };
      },
    });

    await wrapper.setData({ dateToday: fakeDate });

    const date = new Date(1995, 10, 17);
    const result = wrapper.vm.isDateToday(date);

    expect(result).toEqual(false);
  });

  it("returns false if the days don't match", async () => {
    const wrapper = mount(Component, {
      localVue,
      data() {
        return {
          dateToday: fakeDate,
        };
      },
    });

    await wrapper.setData({ dateToday: fakeDate });

    const date = new Date(1995, 11, 18);
    const result = wrapper.vm.isDateToday(date);

    expect(result).toEqual(false);
  });

  it("returns true if everything does match", async () => {
    const wrapper = mount(Component, {
      localVue,
      data() {
        return {
          dateToday: fakeDate,
        };
      },
    });

    await wrapper.setData({ dateToday: fakeDate });

    const date = new Date(1995, 11, 17);
    const result = wrapper.vm.isDateToday(date);

    expect(fakeDate).toEqual(date);
    expect(result).toEqual(true);
  });
});
