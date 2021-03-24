import App from "./App.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import router from "./router";
import store from "./store";
import IdleVue from 'idle-vue';
import VueAnnouncer from '@vue-a11y/announcer';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft,
  faArrowRight,
  faCalendarAlt,
  faCheckCircle,
  faPencilAlt,
  faPrint,
  faTimesCircle,
  faInfoCircle,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { isIE } from './helpers/user-agent';

// Font awesome config
library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faCalendarAlt);
library.add(faCheckCircle);
library.add(faPencilAlt);
library.add(faPrint);
library.add(faTimesCircle);
library.add(faInfoCircle);
library.add(faSignOutAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);
if (isIE()) {
  document.body.classList.add('ie');
}

// Idle Vue config
const eventsHub = new Vue();
Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 60000,
  store
});

// For a11y, reads new page titles on change
Vue.use(VueAnnouncer, {}, router);

Vue.config.productionTip = false;

Vue.use(VueRouter);

Vue.use(Vuelidate);

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
