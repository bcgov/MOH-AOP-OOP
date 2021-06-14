import { mount, createLocalVue } from '@vue/test-utils';
import axios from 'axios';
import Vuex from 'vuex';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Component from '@/components/AddressValidator.vue';

const mockAddressResponse = {"Address":
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
}

jest.mock('axios', () => ({
  get: jest.fn()
}));

// jest.mock('axios', () => ({
//   // get: jest.fn(() => mockAddressResponse)
//   get: jest.fn((_url, _body) => { 
//     return new Promise((resolve) => {
//       url = _url;
//       body = _body;
//       resolve({ data: {moskData: mockAddressResponse}});
//     });
//   })
// }))


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

    const result = wrapper.vm.processResponse(mockAddressResponse);
    expect(result).toEqual([{"addressLines": ["716 YATES DR"], "city": "MILTON", "country": "Canada", "fullAddress": "716 YATES DR MILTON ON L9T 7R5", "postalCode": "L9T 7R5", "province": "ON"}]
    );
  });
});

describe('AddressValidator.vue lookup()', () => {
  xit('returns a falsy value when not given data', async () => {
    const wrapper = mount(Component, {
      localVue,  propsData: {
        id: "address-line-1"
      }
    });
    const result = wrapper.vm.lookup("");
    expect(result).toBeFalsy()
  });

  xit('returns a truthy value when given data', async () => {
    // const res = { data: {testData: 'TEST_DATA'}};
    const query = '716 Yates';
    const wrapper = mount(Component, {
      localVue,  propsData: {
        id: "address-line-1"
      }, 
    });
    
    
    await wrapper.setData({
        data: []
    })
    axios.get.mockImplementationOnce(() => Promise.resolve(mockAddressResponse));
    await wrapper.vm.lookup(query)


    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.data).not.toEqual([]);
      done()
    })
    
    // await expect(wrapper.vm.lookup(query)).resolves.toEqual(res.data);
    // await flushPromises();
    // console.log(await wrapper.vm.lookup(query), "********************POTATO" )
    // axios.get.mockImplementation(() => Promise.resolve("Success"));
    // await expect(wrapper.vm.lookup(query)).resolves.toEqual("Third thing");
    // expect(wrapper.vm.lookup(query)).toHaveBeenCalledTimes(1)
  });
});
