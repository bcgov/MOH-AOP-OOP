import Vue from 'vue';
import Vuex from 'vuex';
import enrolment from './modules/enrolment';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    enrolment
  }
});
