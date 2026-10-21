import { shallowMount, flushPromises } from "@vue/test-utils";
import LogIn from "../../src/views/LogIn.vue";
import LoaderComponent from "../../src/components/LoaderComponent.vue";
import ButtonComponent from "../../src/components/ButtonComponent.vue";
import { createStore } from "vuex";
import store from "../../src/store/index";
import axios from "axios";
import spaEnvService from "../../src/services/spa-env-service";

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

describe("LogIn.vue returning from BC Services Card", () => {
  const envResponse = {
    data: {
      SPA_ENV_AOP_SALT: "salt",
      SPA_ENV_AOP_MAINTENANCE_FLAG: "false",
      SPA_ENV_AOP_MAINTENANCE_MESSAGE: "",
    },
  };
  const authUrl = "/aop/api/auth/api/auth/abc";
  const loginHeading = "Ministry of Health - Diagnostic Services secure upload tool";

  let router;
  let errorHandler;

  const mountLogIn = (query) =>
    shallowMount(LogIn, {
      global: {
        mocks: {
          $route: { path: "/sign-in", query },
          $router: router,
        },
        plugins: [
          createStore({
            state: () => ({ loading: false, uuid: "" }),
            mutations: {
              setLoading() {},
              setSalt() {},
              setMaintenanceMessage() {},
              setFirstName() {},
              setLastName() {},
            },
          }),
        ],
        config: { errorHandler },
      },
    });

  const loginContentShown = (wrapper) =>
    wrapper.find("h1").exists() && wrapper.findComponent(ButtonComponent).exists();

  beforeEach(() => {
    vi.restoreAllMocks();
    window.scrollTo = vi.fn();
    router = { push: vi.fn() };
    errorHandler = vi.fn();
    axios.post = vi.fn().mockResolvedValue(envResponse);
    axios.get = vi.fn().mockResolvedValue({ data: { url: "abcdefg" } });
  });

  it("shows only the page loader while the auth code is being exchanged", async () => {
    let resolveAuth;
    axios.get = vi.fn().mockReturnValue(
      new Promise((resolve) => {
        resolveAuth = resolve;
      })
    );
    const wrapper = mountLogIn({ code: "abc" });
    await flushPromises();

    expect(axios.get).toHaveBeenCalledWith(authUrl);
    const loader = wrapper.findComponent(LoaderComponent);
    expect(loader.exists()).toBe(true);
    expect(loader.props("page")).toBe(true);
    expect(wrapper.find("h1").exists()).toBe(false);
    expect(wrapper.findComponent(ButtonComponent).exists()).toBe(false);
    expect(router.push).not.toHaveBeenCalled();

    resolveAuth({ data: { given_name: "A", family_name: "B" } });
    await flushPromises();

    expect(router.push).toHaveBeenCalledTimes(1);
    expect(router.push).toHaveBeenCalledWith("/submission-info");
    expect(wrapper.find("h1").exists()).toBe(false);
  });

  it("shows only the page loader before the env request has returned", () => {
    axios.post = vi.fn().mockReturnValue(new Promise(() => {}));
    const wrapper = mountLogIn({ code: "abc" });

    expect(wrapper.findComponent(LoaderComponent).props("page")).toBe(true);
    expect(wrapper.find("h1").exists()).toBe(false);
    expect(wrapper.findComponent(ButtonComponent).exists()).toBe(false);
  });

  it("renders the login content and no page loader when there is no code", async () => {
    const wrapper = mountLogIn({});
    await flushPromises();

    expect(wrapper.find("h1").text()).toBe(loginHeading);
    expect(wrapper.findComponent(ButtonComponent).props("label")).toBe(
      "Log in with your mobile BC Services Card"
    );
    expect(wrapper.findComponent(LoaderComponent).exists()).toBe(false);
    expect(axios.get).toHaveBeenCalledWith("/aop/api/auth/api/url");
    expect(router.push).not.toHaveBeenCalled();
  });

  it("regression guard: returns the login content when the auth request fails", async () => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    axios.get = vi
      .fn()
      .mockImplementation((url) =>
        url === authUrl
          ? Promise.reject(new Error("auth failed"))
          : Promise.resolve({ data: { url: "abcdefg" } })
      );
    const wrapper = mountLogIn({ code: "abc" });
    await flushPromises();

    expect(loginContentShown(wrapper)).toBe(true);
    expect(wrapper.find("h1").text()).toBe(loginHeading);
    expect(wrapper.findComponent(LoaderComponent).exists()).toBe(false);
    expect(router.push).not.toHaveBeenCalled();
    expect(errorHandler).not.toHaveBeenCalled();
  });

  it("regression guard: returns the login content when the env request fails", async () => {
    const envError = new Error("env failed");
    // spaEnvService.loadEnvs attaches an un-caught .then to the axios promise, which
    // surfaces as a second unhandled rejection; stub the service method instead
    vi.spyOn(spaEnvService, "loadEnvs").mockRejectedValue(envError);
    const wrapper = mountLogIn({ code: "abc" });
    await flushPromises();

    expect(loginContentShown(wrapper)).toBe(true);
    expect(wrapper.find("h1").text()).toBe(loginHeading);
    expect(wrapper.findComponent(LoaderComponent).exists()).toBe(false);
    expect(axios.get).not.toHaveBeenCalled();
    expect(errorHandler).toHaveBeenCalledTimes(1);
    expect(errorHandler.mock.calls[0][0]).toBe(envError);
  });
});
