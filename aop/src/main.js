import App from "./App.vue";
import Vue from "vue";
import VueRouter from "vue-router";
import Vuelidate from "vuelidate";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(Vuelidate);

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
