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
  it('changes selected dropdown when the down button is pressed', async () => {
    const wrapper = mount(Component, {
      localVue,  propsData: {
        id: "address-line-1"
      }, data() {
        return {
          data: ["default0", "default1", "default2", "default3"],
          selectedItemIndex: null
        }
      }
    });
    const spyOnInputHandler = jest.spyOn(wrapper.vm, 'inputKeyDownHandler')
    expect(wrapper.vm.selectedItemIndex).toEqual(null);

    const fakeEvent={target: {value: "potato"}, keyCode: 40}; //Down Arrow
    wrapper.vm.inputKeyDownHandler(fakeEvent)
    //the following code doesn't actually get picked up by the inputKeyDownHandler for some reason
    //if future refactoring can get this to work instead of manually calling the function w/ the fake event each time
    //that would probably be for the best
    // await wrapper.trigger("keydown", {key: "ArrowDown"})
    // var event = new KeyboardEvent('keydown', {'keyCode': 37});
    // await document.dispatchEvent(event);

    //0
    expect(spyOnInputHandler).toHaveBeenCalled()
    expect(wrapper.vm.selectedItemIndex).toEqual(0);
    expect(wrapper.vm.data[wrapper.vm.selectedItemIndex]).toEqual("default0");

    //1
    wrapper.vm.inputKeyDownHandler(fakeEvent)
    expect(spyOnInputHandler).toHaveBeenCalled()
    expect(wrapper.vm.selectedItemIndex).toEqual(1);
    expect(wrapper.vm.data[wrapper.vm.selectedItemIndex]).toEqual("default1");

    //2
    wrapper.vm.inputKeyDownHandler(fakeEvent)
    expect(spyOnInputHandler).toHaveBeenCalled()
    expect(wrapper.vm.selectedItemIndex).toEqual(2);
    expect(wrapper.vm.data[wrapper.vm.selectedItemIndex]).toEqual("default2");

    //3
    wrapper.vm.inputKeyDownHandler(fakeEvent)
    expect(spyOnInputHandler).toHaveBeenCalled()
    expect(wrapper.vm.selectedItemIndex).toEqual(3);
    expect(wrapper.vm.data[wrapper.vm.selectedItemIndex]).toEqual("default3");

    //wrap back around to 0
    wrapper.vm.inputKeyDownHandler(fakeEvent)
    expect(spyOnInputHandler).toHaveBeenCalled()
    expect(wrapper.vm.selectedItemIndex).toEqual(0);
    expect(wrapper.vm.data[wrapper.vm.selectedItemIndex]).toEqual("default0");

  });

  it('changes selected dropdown when the up button is pressed', async () => {
    const wrapper = mount(Component, {
      localVue,  propsData: {
        id: "address-line-1"
      }, data() {
        return {
          data: ["default0", "default1", "default2", "default3"],
          selectedItemIndex: null
        }
      }
    });
    expect(wrapper.vm.selectedItemIndex).toEqual(null);
    
    const spyOnInputHandler = jest.spyOn(wrapper.vm, 'inputKeyDownHandler')
    const fakeEvent={target: {value: "potato"}, keyCode: 38}; //Up Arrow
    wrapper.vm.inputKeyDownHandler(fakeEvent)
    //the following code doesn't actually get picked up by the inputKeyDownHandler for some reason
    //if future refactoring can get this to work instead of manually calling the function w/ the fake event each time
    //that would probably be for the best
    // await wrapper.trigger("keydown", {key: "ArrowDown"})
    // var event = new KeyboardEvent('keydown', {'keyCode': 37});
    // await document.dispatchEvent(event);

    //3
    expect(spyOnInputHandler).toHaveBeenCalled()
    expect(wrapper.vm.selectedItemIndex).toEqual(3);
    expect(wrapper.vm.data[wrapper.vm.selectedItemIndex]).toEqual("default3");

    //2
    wrapper.vm.inputKeyDownHandler(fakeEvent)
    expect(spyOnInputHandler).toHaveBeenCalled()
    expect(wrapper.vm.selectedItemIndex).toEqual(2);
    expect(wrapper.vm.data[wrapper.vm.selectedItemIndex]).toEqual("default2");

    //1
    wrapper.vm.inputKeyDownHandler(fakeEvent)
    expect(spyOnInputHandler).toHaveBeenCalled()
    expect(wrapper.vm.selectedItemIndex).toEqual(1);
    expect(wrapper.vm.data[wrapper.vm.selectedItemIndex]).toEqual("default1");

    //0
    wrapper.vm.inputKeyDownHandler(fakeEvent)
    expect(spyOnInputHandler).toHaveBeenCalled()
    expect(wrapper.vm.selectedItemIndex).toEqual(0);
    expect(wrapper.vm.data[wrapper.vm.selectedItemIndex]).toEqual("default0");

    //wrap back around to 3
    wrapper.vm.inputKeyDownHandler(fakeEvent)
    expect(spyOnInputHandler).toHaveBeenCalled()
    expect(wrapper.vm.selectedItemIndex).toEqual(3);
    expect(wrapper.vm.data[wrapper.vm.selectedItemIndex]).toEqual("default3");

  });

  it('clears the data when the escape button is pressed', async () => {
    const wrapper = mount(Component, {
      localVue,  propsData: {
        id: "address-line-1"
      }, data() {
        return {
          data: ["default0", "default1", "default2", "default3"],
          selectedItemIndex: "default value"
        }
      }
    });
    const spyOnInputHandler = jest.spyOn(wrapper.vm, 'inputKeyDownHandler')
    const fakeEvent={target: {value: "potato"}, keyCode: 27}; //Escape key

    //Before function
    expect(wrapper.vm.selectedItemIndex).toEqual("default value");
    expect(wrapper.vm.data).toEqual(["default0", "default1", "default2", "default3"]);

    wrapper.vm.inputKeyDownHandler(fakeEvent)

    //After function
    expect(spyOnInputHandler).toHaveBeenCalled()
    expect(wrapper.vm.selectedItemIndex).toEqual(null);
    expect(wrapper.vm.data).toEqual([]);

  });
});
