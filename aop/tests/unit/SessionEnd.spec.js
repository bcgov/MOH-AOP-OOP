import { mount } from '@vue/test-utils';
import SessionEnd from '../../src/views/SessionEnd.vue';
import { createStore } from 'vuex';
import router from '../../src/router/index';
import store from '../../src/store/index';

const testStore = createStore({
  ...store
});

describe('SessionEnd.vue', () => {
  // This is a Shallow Mount as opposed to a regular mount because this test only checks for rendering
  it('renders', () => {
    const wrapper = mount(SessionEnd, {
    global: {
      plugins: [router, testStore]
    }});
    expect(wrapper.element).toBeDefined();
  });
});