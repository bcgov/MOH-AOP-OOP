import { shallowMount } from "@vue/test-utils";
import { createStore } from "vuex";
import { createRouter, createWebHistory } from "vue-router";
import { routeCollection } from "@/router/index";
import Component, {
  addressLineOneSpecialCharacterValidator,
  specialCharacterWithCommaValidator,
} from "@/views/MoveInfoPage.vue";
import pageStateService from "@/services/page-state-service";
import logService from "@/services/log-service";
import formTemplate from "@/store/modules/form";
import { cloneDeep } from "lodash";
import { specialCharacterValidator } from "@/helpers/validators";

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
  arriveDestinationDate: new Date("2021-08-22"),
  isNewAddressKnown: "Y",
  addressLines: [
    {
      id: "address-line-1",
      isValid: true,
      value: "123 Main St.",
    },
    {
      id: "address-line-2",
      isValid: true,
      value: "Unit 456",
    },
  ],
  country: "Canada",
  province: "ON",
  city: "Fakesville",
  postalCode: "H0H 0H0",
  showServerValidationError: false,
  isPageLoaded: false,
  isLoading: false,
  currNumOfAddressLines: 5,
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

const spyOnLogNavigation = jest
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));

const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");
const spyOnScrollToError = jest.spyOn(scrollHelper, "scrollToError");

const router = createRouter({
  history: createWebHistory(),
  routes: routeCollection,
});

const spyOnRouter = jest
  .spyOn(router, "push")
  .mockImplementation(() => Promise.resolve("pushed"));

describe("MoveInfoPage.vue", () => {
  const dataTemplateCopy = cloneDeep(dataTemplate);
  let store;

  beforeEach(() => {
    store = createStore({
      modules: {
        form: {
          mutations: cloneDeep(mutations),
          actions: cloneDeep(actions),
          state: cloneDeep(state),
          namespaced: true,
        },
      },
    });
  });

  it("renders", () => {
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => {
        return dataTemplateCopy;
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe("MoveInfoPage.vue addAddressField()", () => {
  let store;

  beforeEach(() => {
    store = createStore({
      modules: {
        form: {
          mutations: cloneDeep(mutations),
          actions: cloneDeep(actions),
          state: cloneDeep(state),
          namespaced: true,
        },
      },
    });
  });

  it("increases the addressLines array length by one", async () => {
    const dataTemplateCopy = cloneDeep(dataTemplate);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => dataTemplateCopy,
    });

    const addressLineLength = wrapper.vm.addressLines.length;

    wrapper.vm.addAddressField();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.addressLines).toHaveLength(addressLineLength + 1);
  });

  it("puts blank address line in data without changing any other address lines", async () => {
    const dataTemplateCopy = cloneDeep(dataTemplate);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => dataTemplateCopy,
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
    store = createStore({
      modules: {
        form: {
          mutations: cloneDeep(mutations),
          actions: cloneDeep(actions),
          state: cloneDeep(state),
          namespaced: true,
        },
      },
    });
  });

  it("decreases the addressLines array length by one", async () => {
    const dataTemplateCopy = cloneDeep(dataTemplate);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => dataTemplateCopy,
    });

    await wrapper.vm.$nextTick();
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
    const dataTemplateCopy = cloneDeep(dataTemplate);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => dataTemplateCopy,
    });
    await wrapper.vm.$nextTick();
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
    store = createStore({
      modules: {
        form: {
          mutations: cloneDeep(mutations),
          actions: cloneDeep(actions),
          state: cloneDeep(state),
          namespaced: true,
        },
      },
    });
  });

  it("returns a number for a result", async () => {
    const dataTemplateCopy = cloneDeep(dataTemplate);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => dataTemplateCopy,
    });

    await wrapper.vm.$nextTick();
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
    const dataTemplateCopy = cloneDeep(dataTemplate);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => dataTemplateCopy,
    });
    await wrapper.vm.$nextTick();
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
    store = createStore({
      modules: {
        form: {
          mutations: cloneDeep(mutations),
          actions: cloneDeep(actions),
          state: cloneDeep(state),
          namespaced: true,
        },
      },
    });
  });

  it("sets address line to one object with a null value when country is Canada", async () => {
    jest.useFakeTimers();
    const dataTemplateCopy = cloneDeep(dataTemplate);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => dataTemplateCopy,
    });
    await wrapper.vm.$nextTick();
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
    const dataTemplateCopy = cloneDeep(dataTemplate);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => dataTemplateCopy,
    });
    await wrapper.vm.$nextTick();
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
    const dataTemplateCopy = cloneDeep(dataTemplate);
    jest.useFakeTimers();
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => dataTemplateCopy,
    });
    await wrapper.vm.$nextTick();
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
    store = createStore({
      modules: {
        form: {
          mutations: cloneDeep(mutations),
          actions: cloneDeep(actions),
          state: cloneDeep(state),
          namespaced: true,
        },
      },
    });
  });

  it("calls truncateAddressLines()", async () => {
    const dataTemplateCopy = cloneDeep(dataTemplate);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => dataTemplateCopy,
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
    const dataTemplateCopy = cloneDeep(dataTemplate);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => dataTemplateCopy,
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
    const dataTemplateCopy = cloneDeep(dataTemplate);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => dataTemplateCopy,
    });

    wrapper.vm.addressSelectedHandler(addressPayload2);
    await wrapper.vm.$nextTick();

    expect(spyOnReplaceSpecialCharacters).toHaveBeenCalledTimes(5);
    spyOnReplaceSpecialCharacters.mockClear();
  });

  it("sets the address in data to contain 1 address line when provided 1 address line", async () => {
    const dataTemplateCopy = cloneDeep(dataTemplate);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => dataTemplateCopy,
    });

    wrapper.vm.addressSelectedHandler(addressPayload);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.addressLines).toHaveLength(1);
  });

  it("sets the address in data to contain 1 address line when provided 2 address lines", async () => {
    const dataTemplateCopy = cloneDeep(dataTemplate);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => dataTemplateCopy,
    });

    wrapper.vm.addressSelectedHandler(addressPayload);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.addressLines).toHaveLength(1);
  });

  it("changes values in data to match payload", async () => {
    const dataTemplateCopy = cloneDeep(dataTemplate);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => dataTemplateCopy,
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
    expect(wrapper.vm.province).toEqual("Ontario");
    expect(wrapper.vm.postalCode).toEqual("N1P 0A3");
  });
});

describe("MoveInfoPage.vue validateFields()", () => {
  let store;

  beforeEach(() => {
    store = createStore({
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

  afterEach(() => {
    pageStateService.setPageComplete.mockReset();
    pageStateService.visitPage.mockReset();
    scrollHelper.scrollToError.mockReset();
    scrollHelper.scrollTo.mockReset();
  });

  it("returns an error when there are validation problems", async () => {
    const dataTemplateCopy = dataTemplate;
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
      data: () => dataTemplateCopy,
    });

    wrapper.vm.validateFields();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.v$.$invalid).toBeTruthy();
    expect(spyOnScrollToError).toHaveBeenCalled();
  });

  it("passes all individual validation tests", async () => {
    const dataTemplateCopy = cloneDeep(dataTemplateFilled);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => dataTemplateCopy,
    });

    await wrapper.setData(cloneDeep(dataTemplateFilled));
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.v$.moveFromBCDate.$invalid).toEqual(false);
    expect(wrapper.vm.v$.arriveDestinationDate.$invalid).toEqual(false);
    expect(wrapper.vm.v$.isNewAddressKnown.$invalid).toEqual(false);
    expect(wrapper.vm.v$.country.$invalid).toEqual(false);
    expect(wrapper.vm.v$.province.$invalid).toEqual(false);
    expect(wrapper.vm.v$.addressLines.$invalid).toEqual(false);
    expect(wrapper.vm.v$.city.$invalid).toEqual(false);
    expect(wrapper.vm.v$.postalCode.$invalid).toEqual(false);
  });

  it("doesn't return invalid when given proper data", async () => {
    jest.useFakeTimers();

    const dataTemplateCopy = cloneDeep(dataTemplateFilled);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
      data: () => dataTemplateCopy,
    });

    await wrapper.setData(cloneDeep(dataTemplateFilled));
    await wrapper.vm.$nextTick();

    wrapper.vm.validateFields();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.v$.$invalid).toBeFalsy();
  });

  it("calls setFieldsToNull when country isn't known", async () => {
    jest.useFakeTimers();

    const dataTemplateCopy = cloneDeep(dataTemplateFilled);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
      data: () => dataTemplateCopy,
    });

    const spyOnSetFieldsToNull = jest.spyOn(wrapper.vm, "setFieldsToNull");

    const dataTemplateCopy2 = cloneDeep(dataTemplateFilled);

    await wrapper.setData({ ...dataTemplateCopy2, isNewAddressKnown: "N" });
    await wrapper.vm.$nextTick();

    wrapper.vm.validateFields();
    await wrapper.vm.$nextTick();
    jest.advanceTimersByTime(2005);
    await wrapper.vm.$nextTick();

    expect(spyOnRouter).toHaveBeenCalled();
    expect(spyOnSetFieldsToNull).toHaveBeenCalled();
  });

  it("eliminates null/empty address lines when country is Canada", async () => {
    jest.useFakeTimers();

    const dataTemplateCopy = cloneDeep(dataTemplateFilled);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
      data: () => dataTemplateCopy,
    });

    const dataTemplateCopy2 = cloneDeep(dataTemplateFilled);

    await wrapper.setData({
      ...dataTemplateCopy2,
      addressLines: [
        {
          id: "address-line-1",
          isValid: true,
          value: "123 Main St.",
        },
        {
          id: "address-line-2",
          isValid: true,
          value: null,
        },
        {
          id: "address-line-2",
          isValid: true,
          value: "",
        },
      ],
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.addressLines).toHaveLength(3);

    wrapper.vm.validateFields();
    await wrapper.vm.$nextTick();
    jest.advanceTimersByTime(2005);
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.addressLines).toHaveLength(1);
  });

  //in the MoveInfoPage.vue validateFields() function,
  //there's a code block that adds an addressline if there are currently none
  //I could not replicate these conditions
  //as any time the addressLines array had zero elements
  //it would instead register as $invalid and throw an error
  //so I am skipping this test for now

  it("dispatches data to Vuex store", async () => {
    jest.useFakeTimers();

    const dataTemplateCopy = cloneDeep(dataTemplateFilled);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
      data: () => dataTemplateCopy,
    });

    const spyOnDispatch = jest.spyOn(wrapper.vm.$store, "dispatch");

    const dataTemplateCopy2 = cloneDeep(dataTemplateFilled);

    await wrapper.setData({
      ...dataTemplateCopy2,
      addressLines: [
        {
          id: "address-line-1",
          isValid: true,
          value: "123 Main St.",
        },
      ],
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.validateFields();
    await wrapper.vm.$nextTick();
    jest.advanceTimersByTime(2005);
    await wrapper.vm.$nextTick();

    expect(spyOnDispatch).toHaveBeenCalledWith(
      "form/setMoveFromBCDate",
      wrapper.vm.moveFromBCDate
    );
    expect(spyOnDispatch).toHaveBeenCalledWith(
      "form/setArriveDestinationDate",
      wrapper.vm.arriveDestinationDate
    );
    expect(spyOnDispatch).toHaveBeenCalledWith(
      "form/setIsNewAddressKnown",
      wrapper.vm.isNewAddressKnown
    );
    expect(spyOnDispatch).toHaveBeenCalledWith(
      "form/setCountry",
      wrapper.vm.country
    );
    expect(spyOnDispatch).toHaveBeenCalledWith(
      "form/setAddressLines",
      wrapper.vm.addressLines
    );
    expect(spyOnDispatch).toHaveBeenCalledWith(
      "form/setProvince",
      wrapper.vm.province
    );
    expect(spyOnDispatch).toHaveBeenCalledWith("form/setCity", wrapper.vm.city);
    expect(spyOnDispatch).toHaveBeenCalledWith(
      "form/setPostalCode",
      wrapper.vm.postalCode
    );
  });

  it("calls pageStateService", async () => {
    jest.useFakeTimers();

    const dataTemplateCopy = cloneDeep(dataTemplateFilled);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
      data: () => dataTemplateCopy,
    });

    const dataTemplateCopy2 = cloneDeep(dataTemplateFilled);

    await wrapper.setData({
      ...dataTemplateCopy2,
      addressLines: [
        {
          id: "address-line-1",
          isValid: true,
          value: "123 Main St.",
        },
      ],
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.validateFields();
    await wrapper.vm.$nextTick();
    jest.advanceTimersByTime(2005);
    await wrapper.vm.$nextTick();

    expect(pageStateService.setPageComplete).toHaveBeenCalled();
    expect(pageStateService.visitPage).toHaveBeenCalled();
  });

  it("calls scrollTo with the parameter 0", async () => {
    jest.useFakeTimers();

    const dataTemplateCopy = cloneDeep(dataTemplateFilled);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
      data: () => dataTemplateCopy,
    });

    const dataTemplateCopy2 = cloneDeep(dataTemplateFilled);

    await wrapper.setData({
      ...dataTemplateCopy2,
      addressLines: [
        {
          id: "address-line-1",
          isValid: true,
          value: "123 Main St.",
        },
      ],
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.validateFields();
    await wrapper.vm.$nextTick();
    jest.advanceTimersByTime(2005);
    await wrapper.vm.$nextTick();

    expect(spyOnScrollTo).toHaveBeenCalledWith(0);
  });

  it("calls routerPush to change page", async () => {
    jest.useFakeTimers();

    const dataTemplateCopy = cloneDeep(dataTemplateFilled);
    const wrapper = shallowMount(Component, {
      global: {
        plugins: [store, router],
      },
      data: () => dataTemplateCopy,
    });

    const dataTemplateCopy2 = cloneDeep(dataTemplateFilled);

    await wrapper.setData({
      ...dataTemplateCopy2,
      addressLines: [
        {
          id: "address-line-1",
          isValid: true,
          value: "123 Main St.",
        },
      ],
    });
    await wrapper.vm.$nextTick();

    wrapper.vm.validateFields();
    await wrapper.vm.$nextTick();
    jest.advanceTimersByTime(2005);
    await wrapper.vm.$nextTick();

    expect(spyOnRouter).toHaveBeenCalled();
  });
});

describe("MoveInfoPage.vue created()", () => {
  let wrapper;
  let store;

  let tempForm = cloneDeep(formTemplate);
  tempForm.state = cloneDeep(dataTemplateFilled);
  const dataTemplateCopy = cloneDeep(dataTemplate);

  beforeEach(() => {
    store = createStore({
      modules: {
        form: tempForm,
      },
    });

    wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => {
        return dataTemplateCopy;
      },
    });
  });

  it("sets values from store", () => {
    expect(Date(wrapper.vm.moveFromBCDate)).toEqual(Date("2021-08-01"));
    expect(Date(wrapper.vm.arriveDestinationDate)).toEqual(Date("2021-08-22"));
    expect(wrapper.vm.isNewAddressKnown).toEqual("Y");
    expect(wrapper.vm.addressLines).toEqual([
      {
        id: "address-line-1",
        isValid: true,
        value: "123 Main St.",
      },
      {
        id: "address-line-2",
        isValid: true,
        value: "Unit 456",
      },
    ]);
    expect(wrapper.vm.country).toEqual("Canada");
    expect(wrapper.vm.province).toEqual("Ontario");
    expect(wrapper.vm.city).toEqual("Fakesville");
    expect(wrapper.vm.postalCode).toEqual("H0H 0H0");
  });

  it("calls logNavigation() on page load", () => {
    expect(spyOnLogNavigation).toHaveBeenCalled();
  });

  it("adds the correct number of address lines", () => {
    expect(wrapper.vm.currNumOfAddressLines).toEqual(
      Math.max(wrapper.vm.getMinAddressLines(), wrapper.vm.addressLines.length)
    );
    expect(wrapper.vm.currNumOfAddressLines).toEqual(2);
  });
});

describe("MoveInfoPage.vue addressLineOneSpecialCharacterValidator()", () => {
  it("returns false when passed null", () => {
    expect(addressLineOneSpecialCharacterValidator()).toEqual(false);
  });

  it("returns false when passed a non-array", () => {
    expect(addressLineOneSpecialCharacterValidator("potato")).toEqual(false);
  });

  it("returns false when passed an array with no value", () => {
    expect(addressLineOneSpecialCharacterValidator(["potato"])).toEqual(false);
  });

  it("returns false when passed an array with null value", () => {
    expect(addressLineOneSpecialCharacterValidator([{ value: "" }])).toEqual(
      false
    );
  });

  it("returns the value of specialCharacterValidator() when passed an array with present value (true)", () => {
    expect(
      addressLineOneSpecialCharacterValidator([{ value: "potato" }])
    ).toEqual(specialCharacterValidator("potato"));
  });

  it("returns the value of specialCharacterValidator() when passed an array with present value (false)", () => {
    expect(addressLineOneSpecialCharacterValidator([{ value: "///" }])).toEqual(
      false
    );
  });
});

describe("MoveInfoPage.vue specialCharacterWithCommaValidator()", () => {
  it("returns true when passed null", () => {
    expect(specialCharacterWithCommaValidator()).toEqual(true);
  });

  it("returns true when passed string without special characters", () => {
    expect(specialCharacterWithCommaValidator("potato")).toEqual(true);
  });

  it("returns true when passed string with a comma and other passing characters", () => {
    expect(specialCharacterWithCommaValidator("potato,-.'#")).toEqual(true);
  });

  it("returns false when passed string with special characters", () => {
    expect(specialCharacterWithCommaValidator("potato///")).toEqual(false);
  });
});

describe("MoveInfoPage.vue updateAddressLine()", () => {
  let wrapper;
  let store;
  let before;

  let tempForm = cloneDeep(formTemplate);
  tempForm.state = cloneDeep(dataTemplateFilled);
  const dataTemplateCopy = cloneDeep(dataTemplate);

  beforeEach(() => {
    store = createStore({
      modules: {
        form: tempForm,
      },
    });

    wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
      data: () => {
        return dataTemplateCopy;
      },
    });

    before = wrapper.vm.addressLines[0].value;
  });

  it("updates value of given index with given string", () => {
    wrapper.vm.updateAddressLine("potato", 0);
    expect(wrapper.vm.addressLines[0].value).toEqual("potato");
  });

  it("doesn't update when passed null index", () => {
    wrapper.vm.updateAddressLine("potato", null);
    expect(wrapper.vm.addressLines[0].value).toEqual(before);
  });

  it("doesn't update when passed null string", () => {
    wrapper.vm.updateAddressLine(null, 0);
    expect(wrapper.vm.addressLines[0].value).toEqual(before);
  });

  it("doesn't update when passed non-integer index", () => {
    wrapper.vm.updateAddressLine("potato", "potato");
    expect(wrapper.vm.addressLines[0].value).toEqual(before);
  });

  it("doesn't update when passed non-string value", () => {
    wrapper.vm.updateAddressLine(0, 0);
    expect(wrapper.vm.addressLines[0].value).toEqual(before);
  });
});

describe("MoveInfoPage.vue cityMaxLength()", () => {
  let wrapper;
  let store;

  let tempForm = cloneDeep(formTemplate);
  tempForm.state = cloneDeep(dataTemplateFilled);

  beforeEach(() => {
    store = createStore({
      modules: {
        form: tempForm,
      },
    });

    wrapper = shallowMount(Component, {
      global: {
        plugins: [store],
      },
    });
  });

  it("returns expected values", () => {
    //these test values are hardcoded because they are database constraints and not expected to change
    expect(wrapper.vm.cityMaxLength("Canada")).toEqual(22);
    expect(wrapper.vm.cityMaxLength("United States")).toEqual(18);
    expect(wrapper.vm.cityMaxLength("Other")).toEqual(25);
    expect(wrapper.vm.cityMaxLength()).toEqual(25);
  });

  it("triggers a validation error when these fields are exceeded (Canada)", async () => {
    const testCityBefore = "abcdefghijklmnopqrstuv"; //22 characters, valid
    const testCityAfter = "abcdefghijklmnopqrstuvw"; //23 characters, invalid
    const testCountry = "Canada";
    //set city and country in the data
    wrapper.vm.city = testCityBefore;
    wrapper.vm.country = testCountry;
    //await next tick to ensure validation parameters update properly, eg 22 -> 18
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.v$.city.maxLength.$params.max).toEqual(
      wrapper.vm.cityMaxLength(wrapper.vm.country)
    );
    //check to make sure data store updated properly
    expect(wrapper.vm.city).toEqual(testCityBefore);
    expect(wrapper.vm.country).toEqual(testCountry);
    expect(wrapper.vm.v$.city.$invalid).toBe(false);
    //change city value
    wrapper.vm.city = testCityAfter;
    expect(wrapper.vm.city).toEqual(testCityAfter);
    //check to make sure validation changes accordingly
    expect(wrapper.vm.v$.city.$invalid).toBe(true);
  });

  it("triggers a validation error when these fields are exceeded (United States)", async () => {
    const testCityBefore = "abcdefghijklmnopqr"; //18 characters, valid
    const testCityAfter = "abcdefghijklmnopqrs"; //19 characters, invalid
    const testCountry = "United States";
    //set city and country in the data
    wrapper.vm.city = testCityBefore;
    wrapper.vm.country = testCountry;
    //await next tick to ensure validation parameters update properly, eg 22 -> 18
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.v$.city.maxLength.$params.max).toEqual(
      wrapper.vm.cityMaxLength(wrapper.vm.country)
    );
    //check to make sure data store updated properly
    expect(wrapper.vm.city).toEqual(testCityBefore);
    expect(wrapper.vm.country).toEqual(testCountry);
    expect(wrapper.vm.v$.city.$invalid).toBe(false);
    //change city value
    wrapper.vm.city = testCityAfter;
    expect(wrapper.vm.city).toEqual(testCityAfter);
    //check to make sure validation changes accordingly
    expect(wrapper.vm.v$.city.$invalid).toBe(true);
  });

  it("triggers a validation error when these fields are exceeded (Other)", async () => {
    const testCityBefore = "abcdefghijklmnopqrstuvwxy"; //25 characters, valid
    const testCityAfter = "abcdefghijklmnopqrstuvwxyz"; //26 characters, invalid
    const testCountry = "Afghanistan";
    //set city and country in the data
    wrapper.vm.city = testCityBefore;
    wrapper.vm.country = testCountry;
    //await next tick to ensure validation parameters update properly, eg 22 -> 25
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.v$.city.maxLength.$params.max).toEqual(
      wrapper.vm.cityMaxLength(wrapper.vm.country)
    );
    //check to make sure data store updated properly
    expect(wrapper.vm.city).toEqual(testCityBefore);
    expect(wrapper.vm.country).toEqual(testCountry);
    expect(wrapper.vm.v$.city.$invalid).toBe(false);
    //change city value
    wrapper.vm.city = testCityAfter;
    expect(wrapper.vm.city).toEqual(testCityAfter);
    //check to make sure validation changes accordingly
    expect(wrapper.vm.v$.city.$invalid).toBe(true);
  });
});
