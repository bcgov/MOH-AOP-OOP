import { shallowMount } from "@vue/test-utils";
import AssignmentOfPayment from "../../src/views/AssignmentOfPayment.vue";
import { createStore } from "vuex";
import router from "../../src/router/index";
import store from "../../src/store/index";
import TimeoutModal from "../../src/components/TimeoutModal";
import SignOutModal from "../../src/components/SignOutModal";

const testStore = createStore({
  ...store,
});

describe("AssignmentOfPayment.vue", () => {
  // This is a Shallow Mount as opposed to a regular mount because this test only checks for rendering
  it("renders", () => {
    const wrapper = shallowMount(AssignmentOfPayment, {
      global: {
        plugins: [router, testStore],
      },
      components: {
        TimeoutModal,
        SignOutModal,
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});
