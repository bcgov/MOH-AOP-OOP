import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuelidate from "vuelidate";
import Component from "@/components/ConsentModal.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

describe("ConsentModal.vue", () => {
  const wrapper = mount(Component, {
    localVue,
    mocks: {
      $store: {
        state: {
          form: {
            applicationUuid: "default1",
          },
        },
      },
    },
    data: () => {
      return {
        focusableEls: [],
        focusedEl: null,
        captchaAPIBasePath: "/oop/api/captcha",
        applicationUuid: null,
        isCaptchaValid: false,
        isTermsAccepted: false,
      };
    },
  });

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});

describe("ConsentModal.vue getFocusableEls()", () => {
  it("returns an array", () => {
    const wrapper = mount(Component, {
      localVue,
      mocks: {
        $store: {
          state: {
            form: {
              applicationUuid: "default1",
            },
          },
        },
      },
      data: () => {
        return {
          focusableEls: [],
          focusedEl: null,
          captchaAPIBasePath: "/oop/api/captcha",
          applicationUuid: null,
          isCaptchaValid: false,
          isTermsAccepted: false,
        };
      },
    });
    const result = wrapper.vm.getFocusableEls();
    //jest doesn't have a built in type checker as of June 2021.
    //if that ever changes, please refactor the following expect clause for clarity
    expect(Array.isArray(result)).toEqual(true);
  });

  it("has a length greater than zero", () => {
    const wrapper = mount(Component, {
      localVue,
      mocks: {
        $store: {
          state: {
            form: {
              applicationUuid: "default1",
            },
          },
        },
      },
      data: () => {
        return {
          focusableEls: [],
          focusedEl: null,
          captchaAPIBasePath: "/oop/api/captcha",
          applicationUuid: null,
          isCaptchaValid: false,
          isTermsAccepted: false,
        };
      },
    });
    const result = wrapper.vm.getFocusableEls();
    expect(result.length).toBeGreaterThan(0);
  });
});

describe("ConsentModal.vue handleCaptchaLoaded()", () => {
  it("assigns the results of getFocusableEls() to data", async () => {
    const wrapper = mount(Component, {
      localVue,
      mocks: {
        $store: {
          state: {
            form: {
              applicationUuid: "default1",
            },
          },
        },
      },
      data: () => {
        return {
          focusableEls: [],
          focusedEl: null,
          captchaAPIBasePath: "/oop/api/captcha",
          applicationUuid: null,
          isCaptchaValid: false,
          isTermsAccepted: false,
        };
      },
    });

    await wrapper.setData({ focusableEls: [] });
    expect(wrapper.vm.focusableEls).toEqual([]);
    jest
      .spyOn(wrapper.vm, "getFocusableEls")
      .mockReturnValue(["default1", "default2", "default3", "default4"]);
    wrapper.vm.handleCaptchaLoaded();
    expect(wrapper.vm.focusableEls).toEqual([
      "default1",
      "default2",
      "default3",
      "default4",
    ]);
  });
});
