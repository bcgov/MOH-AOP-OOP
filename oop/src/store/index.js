import { createStore } from "vuex";
import app from "./modules/app";
import form from "./modules/form";

export default createStore({
  modules: {
    app,
    form,
  },
});
