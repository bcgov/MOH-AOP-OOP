import { mount, createLocalVue } from '@vue/test-utils';
import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Component from '@/components/AddressValidator.vue';

const mockAddressResponse = {data: {"Address":
[{"Organization":"",
"Contact":"",
"Building":"",
"SubBuilding":"",
"Street":"YATES DR",
"HouseNumber":"716",
"DeliveryService":"",
"Locality":"MILTON",
"PostalCode":"L9T 7R5",
"Province":"ON",
"Country":"CANADA",
"Residue":"",
"DeliveryAddressLines":"716 YATES DR",
"AddressLines":["716 YATES DR"],
"AddressComplete":"716 YATES DR MILTON ON L9T 7R5"}],
}}

const mockAddressError = {data: {}}

jest.mock('axios', () => ({
  get: jest.fn()
}));

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

describe('AddressValidator.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,  propsData: {
        id: "address-line-1"
      }
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe('AddressValidator.vue processResponse()', () => {
  it ('should format API response into a specific format', () => {
    const wrapper = mount(Component, {
      localVue,  propsData: {
        id: "address-line-1"
      }
    });

    const result = wrapper.vm.processResponse(mockAddressResponse.data);
    expect(result).toEqual([{"addressLines": ["716 YATES DR"], "city": "MILTON", "country": "Canada", "fullAddress": "716 YATES DR MILTON ON L9T 7R5", "postalCode": "L9T 7R5", "province": "ON"}]
    );
  });
});

describe('AddressValidator.vue lookup()', () => {
  it('returns an empty array when not given a proper query', async () => {
    const query = 'asdfgjkl;';
    const wrapper = mount(Component, {
      localVue,  propsData: {
        id: "address-line-1"
      }, 
    });

    axios.get.mockImplementationOnce(() => Promise.resolve(mockAddressError));
    await wrapper.vm.lookup(query)

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.data).toEqual([]);
    })
  });

  it('short circuits and returns an empty array when not given a query at all', async () => {
    const query = '';
    const wrapper = mount(Component, {
      localVue,  propsData: {
        id: "address-line-1"
      }, 
    });

    await wrapper.vm.lookup(query)

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.data).toEqual([]);
    })
  });

  it('returns formatted data when given a proper query', async () => {
    const query = '716 Yates';
    const wrapper = mount(Component, {
      localVue,  propsData: {
        id: "address-line-1"
      }, 
    });

    axios.get.mockImplementationOnce(() => Promise.resolve(mockAddressResponse));
    await wrapper.vm.lookup(query)

    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.data).not.toEqual([]);
    })
  });
});

describe('AddressValidator.vue inputKeyDownHandler()',  () => {
  it('changes selected dropdown on key events', async () => {
    const wrapper = mount(Component, {
      localVue,  propsData: {
        id: "address-line-1"
      }, data() {
        return {
          data: ["default"]
        }
      }
    });

    // await wrapper.setData({ foo: 'bar' })
    expect(wrapper.vm.data).toEqual([]);
  });
});
