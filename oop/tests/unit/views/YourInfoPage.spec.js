import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import YourInfoPage from '@/views/YourInfoPage.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

describe('YourInfoPage.vue', () => {
  let state;
  let store;

  beforeEach(() => {
    state ={
      lastName: null,
      phn: null,
      email: null,
      phone: null,
    };    

    store = new Vuex.Store({
      modules: {
        form: {
          state,
          namespaced: true,
        }
      }
    });
  });
  it('renders', () => {
    const wrapper = shallowMount(YourInfoPage, {
      store,
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});
