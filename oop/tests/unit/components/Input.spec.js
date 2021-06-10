import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Component from '@/components/Input.vue';

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);

describe('TextArea.vue', () => {
//This is a Shallow Mount as opposed to a regular mount because this test only checks for rendering
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
  it('emits input correctly through built in method', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    const fakeEvent={target: {value: "potato"}};
    wrapper.vm.emitInput(fakeEvent);
    // wrapper.vm.$emit('foo');
    expect(wrapper.emitted().input).toBeTruthy()
    expect(wrapper.emitted().input).toEqual([["potato"]]
    )
  });
});