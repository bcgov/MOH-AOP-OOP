import Vuex from 'vuex';
import app from './modules/app';
import form from './modules/form';

export default new Vuex.Store({
  modules: {
    app,
    form
  }
});
