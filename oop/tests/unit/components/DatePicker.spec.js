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
      getFullYear: () => {return "placeholderYear"},
      getMonth: () => {return "placeholderMonth"},
      getDate: () => {return "placeholderDay"},
    };
    wrapper.vm.setDateValue(value);
    expect(wrapper.vm.year).toEqual("placeholderYear");
    expect(wrapper.vm.month).toEqual("placeholderMonth");
    expect(wrapper.vm.day).toEqual("placeholderDay");
  });
});
