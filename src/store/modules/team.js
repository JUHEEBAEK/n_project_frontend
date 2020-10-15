import {
  getTeamList,
  getAllTeam
} from "../../api/team.js";

const state = {
  teamList: []
};

const getters = {};
const mutations = {
  SELECT_ALL_TEAM(state, teamList){
    state.teamList = teamList;
    state.searchResult = teamList;
  }
};

const actions = {
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
};

export default {
  state,
  getters,
  mutations,
  actions
};