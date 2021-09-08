import Vue from "vue";
import Vuex from "vuex";

import global from "./modules_refactoring/global";
import account from "./modules_refactoring/account";
import attend from "./modules_refactoring/attend";
import calendar from "./modules_refactoring/calendar";
import common from "./modules_refactoring/common";
import game from "./modules_refactoring/game";
import gameReport from "./modules_refactoring/gameReport";
import member from "./modules_refactoring/member";
import personal from "./modules_refactoring/personal";
import prepareMatch from "./modules_refactoring/prepareMatch";
import ranking from "./modules_refactoring/ranking";
import squad from "./modules_refactoring/squad";
import stadium from "./modules_refactoring/stadium";
import team from "./modules_refactoring/team";
import unitMember from "./modules_refactoring/unitMember";

import vuexRouterSync from "./plugins/vuexRouterSync";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    account,
    attend,
    calendar,
    common,
    game,
    gameReport,
    member,
    personal,
    prepareMatch,
    ranking,
    squad,
    stadium,
    team,
    unitMember
  },
  plugins: [vuexRouterSync]
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
});
