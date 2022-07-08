import App from "./App.vue";
import { createApp } from 'vue';
import router from "./router";
import store from "./store";
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowLeft,
  faArrowRight,
  faCalendarAlt,
  faCheckCircle,
  faPencilAlt,
  faPrint,
  faTimesCircle,
  faTimes,
  faInfoCircle,
  faSignOutAlt,
  faChevronDown,
  faChevronUp
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';


// Font awesome config
library.add(faArrowLeft);
library.add(faArrowRight);
library.add(faCalendarAlt);
library.add(faCheckCircle);
library.add(faPencilAlt);
library.add(faPrint);
library.add(faTimesCircle);
library.add(faTimes);
library.add(faInfoCircle);
library.add(faSignOutAlt);
library.add(faChevronDown);
library.add(faChevronUp);

const app = createApp({
  router,
  ...App,
})

app
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount('#app');
