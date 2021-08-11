import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import { cloneDeep } from "lodash";
import Vuelidate from "vuelidate";
import Component from "@/components/ReviewTableList.vue";
import { formatDate } from "@/helpers/date";
import * as formTemplate from "@/store/modules/form";

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

const dummyData = {
  lastName: "PICKET BOATXE",
  phn: "9353 166 544",
  phone: "250-123-4567",
  accountType: "AH",
  personMoving: "AH_ONLY",
  moveFromBCDate: new Date("2021-09-26"),
  arriveDestinationDate: new Date("2021-09-27"),
  isNewAddressKnown: "Y",
  country: "Canada",
  addressLines: [
    {
      id: "address-line-1",
      isValid: true,
      value: "123 Main St",
    },
    {
      id: "address-line-2",
      isValid: true,
      value: "Address Line 2",
    },
  ],
  province: "AB",
  city: "Victoria",
  postalCode: "A8V 8V8",
};

const dummyDataUSA = {
  lastName: "PICKET BOATXE",
  phn: "9353 166 544",
  phone: "250-123-4567",
  accountType: "AH",
  personMoving: "AH_ONLY",
  moveFromBCDate: new Date("2021-09-26"),
  arriveDestinationDate: new Date("2021-09-27"),
  isNewAddressKnown: "Y",
  country: "United States",
  addressLines: [
    {
      id: "address-line-1",
      isValid: true,
      value: "123 Main St",
    },
    {
      id: "address-line-2",
      isValid: true,
      value: "Fakesville",
    },
    {
      id: "address-line-2",
      isValid: true,
      value: "11111",
    },
  ],
  province: "AL",
  city: null,
  postalCode: null,
};


const dummyDataNull = {
  lastName: null,
  phn: null,
  phone: null,
  accountType: null,
  personMoving: null,
  moveFromBCDate: null,
  arriveDestinationDate: null,
  isNewAddressKnown: null,
  country: null,
  addressLine1: null,
  province: null,
  city: null,
  postalCode: null,
};

const dummyDataDep = {
  applicationUuid: "defaultuuid",
  captchaToken: "defaulttoken",
  lastName: "defaultlastname",
  phn: "defaultphn",
  phone: "defaultphone",
  moveFromBCDate: new Date("2021-09-26"),
  arriveDestinationDate: new Date("2021-09-27"),
  isNewAddressKnown: "N",
  country: "Canada",
  addressLines: ["default1"],
  province: "AB",
  city: "Victoria",
  postalCode: "A8V 8V8",
  accountType: "AH",
  personMoving: "AH_DEP",
  isAllDependentsMoving: "N",
  dependentPhns: ["1234"],
  submissionDate: null,
  referenceNumber: null,
  submissionResponse: null,
  submissionError: null,
};

const dummyDataDepOnly = {
  applicationUuid: "defaultuuid",
  captchaToken: "defaulttoken",
  lastName: "defaultlastname",
  phn: "defaultphn",
  phone: "defaultphone",
  moveFromBCDate: new Date("2021-09-26"),
  arriveDestinationDate: new Date("2021-09-27"),
  isNewAddressKnown: "N",
  country: "Canada",
  addressLines: ["default1"],
  province: "AB",
  city: "Victoria",
  postalCode: "A8V 8V8",
  accountType: "AH",
  personMoving: "DEP_ONLY",
  isAllDependentsMoving: "Y",
  dependentPhns: [
    {
      value: "9353 166 544",
      isValid: true,
    },
    {
      value: "9353 166 545",
      isValid: true,
    },
    {
      value: "9353 166 546",
      isValid: true,
    },
  ],
  submissionDate: null,
  referenceNumber: null,
  submissionResponse: null,
  submissionError: null,
};

const dummyDataDepsMoving = {
  applicationUuid: "defaultuuid",
  captchaToken: "defaulttoken",
  lastName: "defaultlastname",
  phn: "defaultphn",
  phone: "defaultphone",
  moveFromBCDate: new Date("2021-09-26"),
  arriveDestinationDate: new Date("2021-09-27"),
  isNewAddressKnown: "N",
  country: "Canada",
  addressLines: ["default1"],
  province: "AB",
  city: "Victoria",
  postalCode: "A8V 8V8",
  accountType: "AH",
  personMoving: "AH_DEP",
  isAllDependentsMoving: "N",
  dependentPhns: [
    {
      value: "9353 166 544",
      isValid: true,
    },
    {
      value: "9353 166 545",
      isValid: true,
    },
    {
      value: "9353 166 546",
      isValid: true,
    },
  ],
  submissionDate: null,
  referenceNumber: null,
  submissionResponse: null,
  submissionError: null,
};

const storeTemplateNull = {
  state: () => {
    const state = {
      applicationUuid: null,
      captchaToken: null,
      lastName: null,
      phn: null,
      phone: null,
      moveFromBCDate: null,
      arriveDestinationDate: null,
      isNewAddressKnown: null,
      country: null,
      addressLines: [],
      province: null,
      city: null,
      postalCode: null,
      accountType: null,
      personMoving: null,
      isAllDependentsMoving: null,
      dependentPhns: [],
      submissionDate: null,
      referenceNumber: null,
      submissionResponse: null,
      submissionError: null,
    };
    Object.assign(state, dummyDataNull);

    return state;
  },
};

const storeTemplate = {
  namespaced: true,
  state: () => {
    const state = {
      applicationUuid: null,
      captchaToken: null,
      lastName: null,
      phn: null,
      phone: null,
      moveFromBCDate: null,
      arriveDestinationDate: null,
      isNewAddressKnown: null,
      country: null,
      addressLines: [],
      province: null,
      city: null,
      postalCode: null,
      accountType: null,
      personMoving: null,
      isAllDependentsMoving: null,
      dependentPhns: [],
      submissionDate: null,
      referenceNumber: null,
      submissionResponse: null,
      submissionError: null,
    };
    Object.assign(state, dummyData);

    return state;
  },
  mutations: formTemplate.mutations,
  actions: formTemplate.actions,
  getters: {},
};

describe("ReviewTableList.vue", () => {
  it("renders", async () => {
    const store = new Vuex.Store({
      modules: {
        form: storeTemplate,
      },
    });

    const wrapper = mount(Component, {
      localVue,
      store,
    });

    expect(wrapper.element).toBeDefined();
  });
});

describe("ReviewTableList.vue yourInfoTableData() filled", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: storeTemplate,
      },
    });
  });

  it("returns an array with three elements in it", async () => {
    const wrapper = mount(Component, {
      localVue,
      store,
    });
    const result = wrapper.vm.yourInfoTableData;

    expect(Array.isArray(result)).toEqual(true);
    expect(result).toHaveLength(3);
  });

  it("returns the last name from the VueX store if it is present", async () => {
    const wrapper = mount(Component, {
      localVue,
      store,
    });

    const result = wrapper.vm.yourInfoTableData;

    //expect the computed value to return an array containing the following object
    //there doesn't seem to be a more graceful way to code this, unfortunately
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "PICKET BOATXE",
        }),
      ])
    );
  });

  it("returns the PHN from the VueX store if it is present", async () => {
    const wrapper = mount(Component, {
      localVue,
      store,
    });

    const result = wrapper.vm.yourInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "9353 166 544",
        }),
      ])
    );
  });

  it("returns the Phone number from the VueX store if it is present", async () => {
    const wrapper = mount(Component, {
      localVue,
      store,
    });

    const result = wrapper.vm.yourInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "250-123-4567",
        }),
      ])
    );
  });
});

describe("ReviewTableList.vue yourInfoTableData() null", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: storeTemplateNull,
      },
    });
  });

  it("returns an array with three elements in it", async () => {
    const wrapper = mount(Component, {
      localVue,
      store,
    });
    const result = wrapper.vm.yourInfoTableData;

    expect(Array.isArray(result)).toEqual(true);
    expect(result).toHaveLength(3);
  });

  it("returns an array containing a null last name", async () => {
    const wrapper = mount(Component, {
      localVue,
      store,
    });

    const result = wrapper.vm.yourInfoTableData;

    //expect the computed value to return an array containing the following object
    //there doesn't seem to be a more graceful way to code this, unfortunately
    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Last name:",
          value: null,
        }),
      ])
    );
  });

  it("returns an array containing a null PHN", async () => {
    const wrapper = mount(Component, {
      localVue,
      store,
    });

    const result = wrapper.vm.yourInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Personal health number (PHN):",
          value: null,
        }),
      ])
    );
  });

  it("returns an array containing a null phone number", async () => {
    const wrapper = mount(Component, {
      localVue,
      store,
    });

    const result = wrapper.vm.yourInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Phone number:",
          value: null,
        }),
      ])
    );
  });
});

describe("ReviewTableList.vue accountTypeTableData() filled", () => {
  it("returns an array", async () => {
    const store = new Vuex.Store({
      modules: {
        form: storeTemplate,
      },
    });

    const wrapper = mount(Component, {
      localVue,
      store,
    });
    const result = wrapper.vm.accountTypeTableData;

    expect(Array.isArray(result)).toEqual(true);
  });

  it("returns an array containing who is moving", async () => {
    const store = new Vuex.Store({
      modules: {
        form: storeTemplate,
      },
    });

    const wrapper = mount(Component, {
      localVue,
      store,
    });

    const result = wrapper.vm.accountTypeTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "Account holder only",
        }),
      ])
    );
  });

  it("adds additional data if account is AH_DEP", async () => {
    const tempForm = cloneDeep(storeTemplate);
    tempForm.state = cloneDeep(dummyDataDep);

    const store = new Vuex.Store({
      modules: {
        form: tempForm,
      },
    });

    const wrapper = mount(Component, {
      localVue,
      store,
    });

    const result = wrapper.vm.accountTypeTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label:
            "Are all of the dependents on your MSP account moving out of B.C.?",
        }),
      ])
    );

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "No",
        }),
      ])
    );
  });

  it("adds additional data if account is DEP_ONLY", async () => {
    const tempForm = cloneDeep(storeTemplate);
    tempForm.state = cloneDeep(dummyDataDepOnly);

    const store = new Vuex.Store({
      modules: {
        form: tempForm,
      },
    });

    const wrapper = mount(Component, {
      localVue,
      store,
    });

    const result = wrapper.vm.accountTypeTableData;
    await wrapper.vm.$nextTick;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Dependent PHN(s):",
        }),
      ])
    );

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "9353 166 544\n9353 166 545\n9353 166 546",
        }),
      ])
    );
  });

  it("adds additional data if isAllDependentsMoving is set to no", async () => {
    const tempForm = cloneDeep(storeTemplate);
    tempForm.state = cloneDeep(dummyDataDepsMoving);

    const store = new Vuex.Store({
      modules: {
        form: tempForm,
      },
    });

    const wrapper = mount(Component, {
      localVue,
      store,
    });

    const result = wrapper.vm.accountTypeTableData;
    await wrapper.vm.$nextTick;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          label: "Dependent PHN(s):",
        }),
      ])
    );

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "9353 166 544\n9353 166 545\n9353 166 546",
        }),
      ])
    );
  });
});

describe("ReviewTableList.vue moveInfoTableData() filled", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: storeTemplate,
      },
    });

    wrapper = mount(Component, {
      localVue,
      store,
    });
  });

  it("returns an array", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(Array.isArray(result)).toEqual(true);
  });

  it("returns an array containing permanent move date", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: formatDate(wrapper.vm.$store.state.form.moveFromBCDate),
        }),
      ])
    );
  });

  it("returns an array containing arrival date", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: formatDate(wrapper.vm.$store.state.form.arriveDestinationDate),
        }),
      ])
    );
  });

  it("returns an array containing whether new address is known", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "Yes",
        }),
      ])
    );
  });

  it("returns an array containing country", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "Canada",
        }),
      ])
    );
  });

  it("returns an array containing city", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "Victoria",
        }),
      ])
    );
  });

  it("returns an array containing province", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "Alberta",
        }),
      ])
    );
  });

  it("returns an array containing postal code", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "A8V 8V8",
        }),
      ])
    );
  });

  it("returns an array containing address lines", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "123 Main St",
        }),
      ])
    );

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "Address Line 2",
        }),
      ])
    );
  });
});

describe("ReviewTableList.vue moveInfoTableData() filled USA", () => {
  let store;
  let wrapper;

  beforeEach(() => {
    const tempForm = cloneDeep(storeTemplate);
    tempForm.state = cloneDeep(dummyDataUSA);

    const store = new Vuex.Store({
      modules: {
        form: tempForm,
      },
    });

    wrapper = mount(Component, {
      localVue,
      store,
    });
  });

  it("returns an array", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(Array.isArray(result)).toEqual(true);
  });

  it("returns an array containing permanent move date", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: formatDate(wrapper.vm.$store.state.form.moveFromBCDate),
        }),
      ])
    );
  });

  it("returns an array containing arrival date", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: formatDate(wrapper.vm.$store.state.form.arriveDestinationDate),
        }),
      ])
    );
  });

  it("returns an array containing whether new address is known", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "Yes",
        }),
      ])
    );
  });

  it("returns an array containing country", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "United States",
        }),
      ])
    );
  });

  it("returns an array containing city", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "Fakesville",
        }),
      ])
    );
  });

  it("returns an array containing province", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "Alabama",
        }),
      ])
    );
  });

  it("returns an array containing postal code", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "11111",
        }),
      ])
    );
  });

  it("returns an array containing address lines", async () => {
    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "123 Main St",
        }),
      ])
    );
  });

  
});
