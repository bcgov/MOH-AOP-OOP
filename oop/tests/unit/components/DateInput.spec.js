import { mount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vue from 'vue';
import Vuelidate from 'vuelidate';
import Component from '@/components/DateInput.vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {  faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faCalendarAlt);

const localVue = createLocalVue();
localVue.use(Vuex);
Vue.use(Vuelidate);
Vue.component('font-awesome-icon', FontAwesomeIcon);

describe('DateInput.vue', () => {
  it('renders', () => {
    const wrapper = mount(Component, {
      localVue,
    });
    expect(wrapper.element).toBeDefined();
  });
});

describe('DateInput canCreateDate()', () => {
  const wrapper = mount(Component, {
    localVue,
  });

  test('null entries return false', async () => {
    await wrapper.setData({ 
      month: null,
      day: null,
      year: null, 
    })
    expect(wrapper.vm.canCreateDate()).toBeFalsy()
  });

  test('works on happy path', async () => {
    await wrapper.setData({ 
      month: '7',
      day: '31',
      year: '2022', 
    })
    expect(wrapper.vm.canCreateDate()).toBeTruthy()
  });

  test('null month returns false', async () => {
    await wrapper.setData({ 
      month: null,
      day: '31',
      year: '2022', 
    })
    expect(wrapper.vm.canCreateDate()).toBeFalsy()
  });

  test('non-string/number month returns false', async () => {
    await wrapper.setData({ 
      month: [555, "potato", {index: "value"}],
      day: '31',
      year: '2022', 
    })
    expect(wrapper.vm.canCreateDate()).toBeFalsy()
  });

  test('month with index of 0 returns true (maps to January)', async () => {
    await wrapper.setData({ 
      month: 0,
      day: '31',
      year: '2022', 
    })
    expect(wrapper.vm.canCreateDate()).toBeTruthy()
  });

  test('day with index of 0 returns false', async () => {
    await wrapper.setData({ 
      month: '12',
      day: 0,
      year: '2022', 
    })
    expect(wrapper.vm.canCreateDate()).toBeFalsy()
    
    
  });

  test('non-string/number day returns false', async () => {
    await wrapper.setData({ 
      month: '12',
      day: [555, "potato", {index: "value"}],
      year: '2022', 
    })
    expect(wrapper.vm.canCreateDate()).toBeFalsy()
    // expect(wrapper.vm.canCreateDate()).toBeTruthy()
  });

  test('non-string/number year returns false', async () => {
    await wrapper.setData({ 
      month: '12',
      day: '31',
      year: [555, "potato", {index: "value"}], 
    })
    expect(wrapper.vm.canCreateDate()).toBeFalsy()
    // expect(wrapper.vm.canCreateDate()).toBeTruthy()
  });

  test('feb 29 in non leap year returns false', async () => {
    await wrapper.setData({ 
      //0 is January, so 1 is February
      month: '1',
      day: '29',
      year: '2021', 
    })
    expect(wrapper.vm.canCreateDate()).toBeFalsy()  
  });

  test('feb 29 in leap year returns true', async () => {
    await wrapper.setData({ 
      //0 is January, so 1 is February
      month: '1',
      day: '29',
      year: '2024', 
    })
    expect(wrapper.vm.canCreateDate()).toBeTruthy()
  });

  test('incorrect days in month returns false', async () => {
    await wrapper.setData({ 
      //0 is January, so 1 is February
      month: '1',
      day: '30',
      year: '2021', 
    })
    expect(wrapper.vm.canCreateDate()).toBeFalsy()
    // expect(wrapper.vm.canCreateDate()).toBeTruthy()
  });

  

})

describe('DateInput processDate()', () => {
  const wrapper = mount(Component, {
    localVue,
  });

  test('invalid entry emits falsy values', async () => {
    await wrapper.setData({ 
      month: null,
      day: null,
      year: null, 
    });
    await wrapper.vm.processDate();
    expect(wrapper.vm.month).toBeFalsy()
    expect(wrapper.vm.day).toBeFalsy()
    expect(wrapper.vm.year).toBeFalsy()
    expect(wrapper.emitted().input).toEqual([[undefined], [undefined]])
  });

  test('valid entry emits correct values', async () => {
    await wrapper.setData({ 
      month: '1',
      day: '22',
      year: '2022', 
    });
    await wrapper.vm.processDate();
    expect(wrapper.vm.month).toBeTruthy()
    expect(wrapper.vm.day).toBeTruthy()
    expect(wrapper.vm.year).toBeTruthy()
    expect(wrapper.emitted().input.length).toBeGreaterThan(2)
    //the input array should be greater than 2 because it now contains the timestamp info just set
  });

});

describe ('DateInput openCloseDatePicker()', () => {
  const wrapper = mount(Component, {
    localVue
  });
  

  test('function properly swaps isDatePickerOpen prop between true and false', async () => {
    const fakeEvent={target: {value: "potato"}, stopPropagation: jest.fn()};
    await wrapper.setProps({ isDatePickerOpen: false })
    await wrapper.vm.openCloseDatePicker(fakeEvent);
    expect(wrapper.vm.isDatePickerOpen).toBeTruthy();

    await wrapper.setProps({ isDatePickerOpen: true })
    await wrapper.vm.openCloseDatePicker(fakeEvent);
    expect(wrapper.vm.isDatePickerOpen).toBeFalsy();
    
  });

  
});