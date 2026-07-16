import { mount } from "@vue/test-utils";
import axios from "axios";
import Component from "@/components/Captcha.vue";
import { it, describe, expect, beforeEach, vi } from "vitest";

//if you need to test future versions of audio playback
//you can replace the API audio response with the following 0 second base 64 audio clip:
//data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==

const mockAudioResponseValid = {
  data: {
    audio:
      "data:audio/wav;base64,UklGRjIAAABXQVZFZm10IBIAAAABAAEAQB8AAEAfAAABAAgAAABmYWN0BAAAAAAAAABkYXRhAAAAAA==",
  },
  status: 200,
  statusText: "OK",
  request: {},
};

const mockAudioResponseInvalid = {
  status: 500,
  statusText: "Error",
};

const mockInputResponseInvalid = {
  data: {
    valid: false,
  },
  status: 200,
  statusText: "OK",
};

const mockInputResponseValid = {
  data: {
    valid: true,
    jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5vbmNlIjoiYmNhNjc3M2MtYzIwOS00ZGFiLWEyN2EtNGQ4YjNjMTQ1MWRmIn0sImlhdCI6MTYyNDI5NzcxNSwiZXhwIjoxNjI0MzA4NTE1fQ.MirThnJS2X4Xn7TKtU7C-sT1GGxIcSFjfgSL0-lAgHc",
  },
  status: 200,
  statusText: "OK",
};

const mockFetchResponse = {
  data: {},
  status: 200,
  statusText: "OK",
};

const mockAPIError = {
  status: 500,
  statusText: "Error",
};

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(() => {
      return Promise.resolve();
    }),
  },
}));

window.HTMLMediaElement.prototype.play = () => {
  console.log("HTML Media Element prototype play");
};

describe("Captcha.vue", () => {
  it("renders", () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
        stubs: {
          FontAwesomeIcon: { template: "<div>Stubbed Global Component</div>" },
        },
      },
      props: {
        apiBasePath: "/oop/api/captcha",
        nonce: "f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa",
      },
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: false,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: null,
          isInputValid: null,
          audio: null,
          errorMessage: null,
        };
      },
    });
    axios.post.mockImplementationOnce(() => Promise.resolve(mockFetchResponse));
    expect(wrapper.element).toBeDefined();
  });
});

describe("Captcha.vue fetchNewCaptcha()", () => {
  it("changes captchaSVG and captchaValidation on function call", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
        stubs: {
          FontAwesomeIcon: { template: "<div>Stubbed Global Component</div>" },
        },
      },
      props: {
        apiBasePath: "/oop/api/captcha",
        nonce: "f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa",
      },
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: false,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: null,
          isInputValid: null,
          audio: null,
          errorMessage: null,
        };
      },
    });
    axios.post.mockImplementationOnce(() => Promise.resolve(mockFetchResponse));
    axios.post.mockImplementationOnce(() => Promise.resolve(mockFetchResponse));

    await wrapper.vm.fetchNewCaptcha();

    expect(wrapper.vm.captchaSVG).not.toBeNull();
    expect(wrapper.vm.captchaValidation).not.toBeNull();
  });

  it("emits captchaLoaded signal on function call", async () => {
    vi.useFakeTimers();
    const wrapper = mount(Component, {
      global: {
        plugins: [],
        stubs: {
          FontAwesomeIcon: { template: "<div>Stubbed Global Component</div>" },
        },
      },
      props: {
        apiBasePath: "/oop/api/captcha",
        nonce: "f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa",
      },
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: false,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: null,
          isInputValid: null,
          audio: null,
          errorMessage: null,
        };
      },
    });

    axios.post.mockImplementationOnce(() => Promise.resolve(mockFetchResponse));

    await wrapper.vm.fetchNewCaptcha();

    vi.advanceTimersByTime(5);

    expect(wrapper.emitted().captchaLoaded).toBeTruthy();
  });
});

describe("Captcha.vue handleInputChange()", () => {
  it("changes isLoadingCaptchaVerification on function call", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
        stubs: {
          FontAwesomeIcon: { template: "<div>Stubbed Global Component</div>" },
        },
      },
      props: {
        apiBasePath: "/oop/api/captcha",
        nonce: "f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa",
      },
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: "default",
          isLoadingAudio: false,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: null,
          isInputValid: null,
          audio: null,
          errorMessage: null,
        };
      },
    });
    const fakeEvent = { target: { value: "potato" } };
    axios.post.mockImplementationOnce(() => Promise.resolve(mockInputResponseInvalid));

    expect(wrapper.vm.isLoadingCaptchaVerification).toEqual("default");
    await wrapper.vm.handleInputChange(fakeEvent);
    expect(wrapper.vm.isLoadingCaptchaVerification).toEqual(false);
  });

  it("changes error message and inputAnswer when it receives invalid response", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
        stubs: {
          FontAwesomeIcon: { template: "<div>Stubbed Global Component</div>" },
        },
      },
      props: {
        apiBasePath: "/oop/api/captcha",
        nonce: "f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa",
      },
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: false,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: "default",
          isInputValid: null,
          audio: null,
          errorMessage: "default",
        };
      },
    });
    const fakeEvent = { target: { value: "potato" } };
    axios.post.mockImplementationOnce(() => Promise.resolve(mockInputResponseInvalid));

    await wrapper.vm.handleInputChange(fakeEvent);
    expect(wrapper.vm.inputAnswer).toBeFalsy();
    expect(wrapper.vm.errorMessage).toBeTruthy();
  });

  it("calls fetchNewCaptcha() when it receives invalid response", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
        stubs: {
          FontAwesomeIcon: { template: "<div>Stubbed Global Component</div>" },
        },
      },
      props: {
        apiBasePath: "/oop/api/captcha",
        nonce: "f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa",
      },
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: false,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: "default",
          isInputValid: null,
          audio: null,
          errorMessage: "default",
        };
      },
    });
    const spyOnFetch = vi.spyOn(wrapper.vm, "fetchNewCaptcha");
    const fakeEvent = { target: { value: "potato" } };
    axios.post.mockImplementationOnce(() => Promise.resolve(mockInputResponseInvalid));

    await wrapper.vm.handleInputChange(fakeEvent);
    expect(spyOnFetch).toHaveBeenCalled();
    spyOnFetch.mockReset();
  });

  it("emits signal with token when it receives valid response", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
        stubs: {
          FontAwesomeIcon: { template: "<div>Stubbed Global Component</div>" },
        },
      },
      props: {
        apiBasePath: "/oop/api/captcha",
        nonce: "f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa",
      },
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: false,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: "default",
          isInputValid: null,
          audio: null,
          errorMessage: "default",
        };
      },
    });
    const fakeEvent = { target: { value: "potato" } };
    axios.post.mockImplementationOnce(() => Promise.resolve(mockInputResponseValid));

    await wrapper.vm.handleInputChange(fakeEvent);
    expect(wrapper.emitted().captchaVerified).toBeTruthy();
    expect(wrapper.emitted().captchaVerified[0]).toEqual([
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Im5vbmNlIjoiYmNhNjc3M2MtYzIwOS00ZGFiLWEyN2EtNGQ4YjNjMTQ1MWRmIn0sImlhdCI6MTYyNDI5NzcxNSwiZXhwIjoxNjI0MzA4NTE1fQ.MirThnJS2X4Xn7TKtU7C-sT1GGxIcSFjfgSL0-lAgHc",
    ]);
  });

  it("changes error message and inputAnswer when it catches an error", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
        stubs: {
          FontAwesomeIcon: { template: "<div>Stubbed Global Component</div>" },
        },
      },
      props: {
        apiBasePath: "/oop/api/captcha",
        nonce: "f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa",
      },
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: false,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: "default",
          isInputValid: null,
          audio: null,
          errorMessage: "default",
        };
      },
    });
    const fakeEvent = { target: { value: "potato" } };
    axios.post.mockImplementationOnce(() => Promise.resolve(mockAPIError));

    await wrapper.vm.handleInputChange(fakeEvent);
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.inputAnswer).toBeFalsy();
    expect(wrapper.vm.errorMessage).toBeTruthy();
  });
});

describe("Captcha.vue handleTryAnotherImageClick()", () => {
  it("clears error message and input on function call", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
        stubs: {
          FontAwesomeIcon: { template: "<div>Stubbed Global Component</div>" },
        },
      },
      props: {
        apiBasePath: "/oop/api/captcha",
        nonce: "f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa",
      },
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: false,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: null,
          isInputValid: "default",
          audio: null,
          errorMessage: "default",
        };
      },
    });

    await wrapper.vm.handleTryAnotherImageClick();

    expect(wrapper.vm.isInputValid).not.toEqual("default");
    expect(wrapper.vm.errorMessage).not.toEqual("default");
  });

  it("calls fetchNewCaptcha() on function call", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
        stubs: {
          FontAwesomeIcon: { template: "<div>Stubbed Global Component</div>" },
        },
      },
      props: {
        apiBasePath: "/oop/api/captcha",
        nonce: "f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa",
      },
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: false,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: null,
          isInputValid: "default",
          audio: null,
          errorMessage: "default",
        };
      },
    });
    const spyOnFetchNewCaptcha = vi.spyOn(wrapper.vm, "fetchNewCaptcha");
    await wrapper.vm.handleTryAnotherImageClick();
    expect(spyOnFetchNewCaptcha).toHaveBeenCalled();
    spyOnFetchNewCaptcha.mockReset();
  });
});

describe("Captcha.vue playAudio()", () => {
  it("changes isLoadingAudio value on function call", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
        stubs: {
          FontAwesomeIcon: { template: "<div>Stubbed Global Component</div>" },
        },
      },
      props: {
        apiBasePath: "/oop/api/captcha",
        nonce: "f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa",
      },
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: 0,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: null,
          isInputValid: null,
          audio: null,
          errorMessage: null,
        };
      },
    });
    axios.post.mockImplementationOnce(() => Promise.resolve(mockFetchResponse));

    await wrapper.vm.playAudio();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.isLoadingAudio).not.toEqual(0);
  });

  it("sets this.audio to a falsy value and error message to a truthy one on error", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
        stubs: {
          FontAwesomeIcon: { template: "<div>Stubbed Global Component</div>" },
        },
      },
      props: {
        apiBasePath: "/oop/api/captcha",
        nonce: "f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa",
      },
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: 0,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: null,
          isInputValid: null,
          audio: null,
          errorMessage: null,
        };
      },
    });
    axios.post.mockImplementationOnce(() => Promise.resolve(mockAudioResponseInvalid));

    await wrapper.vm.playAudio();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.errorMessage).toBeTruthy();
    expect(wrapper.vm.audio).toBeFalsy();
  });

  it("sets this.audio to the response data when it receives a valid response", async () => {
    const wrapper = mount(Component, {
      global: {
        plugins: [],
        stubs: {
          FontAwesomeIcon: { template: "<div>Stubbed Global Component</div>" },
        },
      },
      props: {
        apiBasePath: "/oop/api/captcha",
        nonce: "f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa",
      },
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: null,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: null,
          isInputValid: null,
          audio: "default",
          errorMessage: null,
        };
      },
    });
    axios.post.mockImplementationOnce(() => Promise.resolve(mockAudioResponseValid));

    await wrapper.vm.playAudio();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.audio).not.toEqual("default");
  });

  it("calls play() when it receives a valid response", async () => {
    vi.useFakeTimers();

    const spyOnPlay = vi
      .spyOn(window.HTMLMediaElement.prototype, "play")
      .mockImplementation(() => {});

    const wrapper = mount(Component, {
      global: {
        plugins: [],
        stubs: {
          FontAwesomeIcon: { template: "<div>Stubbed Global Component</div>" },
        },
      },
      props: {
        apiBasePath: "/oop/api/captcha",
        nonce: "f631a1a4-21aa-4a51-a5ce-6004e5f5b0aa",
      },
      data: () => {
        return {
          isLoadingNewCaptcha: true,
          isLoadingCaptchaVerification: false,
          isLoadingAudio: null,
          captchaSVG: null,
          captchaValidation: null,
          inputAnswer: null,
          isInputValid: null,
          audio: "default",
          errorMessage: null,
        };
      },
    });

    axios.post.mockImplementationOnce(() => Promise.resolve(mockAudioResponseValid));

    await wrapper.vm.$nextTick();
    await wrapper.vm.playAudio();
    await wrapper.vm.$nextTick();

    vi.advanceTimersByTime(5);
    await wrapper.vm.$nextTick();

    expect(spyOnPlay).toHaveBeenCalled();
    spyOnPlay.mockReset();
  });
});
