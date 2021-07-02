import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import Vuelidate from "vuelidate";
import Component from "@/components/ReviewTableList.vue";
import { formatDate } from '@/helpers/date';

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
  isNewAddressKnown: "N",
  country: "Canada",
  addressLine1: "123 Main St.",
  province: "AB",
  city: "Victoria",
  postalCode: "A8V 8V8",
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

// const MODULE_NAME = 'form';
// const RESET_FORM = 'resetForm';

const SET_APPLICATION_UUID = "setApplicationUuid";
const SET_CAPTCHA_TOKEN = "setCaptchaToken";
const SET_SUBMISSION_DATE = "setSubmissionDate";
const SET_REFERENCE_NUMBER = "setReferenceNumber";

// Your info page:
const SET_LAST_NAME = "setLastName";
const SET_PHN = "setPhn";
const SET_PHONE = "setPhone";

// Move Info page
const SET_MOVE_FROM_BC_DATE = "setMoveFromBCDate";
const SET_ARRIVE_DESTINATION_DATE = "setArriveDestinationDate";
const SET_IS_NEW_ADDRESS_KNOWN = "setIsNewAddressKnown";
const SET_COUNTRY = "setCountry";
const SET_ADDRESS_LINES = "setAddressLines";
const SET_PROVINCE = "setProvince";
const SET_CITY = "setCity";
const SET_POSTAL_CODE = "setPostalCode";

// Account type page:
const SET_ACCOUNT_TYPE = "setAccountType";
const SET_PERSON_MOVING = "setPersonMoving";
const SET_IS_ALL_DEPENDENTS_MOVING = "setIsAllDependentsMoving";
const SET_DEPENDENT_PHNS = "setDependentPhns";

// Sending page:
const SET_SUBMISSION_RESPONSE = "setSubmissionResponse";
const SET_SUBMISSION_ERROR = "setSubmissionError";

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
  mutations: {
    setApplicationUuid(state, payload) {
      state.applicationUuid = payload;
    },
    setCaptchaToken(state, payload) {
      state.captchaToken = payload;
    },
    setSubmissionDate(state, payload) {
      state.submissionDate = payload;
    },
    setReferenceNumber(state, payload) {
      state.referenceNumber = payload;
    },
    setLastName(state, payload) {
      state.lastName = payload;
    },
    setPhn(state, payload) {
      state.phn = payload;
    },
    setPhone(state, payload) {
      state.phone = payload;
    },
    setMoveFromBCDate(state, payload) {
      state.moveFromBCDate = payload;
    },
    setArriveDestinationDate(state, payload) {
      state.arriveDestinationDate = payload;
    },
    setIsNewAddressKnown(state, payload) {
      state.isNewAddressKnown = payload;
    },
    setCountry(state, payload) {
      state.country = payload;
    },
    setAddressLines(state, payload) {
      state.addressLines = payload;
    },
    setProvince(state, payload) {
      state.province = payload;
    },
    setCity(state, payload) {
      state.city = payload;
    },
    setPostalCode(state, payload) {
      state.postalCode = payload;
    },
    setAccountType(state, payload) {
      state.accountType = payload;
    },
    setPersonMoving(state, payload) {
      state.personMoving = payload;
    },
    setIsAllDependentsMoving(state, payload) {
      state.isAllDependentsMoving = payload;
    },
    setDependentPhns(state, payload) {
      state.dependentPhns = payload;
    },
    setSubmissionResponse(state, payload) {
      state.submissionResponse = payload;
    },
    setSubmissionError(state, payload) {
      state.submissionError = payload;
    },
  },
  actions: {
    resetForm({ commit }) {
      commit(SET_APPLICATION_UUID, null);
      commit(SET_CAPTCHA_TOKEN, null);
      commit(SET_SUBMISSION_DATE, null);
      commit(SET_REFERENCE_NUMBER, null);
      commit(SET_LAST_NAME, null);
      commit(SET_PHN, null);
      commit(SET_PHONE, null);
      commit(SET_MOVE_FROM_BC_DATE, null);
      commit(SET_ARRIVE_DESTINATION_DATE, null);
      commit(SET_IS_NEW_ADDRESS_KNOWN, null);
      commit(SET_COUNTRY, null);
      commit(SET_ADDRESS_LINES, []);
      commit(SET_PROVINCE, null);
      commit(SET_CITY, null);
      commit(SET_POSTAL_CODE, null);
      commit(SET_ACCOUNT_TYPE, null);
      commit(SET_PERSON_MOVING, null);
      commit(SET_IS_ALL_DEPENDENTS_MOVING, null);
      commit(SET_DEPENDENT_PHNS, []);
      commit(SET_SUBMISSION_RESPONSE, null);
      commit(SET_SUBMISSION_ERROR, null);
    },
    setApplicationUuid({ commit }, applicationUuid) {
      commit(SET_APPLICATION_UUID, applicationUuid);
    },
    setCaptchaToken({ commit }, captchaToken) {
      commit(SET_CAPTCHA_TOKEN, captchaToken);
    },
    setSubmissionDate({ commit }, submissionDate) {
      commit(SET_SUBMISSION_DATE, submissionDate);
    },
    setReferenceNumber({ commit }, referenceNumber) {
      commit(SET_REFERENCE_NUMBER, referenceNumber);
    },
    setLastName({ commit }, lastName) {
      commit(SET_LAST_NAME, lastName);
    },
    setPhn({ commit }, phn) {
      commit(SET_PHN, phn);
    },
    setPhone({ commit }, phone) {
      commit(SET_PHONE, phone);
    },
    setMoveFromBCDate({ commit }, moveFromBCDate) {
      commit(SET_MOVE_FROM_BC_DATE, moveFromBCDate);
    },
    setArriveDestinationDate({ commit }, arriveDestinationDate) {
      commit(SET_ARRIVE_DESTINATION_DATE, arriveDestinationDate);
    },
    setIsNewAddressKnown({ commit }, isNewAddressKnown) {
      commit(SET_IS_NEW_ADDRESS_KNOWN, isNewAddressKnown);
    },
    setCountry({ commit }, country) {
      commit(SET_COUNTRY, country);
    },
    setAddressLines({ commit }, addressLines) {
      commit(SET_ADDRESS_LINES, addressLines);
    },
    setProvince({ commit }, province) {
      commit(SET_PROVINCE, province);
    },
    setCity({ commit }, city) {
      commit(SET_CITY, city);
    },
    setPostalCode({ commit }, postalCode) {
      commit(SET_POSTAL_CODE, postalCode);
    },
    setAccountType({ commit }, accountType) {
      commit(SET_ACCOUNT_TYPE, accountType);
    },
    setPersonMoving({ commit }, personMoving) {
      commit(SET_PERSON_MOVING, personMoving);
    },
    setIsAllDependentsMoving({ commit }, isAllDependentsMoving) {
      commit(SET_IS_ALL_DEPENDENTS_MOVING, isAllDependentsMoving);
    },
    setDependentPhns({ commit }, dependentPhns) {
      commit(SET_DEPENDENT_PHNS, dependentPhns);
    },
    setApiResponse({ commit }, response) {
      commit(SET_SUBMISSION_RESPONSE, response);
    },
    setApiError({ commit }, error) {
      commit(SET_SUBMISSION_ERROR, error);
    },
  },
  getters: {},
};

describe("ReviewTableList.vue", () => {
  it("renders", async () => {
    const store = new Vuex.Store({
      modules: {
        form: {
          namespaced: true,
          state: storeTemplate.state,
          mutations: storeTemplate.mutations,
          actions: storeTemplate.actions,
          getters: storeTemplate.getters,
        },
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
        form: {
          namespaced: true,
          state: storeTemplate.state,
          mutations: storeTemplate.mutations,
          actions: storeTemplate.actions,
          getters: storeTemplate.getters,
        },
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
        form: {
          namespaced: true,
          state: storeTemplateNull.state,
          mutations: storeTemplate.mutations,
          actions: storeTemplate.actions,
          getters: storeTemplate.getters,
        },
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
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: {
          namespaced: true,
          state: storeTemplate.state,
          mutations: storeTemplate.mutations,
          actions: storeTemplate.actions,
          getters: storeTemplate.getters,
        },
      },
    });
  });

  it("returns an array", async () => {
    const wrapper = mount(Component, {
      localVue,
      store,
    });
    const result = wrapper.vm.accountTypeTableData;

    expect(Array.isArray(result)).toEqual(true);
  });

  it("returns an array containing who is moving", async () => {
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

  //tests for AH_DEP and DEP_ONLY can and should go here
});

describe("ReviewTableList.vue moveInfoTableData() filled", () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        form: {
          namespaced: true,
          state: storeTemplate.state,
          mutations: storeTemplate.mutations,
          actions: storeTemplate.actions,
          getters: storeTemplate.getters,
        },
      },
    });
  });

  it("returns an array", async () => {
    const wrapper = mount(Component, {
      localVue,
      store,
    });
    const result = wrapper.vm.moveInfoTableData;

    expect(Array.isArray(result)).toEqual(true);
  });

  it("returns an array containing permanent move date", async () => {
    const wrapper = mount(Component, {
      localVue,
      store,
    });

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
    const wrapper = mount(Component, {
      localVue,
      store,
    });

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
    const wrapper = mount(Component, {
      localVue,
      store,
    });

    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "No",
        }),
      ])
    );
  });

  it("returns an array containing country", async () => {
    const wrapper = mount(Component, {
      localVue,
      store,
    });

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
    const wrapper = mount(Component, {
      localVue,
      store,
    });

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
    const wrapper = mount(Component, {
      localVue,
      store,
    });

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
    const wrapper = mount(Component, {
      localVue,
      store,
    });

    const result = wrapper.vm.moveInfoTableData;

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          value: "A8V 8V8",
        }),
      ])
    );
  });
});
