import { shallowMount } from "@vue/test-utils";
import LogIn from "../../src/views/LogIn.vue";
import { createStore } from "vuex";
// import router from "../../src/router/index";
import store from "../../src/store/index";

const testStore = createStore({
  ...store,
});

const mockRoute = {
  params: {
    id: 1
  }
}
const mockRouter = {
  push: jest.fn()
}

describe("LogIn.vue", () => {
  // This is a Shallow Mount as opposed to a regular mount because this test only checks for rendering
  it("renders", () => {
    const wrapper = shallowMount(LogIn, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter
        },
        plugins: [testStore],
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});
