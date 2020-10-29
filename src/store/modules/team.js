import {
  createTeam,
  getAllTeam,
  getUnitTeamList
} from "../../api/team.js";

import {
  createUnitTeam
} from "../../api/unitTeam.js";

import { set } from "../../utils/index";
import * as constants from "../constants";

const state = {
  teamList: [],
  unitTeamList: [],
  searchTeamResult: [],
  searchUnitTeamResult: [],
};

const getters = {};
const mutations = {
  [constants.setSearchTeamResult]: set("searchTeamResult"),
  [constants.setSearchUnitTeamResult]: set("searchUnitTeamResult"),
  SELECT_ALL_TEAM(state, teamList){
    state.teamList = teamList;
    state.searchTeamResult = teamList;
  },
  SELECT_UNIT_TEAM(state, unitTeamList){
    state.unitTeamList = unitTeamList;
    state.searchUnitTeamResult = unitTeamList;
  }
};
const actions = {
  async add_team(context, form) {
    try {
      const response = await createTeam(form);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async add_unit_team(context, form) {
    try {
      const response = await createUnitTeam(form);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async select_all_team({
    commit
  }) {
    try {
      const response = await getAllTeam();
      commit("SELECT_ALL_TEAM", response);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async select_unit_team({
    commit
  }) {
    try {
      const response = await getUnitTeamList();
      commit("SELECT_UNIT_TEAM", response);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};