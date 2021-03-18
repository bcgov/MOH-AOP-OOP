import Vue from 'vue';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import router from './router';
import store from './store';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft,
  faArrowRight,
  faCalendarAlt,
  faCheckCircle,
  faPencilAlt,
  faPrint,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'core-js/es/number';

library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faCalendarAlt);
library.add(faCheckCircle);
library.add(faPencilAlt);
library.add(faPrint);
library.add(faTimesCircle);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
