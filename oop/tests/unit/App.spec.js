import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import { routeCollection } from "@/router/index";
import Component from "@/App.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: routeCollection,
});

describe("App.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});
