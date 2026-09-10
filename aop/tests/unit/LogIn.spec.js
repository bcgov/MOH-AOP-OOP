import { shallowMount } from "@vue/test-utils";
import LogIn from "../../src/views/LogIn.vue";
import { createStore } from "vuex";
import store from "../../src/store/index";
import axios from "axios";

const testStore = createStore({
  ...store,
  mutations: {
    setLoading() {
      vi.fn();
    },
  },
});

vi.mock("axios");
axios.get = vi.fn().mockResolvedValue({ data: { url: "abcdefg" } });
axios.post = vi.fn().mockResolvedValue("");

const mockRoute = {
  params: {
    id: 1,
  },
};
const mockRouter = {
  push: vi.fn(),
};

describe("LogIn.vue", () => {
  // This is a Shallow Mount as opposed to a regular mount because this test only checks for rendering
  it("renders", () => {
    const wrapper = shallowMount(LogIn, {
      global: {
        mocks: {
          $route: mockRoute,
          $router: mockRouter,
        },
        plugins: [testStore],
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});
