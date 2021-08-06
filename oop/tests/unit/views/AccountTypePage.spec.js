import { mount, shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import Component from "@/views/AccountTypePage.vue";
import logService from "@/services/log-service";
import pageStateService from "@/services/page-state-service";
import * as formTemplate from "@/store/modules/form";
import { cloneDeep } from "lodash";
// import axios from "axios";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(VueRouter);
Vue.use(Vuelidate);
const router = new VueRouter();

jest.mock("axios", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

jest
  .spyOn(logService, "logNavigation")
  .mockImplementation(() => Promise.resolve("logged"));
jest
  .spyOn(logService, "logError")
  .mockImplementation(() => Promise.resolve("logged"));
jest
  .spyOn(logService, "logInfo")
  .mockImplementation(() => Promise.resolve("logged"));
jest
  .spyOn(pageStateService, "setPageComplete")
  .mockImplementation(() => Promise.resolve("set"));
jest
  .spyOn(pageStateService, "visitPage")
  .mockImplementation(() => Promise.resolve("visited"));

jest.mock("@/helpers/scroll", () => ({
  scrollToError: jest.fn(),
  scrollTo: jest.fn(),
}));

const scrollHelper = require("@/helpers/scroll");

const spyOnScrollTo = jest.spyOn(scrollHelper, "scrollTo");

const stateTemplate = {
  lastName: "defaultlastname",
  phn: "defaultphn",
  phone: "defaultphone",
  accountType: "default",
  personMoving: "default",
  isAllDependentsMoving: "default",
  dependentPhns: ["default"],
};

const storeTemplate3 = {
  lastName: "defaultlastname",
  phn: "defaultphn",
  phone: "defaultphone",
  accountType: "default",
  personMoving: "default",
  isAllDependentsMoving: "default",
  dependentPhns: [
    { value: "default1" },
    { value: "default2" },
    { value: "default3" },
  ],
};

const storeTemplate6 = {
  lastName: "defaultlastname",
  phn: "defaultphn",
  phone: "defaultphone",
  accountType: "default",
  personMoving: "default",
  isAllDependentsMoving: "default",
  dependentPhns: [
    { value: "default1" },
    { value: "default2" },
    { value: "default3" },
    { value: "default4" },
    { value: "default5" },
    { value: "default6" },
  ],
};

describe("AccountTypePage.vue", () => {
  let wrapper = null;
  let store = null;

  beforeEach(() => {
    let tempForm = cloneDeep(formTemplate.default);
    tempForm.state = stateTemplate;
    store = new Vuex.Store({
      modules: {
        form: tempForm,
      },
    });

    wrapper = mount(Component, {
      store,
      localVue,
      router,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});

describe("AccountTypePage.vue handleValidationSuccess()", () => {
  let wrapper = null;
  let store = null;

  beforeEach(() => {
    let tempForm = cloneDeep(formTemplate.default);
    tempForm.state = stateTemplate;
    store = new Vuex.Store({
      modules: {
        form: tempForm,
      },
    });

    wrapper = mount(Component, {
      store,
      localVue,
      router,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("calls saveValues() function", async () => {
    const spyOnSaveValues = jest
      .spyOn(wrapper.vm, "saveValues")
      .mockImplementation(() => Promise.resolve("saved"));

    wrapper.vm.handleValidationSuccess();
    await wrapper.vm.$nextTick();

    expect(spyOnSaveValues).toHaveBeenCalled();
  });

  it("calls nextPage() function", async () => {
    const spyOnNextPage = jest
      .spyOn(wrapper.vm, "nextPage")
      .mockImplementation(() => Promise.resolve("next"));

    wrapper.vm.handleValidationSuccess();
    await wrapper.vm.$nextTick();

    expect(spyOnNextPage).toHaveBeenCalled();
  });
});

describe("AccountTypePage.vue saveValues()", () => {
  let wrapper = null;
  let store = null;

  beforeEach(() => {
    let tempForm = cloneDeep(formTemplate.default);
    tempForm.state = stateTemplate;
    store = new Vuex.Store({
      modules: {
        form: tempForm,
      },
    });

    wrapper = mount(Component, {
      store,
      localVue,
      router,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("changes account type in store", async () => {
    await wrapper.vm.$nextTick();
    await wrapper.setData({ accountType: "updatedaccount" });
    await wrapper.vm.$nextTick();

    wrapper.vm.saveValues();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$store.state.form.accountType).toEqual("updatedaccount");
  });

  it("changes person moving in store", async () => {
    await wrapper.vm.$nextTick();
    await wrapper.setData({ personMoving: "updatedpersonmoving" });
    await wrapper.vm.$nextTick();

    wrapper.vm.saveValues();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$store.state.form.personMoving).toEqual(
      "updatedpersonmoving"
    );
  });

  it("changes isAllDependentsMoving in store", async () => {
    await wrapper.vm.$nextTick();
    await wrapper.setData({ isAllDependentsMoving: "updateddependentsmoving" });
    await wrapper.vm.$nextTick();

    wrapper.vm.saveValues();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$store.state.form.isAllDependentsMoving).toEqual(
      "updateddependentsmoving"
    );
  });

  it("changes dependentPhns in store", async () => {
    await wrapper.vm.$nextTick();
    await wrapper.setData({ dependentPhns: ["updateddependentphns"] });
    await wrapper.vm.$nextTick();

    wrapper.vm.saveValues();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$store.state.form.dependentPhns).toEqual([
      "updateddependentphns",
    ]);
  });
});

describe("AccountTypePage.vue nextPage()", () => {
  let wrapper = null;
  let store = null;

  beforeEach(() => {
    let tempForm = cloneDeep(formTemplate.default);
    tempForm.state = stateTemplate;
    store = new Vuex.Store({
      modules: {
        form: tempForm,
      },
    });

    wrapper = mount(Component, {
      store,
      localVue,
      router,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  // afterEach(() => {
  //   logService.logNavigation.mockReset();
  //   logService.logError.mockReset();
  //   logService.logInfo.mockReset();
  //   pageStateService.setPageComplete.mockReset();
  //   pageStateService.visitPage.mockReset();
  //   scrollHelper.scrollToError.mockReset();
  //   scrollHelper.scrollTo.mockReset();
  // });

  it("pushes to router", async () => {
    const spyOnRouter = jest
      .spyOn(router, "push")
      .mockImplementation(() => Promise.resolve("pushed"));

    wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    expect(spyOnRouter).toHaveBeenCalled();
  });

  it("calls scrollTo with the parameter 0", async () => {
    wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    expect(spyOnScrollTo).toHaveBeenCalledWith(0);
  });

  it("calls pageStateService", async () => {
    wrapper.vm.nextPage();
    await wrapper.vm.$nextTick();

    expect(pageStateService.setPageComplete).toHaveBeenCalled();
    expect(pageStateService.visitPage).toHaveBeenCalled();
  });
});

describe("AccountTypePage.vue addDependentField()", () => {
  //the business logic does not currently permit there to be fewer than 5 dependentFields
  //there will always be a minimum of 5 in the store and data, even if they are null by default
  //so I didn't test for this
  //as the test would be useless in its current form
  //and would break if the implementation ever changed
  //if the implementation does change, more tests should be written

  let wrapper = null;
  let store = null;

  beforeEach(() => {
    let tempForm = cloneDeep(formTemplate.default);
    tempForm.state = cloneDeep(storeTemplate6);
    store = new Vuex.Store({
      modules: {
        form: tempForm,
      },
    });

    wrapper = mount(Component, {
      store,
      localVue,
      router,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("increases the length of the array by one if the store contains 5 or more elements", async () => {
    expect(wrapper.vm.dependentPhns).toHaveLength(6);

    wrapper.vm.addDependentField();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.dependentPhns).toHaveLength(7);
  });

  it("adds an object with a null value to the end of the data array if the store contains 5 or more elements", async () => {
    wrapper.vm.addDependentField();
    await wrapper.vm.$nextTick();

    const finalArrayValue = wrapper.vm.dependentPhns.length - 1;

    expect(wrapper.vm.dependentPhns[finalArrayValue]).toEqual({
      isValid: true,
      value: null,
    });
  });
});

describe("AccountTypePage.vue getDependentPhns()", () => {
  let wrapper = null;
  let store = null;

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("returns an array that's the same length as the array in the store if the store contains 6-9 elements", async () => {
    let tempForm = cloneDeep(formTemplate.default);
    tempForm.state = cloneDeep(storeTemplate6);
    store = new Vuex.Store({
      modules: {
        form: tempForm,
      },
    });

    wrapper = mount(Component, {
      store,
      localVue,
      router,
    });

    const result = wrapper.vm.getDependentPhns();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.dependentPhns).toHaveLength(result.length);
    expect(wrapper.vm.$store.state.form.dependentPhns).toHaveLength(
      result.length
    );
  });

  it("returns an array of equal length to the number of elements put in if store contains 1-5 elements", async () => {
    //the code tops off the store and data with null elements, so there will always be five of them
    //this test is to check to make sure that if three non-null elements are put into the store
    //then the result from this code will contain 3 non-null elements

    let tempForm = cloneDeep(formTemplate.default);
    tempForm.state = cloneDeep(storeTemplate3);
    store = new Vuex.Store({
      modules: {
        form: tempForm,
      },
    });

    wrapper = mount(Component, {
      store,
      localVue,
      router,
    });

    const result = wrapper.vm.getDependentPhns();
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.$store.state.form.dependentPhns).toHaveLength(5);
    expect(wrapper.vm.dependentPhns).toHaveLength(5);
    expect(result).toHaveLength(3);
  });

  it("returns an array containing the values of the store if the store contains 6-9 elements", async () => {
    let tempForm = cloneDeep(formTemplate.default);
    tempForm.state = cloneDeep(storeTemplate6);
    store = new Vuex.Store({
      modules: {
        form: tempForm,
      },
    });

    wrapper = mount(Component, {
      store,
      localVue,
      router,
    });

    const result = wrapper.vm.getDependentPhns();
    await wrapper.vm.$nextTick();

    expect(result).toEqual([
      "default1",
      "default2",
      "default3",
      "default4",
      "default5",
      "default6",
    ]);
  });

  it("returns an array containing the values of the store if the store contains 1-5 elements", async () => {
    let tempForm = cloneDeep(formTemplate.default);
    tempForm.state = cloneDeep(storeTemplate3);
    store = new Vuex.Store({
      modules: {
        form: tempForm,
      },
    });

    wrapper = mount(Component, {
      store,
      localVue,
      router,
    });

    const result = wrapper.vm.getDependentPhns();
    await wrapper.vm.$nextTick();

    expect(result).toEqual(["default1", "default2", "default3"]);
  });
});

//skipping getMaxPHNDependentFields() test
//because it would be more a test of my mock than the function itself
//which is very simple

describe("AccountTypePage.vue resetDependentFields()", () => {
  let wrapper = null;
  let store = null;

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("changes the dependentPhns to an array of 5 null values when 5 or less dependent fields are present", async () => {
    let tempForm = cloneDeep(formTemplate.default);
    tempForm.state = cloneDeep(storeTemplate3);
    store = new Vuex.Store({
      modules: {
        form: tempForm,
      },
    });

    wrapper = mount(Component, {
      store,
      localVue,
      router,
    });
    expect(wrapper.vm.dependentPhns[0]["value"]).toEqual("default1");

    wrapper.vm.resetDependentFields();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.dependentPhns).toHaveLength(5);
    expect(wrapper.vm.dependentPhns[0]["value"]).toBeNull();
  });

  it("changes the dependentPhns to an array of null values equal to the number of dependent fields", async () => {
    let tempForm = cloneDeep(formTemplate.default);
    tempForm.state = cloneDeep(storeTemplate6);
    store = new Vuex.Store({
      modules: {
        form: tempForm,
      },
    });

    wrapper = mount(Component, {
      store,
      localVue,
      router,
    });
    expect(wrapper.vm.dependentPhns[5]["value"]).toEqual("default6");

    wrapper.vm.resetDependentFields();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.dependentPhns).toHaveLength(6);
    expect(wrapper.vm.dependentPhns[5]["value"]).toBeNull();
  });
});

describe("AccountTypePage.vue validateFields()", () => {
  let wrapper = null;
  let store = null;

  beforeEach(() => {
    let tempForm = cloneDeep(formTemplate.default);
    tempForm.state = stateTemplate;
    store = new Vuex.Store({
      modules: {
        form: tempForm,
      },
    });

    wrapper = mount(Component, {
      store,
      localVue,
      router,
    });
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  it("renders", () => {
    expect(wrapper.element).toBeDefined();
  });
});
