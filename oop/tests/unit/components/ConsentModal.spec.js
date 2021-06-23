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

describe("ConsentModal.vue handleCaptchaVerified()", () => {
  it("changes captchaValid to true on function call", async () => {
    const store = new Vuex.Store({
      modules: {
        form: {
          namespaced: true,
          state: {
            applicationUuid: null,
          },
          actions: {
            setCaptchaToken: jest.fn(),
          },
        },
      },
    });

    const wrapper = mount(Component, {
      localVue,
      store,

      data: () => {
        return {
          focusableEls: [],
          focusedEl: null,
          captchaAPIBasePath: "/oop/api/captcha",
          applicationUuid: null,
          isCaptchaValid: "default",
          isTermsAccepted: false,
        };
      },
    });

    wrapper.vm.handleCaptchaVerified("token");

    expect(wrapper.vm.isCaptchaValid).toEqual(true);
  });

  it("dispatches SET_CAPTCHA_TOKEN action in VueX store on function call", async () => {
    const actions = {
      setCaptchaToken: jest.fn(),
    };

    const store = new Vuex.Store({
      modules: {
        form: {
          namespaced: true,
          state: {
            applicationUuid: null,
          },
          actions,
        },
      },
    });

    const wrapper = mount(Component, {
      localVue,
      store,

      data: () => {
        return {
          focusableEls: [],
          focusedEl: null,
          captchaAPIBasePath: "/oop/api/captcha",
          applicationUuid: null,
          isCaptchaValid: "default",
          isTermsAccepted: false,
        };
      },
    });

    wrapper.vm.handleCaptchaVerified("token");

    expect(actions.setCaptchaToken).toHaveBeenCalled();
  });

  it("updates focusable elements on function call", async () => {
    const actions = {
      setCaptchaToken: jest.fn(),
    };

    const store = new Vuex.Store({
      modules: {
        form: {
          namespaced: true,
          state: {
            applicationUuid: null,
          },
          actions,
        },
      },
    });

    const wrapper = mount(Component, {
      localVue,
      store,

      data: () => {
        return {
          focusableEls: "default",
          focusedEl: null,
          captchaAPIBasePath: "/oop/api/captcha",
          applicationUuid: null,
          isCaptchaValid: "default",
          isTermsAccepted: false,
        };
      },
    });

    wrapper.vm.handleCaptchaVerified("token");

    expect(wrapper.vm.focusableEls).not.toEqual("default");
  });
});

describe("ConsentModal.vue closeModal()", () => {
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

  it("emits close signal on function call", () => {
    wrapper.vm.closeModal();
    expect(wrapper.emitted().close).toBeTruthy();
  });
});

describe("ConsentModal.vue handleKeyDown()", () => {
  const fakeEvent = {
    target: { value: "potato" },
    key: "Tab",
    preventDefault: jest.fn(),
  };

  const fakeShiftEvent = {
    target: { value: "potato" },
    key: "Tab",
    shiftKey: true,
    preventDefault: jest.fn(),
  };

  const miscEvent = {
    target: { value: "potato" },
    key: "notTab",
    keyCode: 13, //Enter key
    shiftKey: false,
    preventDefault: jest.fn(),
  }

  it("calls handleTab() on function call", () => {
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
    const spyOnHandleTab = jest.spyOn(wrapper.vm, "handleTab");
    wrapper.vm.handleKeyDown(fakeEvent);
    expect(spyOnHandleTab).toHaveBeenCalled();
  });

  it("calls handleTabBackwards() on function call with shift key", () => {
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
    const spyOnHandleTabBackwards = jest.spyOn(wrapper.vm, "handleTabBackwards");
    wrapper.vm.handleKeyDown(fakeShiftEvent);
    expect(spyOnHandleTabBackwards).toHaveBeenCalled();
  });

  it("calls neither function if the button pressed isn't tab", () => {
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
    const spyOnHandleTabBackwards = jest.spyOn(wrapper.vm, "handleTabBackwards");
    const spyOnHandleTab = jest.spyOn(wrapper.vm, "handleTab");
    wrapper.vm.handleKeyDown(miscEvent);
    expect(spyOnHandleTabBackwards).not.toHaveBeenCalled();
    expect(spyOnHandleTab).not.toHaveBeenCalled();
  });
});
