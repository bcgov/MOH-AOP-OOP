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
  const wrapper = mount(Component)

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

  test('invalid month number returns false', async () => {
    await wrapper.setData({ 
      month: 13,
      day: '31',
      year: '2022', 
    })
    expect(wrapper.vm.canCreateDate()).toBeFalsy()
  });

  test('invalid day number returns false', async () => {
    await wrapper.setData({ 
      month: '12',
      day: '31',
      year: '2022', 
    })
    expect(wrapper.vm.canCreateDate()).toBeFalsy()
    // expect(wrapper.vm.canCreateDate()).toBeTruthy()
  });

})

/*
    canCreateDate() {
      // special because "0" is valid (Jan)
      const isMonthValid = (typeof this.month === 'string' && this.month !== 'null')
        || typeof this.month === 'number';

      const day = parseInt(this.day);
      // If the user puts '0' as the day, return invalid
      if (day === 0){
        return false;
      }
      const daysInMonth = getDaysInMonth(new Date(this.year, this.month, 2));
      const isDateValid = day <= daysInMonth;
      if (!!this.year && !!this.day && isMonthValid && isDateValid) {
        return true;
      }
      return false;
    },
*/