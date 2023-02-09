import { mount } from "@vue/test-utils";
import Sending from "../../src/views/Sending.vue";
import { createStore } from "vuex";
import router from "../../src/router/index";
import store from "../../src/store/index";

const testStore = createStore({
  ...store,
  mutations: {
    setUUID() {
      jest.fn()
    },
  }
});

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
  scrollToError: jest.fn(),
}));

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
  scrollToError: jest.fn(),
}));

describe("Sending.vue", () => {
  // This is a Shallow Mount as opposed to a regular mount because this test only checks for rendering
  it("renders", () => {
    const wrapper = mount(Sending, {
      global: {
        plugins: [router, testStore],
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});
