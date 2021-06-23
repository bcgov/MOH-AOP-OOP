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
  };

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
    const spyOnHandleTabBackwards = jest.spyOn(
      wrapper.vm,
      "handleTabBackwards"
    );
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
    const spyOnHandleTabBackwards = jest.spyOn(
      wrapper.vm,
      "handleTabBackwards"
    );
    const spyOnHandleTab = jest.spyOn(wrapper.vm, "handleTab");
    wrapper.vm.handleKeyDown(miscEvent);
    expect(spyOnHandleTabBackwards).not.toHaveBeenCalled();
    expect(spyOnHandleTab).not.toHaveBeenCalled();
  });
});

describe("ConsentModal.vue handleTab()", () => {
  const mockElements = [
    { name: "default1", focus: jest.fn() },
    { name: "default2", focus: jest.fn() },
    { name: "default3", focus: jest.fn() },
    { name: "default4", focus: jest.fn() },
  ];

  it("assigns focus to the first element in the focusableEls array if nothing is focused", async () => {
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
          focusableEls: mockElements,
          focusedEl: null,
          captchaAPIBasePath: "/oop/api/captcha",
          applicationUuid: null,
          isCaptchaValid: false,
          isTermsAccepted: false,
        };
      },
    });

    await wrapper.setData({
      focusableEls: mockElements,
    });

    const spyOnFocus = jest.spyOn(wrapper.vm.focusableEls[0], "focus");

    wrapper.vm.handleTab();
    expect(wrapper.vm.focusedEl.name).toEqual("default1");
    expect(spyOnFocus).toHaveBeenCalled();
  });

  it("moves focus from the first element to the second if the first is focused", async () => {
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
          focusableEls: mockElements,
          focusedEl: null,
          captchaAPIBasePath: "/oop/api/captcha",
          applicationUuid: null,
          isCaptchaValid: false,
          isTermsAccepted: false,
        };
      },
    });

    await wrapper.setData({
      focusableEls: mockElements,
    });
    await wrapper.setData({
      focusedEl: wrapper.vm.focusableEls[0],
    });

    wrapper.vm.handleTab();
    expect(wrapper.vm.focusedEl.name).toEqual("default2");
  });

  it("moves focus from the last element to the first if the last is focused", async () => {
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
          focusableEls: mockElements,
          focusedEl: null,
          captchaAPIBasePath: "/oop/api/captcha",
          applicationUuid: null,
          isCaptchaValid: false,
          isTermsAccepted: false,
        };
      },
    });

    await wrapper.setData({
      focusableEls: mockElements,
    });
    await wrapper.setData({
      focusedEl: wrapper.vm.focusableEls[3],
    });
    wrapper.vm.handleTab();
    expect(wrapper.vm.focusedEl.name).toEqual("default1");
  });

  it("should call focus function on focused element", async () => {
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
          focusableEls: mockElements,
          focusedEl: null,
          captchaAPIBasePath: "/oop/api/captcha",
          applicationUuid: null,
          isCaptchaValid: false,
          isTermsAccepted: false,
        };
      },
    });

    await wrapper.setData({
      focusableEls: mockElements,
    });
    await wrapper.setData({
      focusedEl: wrapper.vm.focusableEls[3],
    });
    const spyOnFocus = jest.spyOn(wrapper.vm.focusableEls[0], "focus");
    wrapper.vm.handleTab();
    expect(spyOnFocus).toHaveBeenCalled();
  });
});

describe("ConsentModal.vue handleTabBackwards()", () => {
  const mockElements = [
    { name: "default1", focus: jest.fn() },
    { name: "default2", focus: jest.fn() },
    { name: "default3", focus: jest.fn() },
    { name: "default4", focus: jest.fn() },
  ];

  it("assigns focus to the first element in the focusableEls array if nothing is focused", async () => {
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
          focusableEls: mockElements,
          focusedEl: null,
          captchaAPIBasePath: "/oop/api/captcha",
          applicationUuid: null,
          isCaptchaValid: false,
          isTermsAccepted: false,
        };
      },
    });

    await wrapper.setData({
      focusableEls: mockElements,
    });

    const spyOnFocus = jest.spyOn(wrapper.vm.focusableEls[3], "focus");
    wrapper.vm.handleTabBackwards();
    expect(wrapper.vm.focusedEl.name).toEqual("default4");
    expect(spyOnFocus).toHaveBeenCalled();
  });

  it("moves focus from the second element to the first if the second is focused", async () => {
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
          focusableEls: mockElements,
          focusedEl: null,
          captchaAPIBasePath: "/oop/api/captcha",
          applicationUuid: null,
          isCaptchaValid: false,
          isTermsAccepted: false,
        };
      },
    });

    await wrapper.setData({
      focusableEls: mockElements,
    });
    await wrapper.setData({
      focusedEl: wrapper.vm.focusableEls[1],
    });

    wrapper.vm.handleTabBackwards();
    expect(wrapper.vm.focusedEl.name).toEqual("default1");
  });

  it("moves focus from the first element to the last if the first is focused", async () => {
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
          focusableEls: mockElements,
          focusedEl: null,
          captchaAPIBasePath: "/oop/api/captcha",
          applicationUuid: null,
          isCaptchaValid: false,
          isTermsAccepted: false,
        };
      },
    });

    await wrapper.setData({
      focusableEls: mockElements,
    });
    await wrapper.setData({
      focusedEl: wrapper.vm.focusableEls[0],
    });
    wrapper.vm.handleTabBackwards();
    expect(wrapper.vm.focusedEl.name).toEqual("default4");
  });

  it("should call focus function on focused element", async () => {
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
          focusableEls: mockElements,
          focusedEl: null,
          captchaAPIBasePath: "/oop/api/captcha",
          applicationUuid: null,
          isCaptchaValid: false,
          isTermsAccepted: false,
        };
      },
    });

    await wrapper.setData({
      focusableEls: mockElements,
    });
    await wrapper.setData({
      focusedEl: wrapper.vm.focusableEls[3],
    });
    const spyOnFocus = jest.spyOn(wrapper.vm.focusableEls[2], "focus");
    wrapper.vm.handleTabBackwards();
    expect(spyOnFocus).toHaveBeenCalled();
  });
});
