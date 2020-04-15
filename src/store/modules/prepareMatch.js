import {set} from "../../utils/index";
import * as constants from "../constants";

import moment from "moment";

const state = {
  date: moment().format("YYYY-MM-DD"),
  quarterList: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6"],
  quarterIndex: 0,
  isHome: true,
  selectType: "Home",
  homeTeam: {},
  awayTeam: {},
  teamList: []
};

const getters = {

};

const mutations = {
  [constants.setDate]: set("date"),
  [constants.setHomeTeam]: set("homeTeam"),
  [constants.setAwayTeam]: set("awayTeam"),
  [constants.setIsHome]: set("isHome"),
  [constants.setType]: set("selectType"),
  [constants.quarterIndex]: set("quarterIndex"),
  
};

const actions = {

};


export default {
  state,
  getters,
  mutations,
  actions
};