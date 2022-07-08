import { mount } from '@vue/test-utils';
import Confirmation from '../../src/views/Confirmation.vue';
import { createStore } from 'vuex';
import router from '../../src/router/index';
import store from '../../src/store/index';

const testStore = createStore({
  ...store
});

describe('Confirmation.vue', () => {
  // This is a Shallow Mount as opposed to a regular mount because this test only checks for rendering
  it('renders', () => {
    const wrapper = mount(Confirmation, {
    global: {
      plugins: [router, testStore]
    }});
    expect(wrapper.element).toBeDefined();
  });
});