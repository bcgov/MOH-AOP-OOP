import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
// import VueRouter from "vue-router";
import Component from "@/views/MoveInfoPage.vue";
// import spaEnvService from "@/services/spa-env-service";
import pageStateService from "@/services/page-state-service";
import formTemplate from "@/store/modules/form";

const localVue = createLocalVue();
localVue.use(Vuex);

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

// const stateTemplate  = {
//   applicationUuid: null,
//   captchaToken: null,
//   lastName: null,
//   phn: null,
//   phone: null,
//   moveFromBCDate: null,
//   arriveDestinationDate: null,
//   isNewAddressKnown: null,
//   country: null,
//   addressLines: [],
//   province: null,
//   city: null,
//   postalCode: null,
//   accountType: null,
//   personMoving: null,
//   isAllDependentsMoving: null,
//   dependentPhns: [],
//   submissionDate: null,
//   referenceNumber: null,
//   submissionResponse: null,
//   submissionError: null,
// }
// Vue.use(Vuelidate);

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
          state: {
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
          },
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
        return {
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
        }
      },
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe.skip("MoveInfoPage.vue addAddressField", () => {
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

  it.skip("adds a line to the addressLines array in data", async () => {
    const wrapper = shallowMount(Component, {
      localVue,
      store,
      data: () => dataTemplate,
    });

    expect(wrapper.vm.addressLines).toEqual([]);

    wrapper.vm.addAddressField();
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.addressLines).toHaveLength(1);
  });
});
