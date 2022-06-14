import { createApp } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import Vuex from 'vuex';
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
  faChevronLeft,
  faChevronRight,
  faChevronUp,
  faPencilAlt,
  faPrint,
  faTimesCircle,
  faInfoCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'core-js/es/number'; // IE polyfill for `Number.isNaN()`.
import { isIE } from './helpers/user-agent';

library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faCalendarAlt);
library.add(faCheckCircle);
library.add(faChevronDown);
library.add(faChevronLeft);
library.add(faChevronRight);
library.add(faChevronUp);
library.add(faPencilAlt);
library.add(faPrint);
library.add(faTimesCircle);
library.add(faInfoCircle);

// Add 'ie' class name when is IE browser.
if (isIE()) {
  document.body.classList.add('ie');
}

const app = createApp(App)
  .use(store)
  .use(router)
  .use(useVuelidate)
  .use(Vuex)
app.mount('#app')

app.component('font-awesome-icon', FontAwesomeIcon)
