import { mount } from "@vue/test-utils";
import Sending from "../../src/views/Sending.vue";
import { createStore } from "vuex";
import router from "../../src/router/index";
import store from "../../src/store/index";
import axios from "axios";

const testStore = createStore({
  ...store,
  mutations: {
    setUUID() {
      vi.fn();
    },
  },
});

vi.mock("axios");
axios.post = vi.fn().mockResolvedValue("");

vi.mock("@/helpers/scroll", () => ({
  scrollTo: vi.fn(),
  scrollToError: vi.fn(),
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
