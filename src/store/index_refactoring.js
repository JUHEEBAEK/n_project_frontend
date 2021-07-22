import Vue from "vue";
import Vuex from "vuex";

// import global from "./modules_refactoring/global";
// import account from "./modules_refactoring/account";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // global
    // account
  }
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
});
