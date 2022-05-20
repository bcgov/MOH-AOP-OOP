import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueRouter from 'vue-router';
import LogIn from "../../src/views/LogIn";

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter;

describe("LogIn.vue", () => {
  it("renders", () => {
    const wrapper = shallowMount(LogIn, {
      localVue,
      router
    });
    expect(wrapper.text()).to.include("BC Services Card");
  });
});
