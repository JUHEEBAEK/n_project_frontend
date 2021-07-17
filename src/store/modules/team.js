import {
  createTeam,
  getAllTeam,
  getUnitTeamList,
  getTeamInfo
} from "../../api/team.js";

import {
  createUnitTeam,
  updateUnitTeam,
  deleteUnitTeam
} from "../../api/unitTeam.js";

import { set } from "../../utils/index";
import * as constants from "../constants";

const state = {
  teamList: [],
  teamInfo: {},
  teamType: "Team",
  unitTeamList: [],
  unitTeamInfo: {}
};

const getters = {};
const mutations = {
  [constants.setTeamType]: set("teamType"),
  SELECT_ALL_TEAM(state, teamList) {
    state.teamList = teamList;
  },
  SELECT_UNIT_TEAM(state, unitTeamList) {
    state.unitTeamList = unitTeamList;
  },
  UPDATE_UNIT_TEAM(state, unitTeamInfo) {
    state.unitTeamInfo = unitTeamInfo;
  },
  GET_INFO_TEAM(state, teamInfo) {
    state.teamInfo = teamInfo;
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
  async select_all_team({ commit }) {
    try {
      const response = await getAllTeam();
      commit("SELECT_ALL_TEAM", response);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async select_unit_team({ commit }) {
    try {
      const response = await getUnitTeamList();
      commit("SELECT_UNIT_TEAM", response);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async update_unit_team({ commit }, payload) {
    try {
      const response = await updateUnitTeam(payload);
      commit("UPDATE_UNIT_TEAM", response);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async delete_unit_team({ commit }, payload) {
    try {
      const response = await deleteUnitTeam(payload);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async details_team({ commit }, payload) {
    try {
      const response = await getTeamInfo(payload);
      commit("GET_INFO_TEAM", response.data);
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
