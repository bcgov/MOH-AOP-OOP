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

const dataTemplateFilled = {
  applicationUuid: "defaultstring",
  captchaToken: "defaultstring",
  dependentPhns: [
    {
      value: null,
      isValid: true,
    },
    {
      value: null,
      isValid: true,
    },
  ],
  isAllDependentsMoving: null,
  lastName: "PALXD",
  phn: "9310134963",
  phone: "250-123-4567",
  accountType: "AH",
  personMoving: "AH_ONLY",
  moveFromBCDate: new Date("2021-08-01"),
  arriveDestinationDate: new Date("2021-08-02"),
  isNewAddressKnown: "Y",
  addressLines: ["716 default street"],
  country: "Canada",
  province: "ON",
  city: "Fakesville",
  postalCode: "H0H 0H0",
  showServerValidationError: false,
  isPageLoaded: false,
  isLoading: false,
  currNumOfAddressLines: 1,
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

const scrollHelper = require("@/helpers/scroll");
const addressHelper = require("@/helpers/address");
const stringHelper = require("@/helpers/string");

jest
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));
jest
  .spyOn(pageStateService, "visitPage")
  .mockImplementation(() => Promise.resolve("visited"));

jest.mock("@/helpers/scroll", () => ({
  scrollTo: jest.fn(),
  scrollToError: jest.fn(),
}));

const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");
const spyOnScrollToError = jest.spyOn(scrollHelper, "scrollToError");

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

describe("MoveInfoPage.vue addAddressField()", () => {
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

describe("MoveInfoPage.vue removeAddressField()", () => {
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

describe("MoveInfoPage.vue getAddressLength()", () => {
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

  it("returns a number for a result", async () => {
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

    const result = wrapper.vm.getAddressLinesLength();
    await wrapper.vm.$nextTick();

    expect(typeof result).toBe("number");
  });

  it("accurately counts the number of address lines", async () => {
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

    const result = wrapper.vm.getAddressLinesLength();
    await wrapper.vm.$nextTick();

    expect(result).toEqual(2);
  });
});

describe("MoveInfoPage.vue setFieldsToNull()", () => {
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

  it("sets address line to one object with a null value when country is Canada", async () => {
    jest.useFakeTimers();
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
      country: "Canada",
      city: "defaultcity",
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.setFieldsToNull();
    await wrapper.vm.$nextTick();
    jest.advanceTimersByTime(5);

    expect(wrapper.vm.addressLines).toEqual([
      { id: "address-line-1", isValid: true, value: null },
    ]);
  });

  it("sets values of existing address lines to null when country is not Canada", async () => {
    jest.useFakeTimers();
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
      country: "Bangladesh",
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.setFieldsToNull();
    await wrapper.vm.$nextTick();
    jest.advanceTimersByTime(5);

    expect(wrapper.vm.addressLines).toEqual([
      { id: "address-line-1", isValid: true, value: null },
      { id: "address-line-2", isValid: true, value: null },
    ]);
  });

  it("sets city to null", async () => {
    jest.useFakeTimers();
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
      country: "Bangladesh",
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.setFieldsToNull();
    await wrapper.vm.$nextTick();
    jest.advanceTimersByTime(5);

    expect(wrapper.vm.city).toBeNull();
  });
});

describe("MoveInfoPage.vue addressSelectedHandler()", () => {
  let store;
  let spyOnReplaceSpecialCharacters;
  const addressPayload = {
    fullAddress: "7-27 YATES AVE CAMBRIDGE ON N1P 0A3",
    city: "CAMBRIDGE",
    addressLines: ["7-27 YATES AVE"],
    province: "ON",
    postalCode: "N1P 0A3",
    country: "Canada",
  };
  const addressPayload2 = {
    fullAddress: "7-27 YATES AVE CAMBRIDGE ON N1P 0A3",
    city: "CAMBRIDGE",
    addressLines: ["7-27 YATES AVE", "defaultline2"],
    province: "ON",
    postalCode: "N1P 0A3",
    country: "Canada",
  };

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

  // afterEach(() => {
  // });

  it("calls truncateAddressLines()", async () => {
    const wrapper = shallowMount(Component, {
      localVue,
      store,
      data: () => dataTemplate,
    });

    const spyOnAddressHelper = jest.spyOn(
      addressHelper,
      "truncateAddressLines"
    );

    wrapper.vm.addressSelectedHandler(addressPayload);
    await wrapper.vm.$nextTick();

    expect(spyOnAddressHelper).toHaveBeenCalled();
  });

  it("calls replaceSpecialCharacters() 4 times when provided 1 address line", async () => {
    spyOnReplaceSpecialCharacters = jest.spyOn(
      stringHelper,
      "replaceSpecialCharacters"
    );
    const wrapper = shallowMount(Component, {
      localVue,
      store,
      data: () => dataTemplate,
    });

    wrapper.vm.addressSelectedHandler(addressPayload);
    await wrapper.vm.$nextTick();

    expect(spyOnReplaceSpecialCharacters).toHaveBeenCalledTimes(4);
    spyOnReplaceSpecialCharacters.mockClear();
  });

  it("calls replaceSpecialCharacters() 5 times when provided 2 address lines", async () => {
    spyOnReplaceSpecialCharacters = jest.spyOn(
      stringHelper,
      "replaceSpecialCharacters"
    );
    const wrapper = shallowMount(Component, {
      localVue,
      store,
      data: () => dataTemplate,
    });

    wrapper.vm.addressSelectedHandler(addressPayload2);
    await wrapper.vm.$nextTick();

    expect(spyOnReplaceSpecialCharacters).toHaveBeenCalledTimes(5);
    spyOnReplaceSpecialCharacters.mockClear();
  });

  it("sets the address in data to contain 1 address line when provided 1 address line", async () => {
    const wrapper = shallowMount(Component, {
      localVue,
      store,
      data: () => dataTemplate,
    });

    wrapper.vm.addressSelectedHandler(addressPayload);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.addressLines).toHaveLength(1);
  });

  it("sets the address in data to contain 1 address line when provided 2 address lines", async () => {
    const wrapper = shallowMount(Component, {
      localVue,
      store,
      data: () => dataTemplate,
    });

    wrapper.vm.addressSelectedHandler(addressPayload);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.addressLines).toHaveLength(1);
  });

  it("changes values in data to match payload", async () => {
    const wrapper = shallowMount(Component, {
      localVue,
      store,
      data: () => dataTemplate,
    });

    await wrapper.vm.$nextTick();
    await wrapper.setData({
      addressLines: [{ id: "address-line-1", isValid: true, value: "default" }],
      city: "default",
      province: "default",
      postalCode: "default",
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.city).toEqual("default");

    wrapper.vm.addressSelectedHandler(addressPayload);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.city).toEqual("CAMBRIDGE");
    expect(wrapper.vm.province).toEqual("ON");
    expect(wrapper.vm.postalCode).toEqual("N1P 0A3");
  });
});

describe("MoveInfoPage.vue validateFields()", () => {
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

  // afterEach(() => {
  // });

  it("returns an error when there are validation problems", async () => {
    const wrapper = shallowMount(Component, {
      localVue,
      store,
      data: () => dataTemplate,
    });

    wrapper.vm.validateFields();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$v.$invalid).toBeTruthy();
    expect(spyOnScrollToError).toHaveBeenCalled();
  });

  it.skip("template", async () => {
    const wrapper = shallowMount(Component, {
      localVue,
      store,
      data: () => dataTemplate,
    });

    // await wrapper.setData(dataTemplateFilled);
    // await wrapper.vm.$nextTick();

    const spyOnSetFieldsToNull = jest.spyOn(wrapper.vm, "setFieldsToNull");

    wrapper.vm.validateFields();
    await wrapper.vm.$nextTick();

    console.log("potato", wrapper.vm.$v.$invalid, wrapper.vm.$v.isNewAddressKnown.$error, wrapper.vm.$v);
    //wrapper.vm.$v.$errors, wrapper.vm.$v
    expect(wrapper.vm.$v.$invalid).toBeFalsy();
    expect(spyOnSetFieldsToNull).toHaveBeenCalled();
  });
});
