import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Component from '@/components/AddressValidator.vue';
jest.mock('axios')

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

describe('AddressValidator.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe('AddressValidator.vue lookup()', () => {
  it('returns a falsy value when not given data', async () => {
    const wrapper = mount(Component, {
      localVue,  propsData: {
        id: "address-line-1"
      }
    });
    const result = wrapper.vm.lookup("");
    expect(result).toBeFalsy()
  });
});