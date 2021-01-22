import Vue from 'vue';
import Vuex from 'vuex';
import aop from './modules/aop';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    aop
  }
});
