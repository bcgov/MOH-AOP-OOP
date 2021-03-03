import App from "./App.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import router from "./router";
import store from "./store";
import IdleVue from 'idle-vue';
 
const eventsHub = new Vue();

Vue.config.productionTip = false;

Vue.use(IdleVue, {
  eventEmitter: eventsHub,
  idleTime: 60000,
  store
});
Vue.use(VueRouter);
Vue.use(Vuelidate);

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
