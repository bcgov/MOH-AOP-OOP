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
  faChevronDown,
  faChevronUp,
  faPencilAlt,
  faPrint,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'core-js/es/number'; // IE polyfill for `Number.isNaN()`.
import { isIE } from './helpers/user-agent';

library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faCalendarAlt);
library.add(faCheckCircle);
library.add(faChevronDown);
library.add(faChevronUp);
library.add(faPencilAlt);
library.add(faPrint);
library.add(faTimesCircle);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(Vuelidate);

Vue.config.productionTip = false;

// Add 'ie' class name when is IE browser.
if (isIE()) {
  document.body.classList.add('ie');
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
