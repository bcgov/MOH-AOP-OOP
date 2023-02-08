import { shallowMount } from "@vue/test-utils";
import Review from "../../src/views/Review.vue";
import { createStore } from "vuex";
import router from "../../src/router/index";
import store from "../../src/store/index";

const testStore = createStore({
  ...store,
});

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
  scrollToError: jest.fn(),
}));

describe("Review.vue", () => {
  // This is a Shallow Mount as opposed to a regular mount because this test only checks for rendering
  it("renders", () => {
    const wrapper = shallowMount(Review, {
      global: {
        plugins: [router, testStore],
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});
