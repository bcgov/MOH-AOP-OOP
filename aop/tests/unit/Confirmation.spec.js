import { shallowMount } from "@vue/test-utils";
import ConfirmationPage from "../../src/views/ConfirmationPage.vue";
import { createStore } from "vuex";
import router from "../../src/router/index";
import store from "../../src/store/index";

const testStore = createStore({
  ...store,
});

vi.mock("@/helpers/scroll", () => ({
  scrollTo: vi.fn(),
  scrollToError: vi.fn(),
}));

describe("Confirmation.vue", () => {
  // This is a Shallow Mount as opposed to a regular mount because this test only checks for rendering
  it("renders", () => {
    const wrapper = shallowMount(ConfirmationPage, {
      global: {
        plugins: [router, testStore],
        stubs: {
          FontAwesomeIcon: { template: "<div>Stubbed Global Component</div>" },
        },
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});
