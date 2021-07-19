import {
  shallowMount,
  // mount,
  createLocalVue,
} from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuelidate from "vuelidate";
// import VueRouter from "vue-router";
import Component from "@/views/MoveInfoPage.vue";
// import spaEnvService from "@/services/spa-env-service";
import pageStateService from "@/services/page-state-service";
import formTemplate from "@/store/modules/form";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

const mutations = formTemplate.mutations;
const actions = formTemplate.actions;
const state = formTemplate.state;
const dataTemplate = {
  moveFromBCDate: null,
  arriveDestinationDate: null,
  isNewAddressKnown: null,
  addressLines: [],
  country: null,
  province: null,
  city: null,
  postalCode: null,
  showServerValidationError: false,
  isPageLoaded: false,
  isLoading: false,
  currNumOfAddressLines: null,
  isNewAddressKnownRadioItems: [
    {
      id: "is-new-address-known-y",
      label: "Yes",
      value: "Y",
    },
    {
      id: "is-new-address-known-n",
      label: "No",
      value: "N",
    },
  ],
};

// const scrollHelper = require("@/helpers/scroll");

jest
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));
jest
  .spyOn(pageStateService, "visitPage")
  .mockImplementation(() => Promise.resolve("visited"));

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
}));

// const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");

describe("MoveInfoPage.vue", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: {
          mutations,
          actions,
          state,
          namespaced: true,
        },
      },
    });
  });

  it("renders", () => {
    const wrapper = shallowMount(Component, {
      localVue,
      store,
      data: () => {
        return dataTemplate;
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe("MoveInfoPage.vue addAddressField", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: {
          mutations,
          actions,
          state,
          namespaced: true,
        },
      },
    });
  });

  it("increases the addressLines array length by one", async () => {
    const wrapper = shallowMount(Component, {
      localVue,
      store,
      data: () => dataTemplate,
    });

    const addressLineLength = wrapper.vm.addressLines.length;

    wrapper.vm.addAddressField();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.addressLines).toHaveLength(addressLineLength + 1);
  });

  it("puts blank address line in data without changing any other address lines", async () => {
    const wrapper = shallowMount(Component, {
      localVue,
      store,
      data: () => dataTemplate,
    });
    await wrapper.vm.$nextTick();
    //await setData required because created() sets the data to whatever's in the store
    await wrapper.setData({
      addressLines: [
        {
          id: "address-line-1",
          isValid: true,
          value: "default1",
        },
        {
          id: "address-line-2",
          isValid: true,
          value: "default2",
        },
      ],
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.addressLines[0]["value"]).toEqual("default1");
    expect(wrapper.vm.addressLines[1]["value"]).toEqual("default2");
    expect(wrapper.vm.addressLines[2]).toBeUndefined();

    wrapper.vm.addAddressField();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.addressLines[0]["value"]).toEqual("default1");
    expect(wrapper.vm.addressLines[1]["value"]).toEqual("default2");
    expect(wrapper.vm.addressLines[2]).toBeDefined();
    expect(wrapper.vm.addressLines[2]["value"]).toBeNull();
  });
});

describe("MoveInfoPage.vue removeAddressField", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: {
          mutations,
          actions,
          state,
          namespaced: true,
        },
      },
    });
  });

  it("decreases the addressLines array length by one", async () => {
    const wrapper = shallowMount(Component, {
      localVue,
      store,
      data: () => dataTemplate,
    });

    await wrapper.vm.$nextTick();
    //await setData required because created() sets the data to whatever's in the store
    await wrapper.setData({
      addressLines: [
        {
          id: "address-line-1",
          isValid: true,
          value: "default1",
        },
        {
          id: "address-line-2",
          isValid: true,
          value: "default2",
        },
      ],
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.removeAddressField();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.addressLines).toHaveLength(1);
  });

  it("removes last item from array without changing any other address lines", async () => {
    const wrapper = shallowMount(Component, {
      localVue,
      store,
      data: () => dataTemplate,
    });
    await wrapper.vm.$nextTick();
    //await setData required because created() sets the data to whatever's in the store
    await wrapper.setData({
      addressLines: [
        {
          id: "address-line-1",
          isValid: true,
          value: "default1",
        },
        {
          id: "address-line-2",
          isValid: true,
          value: "default2",
        },
      ],
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.addressLines[0]["value"]).toEqual("default1");
    expect(wrapper.vm.addressLines[1]["value"]).toEqual("default2");
    expect(wrapper.vm.addressLines[2]).toBeUndefined();

    wrapper.vm.removeAddressField();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.addressLines[0]["value"]).toEqual("default1");
    expect(wrapper.vm.addressLines[1]).toBeUndefined();
  });
});
