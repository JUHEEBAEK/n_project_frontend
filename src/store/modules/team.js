import {
  getTeamList
} from "../../api/team.js";

const state = {
  teamList: []
};

const getters = {};
const mutations = {
  SELECT_TEAM(state, teamList){
    state.teamList = teamList;
    state.searchResult = teamList;
  }
};

const actions = {
  async select_team({
    commit
  }) {
    try {
      const response = await getTeamList();
      commit("SELECT_TEAM", response.data);
      return response;
    } catch (e) {
      console.log("error", e);
    }
  }
  
};

export default {
  state,
  getters,
  mutations,
  actions
};