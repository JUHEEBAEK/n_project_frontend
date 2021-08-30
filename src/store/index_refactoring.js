import Vue from "vue";
import Vuex from "vuex";

import global from "./modules_refactoring/global";
import account from "./modules_refactoring/account";
import member from "./modules_refactoring/member";
import team from "./modules_refactoring/team";
import stadium from "./modules_refactoring/stadium";

import vuexRouterSync from "./plugins/vuexRouterSync";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    account,
    member,
    stadium,
    team
  },
  plugins: [vuexRouterSync]
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
});
