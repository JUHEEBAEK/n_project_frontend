import Vue from "vue";
import Vuex from "vuex";

import global from "./modules_refactoring/global";
import account from "./modules_refactoring/account";
import calendar from "./modules_refactoring/calendar";
import member from "./modules_refactoring/member";
import team from "./modules_refactoring/team";
import stadium from "./modules_refactoring/stadium";
import ranking from "./modules_refactoring/ranking";
import game from "./modules_refactoring/game";
import gameReport from "./modules_refactoring/gameReport";

import vuexRouterSync from "./plugins/vuexRouterSync";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    account,
    calendar,
    game,
    gameReport,
    member,
    ranking,
    stadium,
    team
  },
  plugins: [vuexRouterSync]
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
});
