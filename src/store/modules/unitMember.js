import {
  createUnitTeamMember,
  getUnitTeamMember
} from "../../api/unitMember.js";

const state = {
  unitTeamPlayerList: [],
};

const getters = {};
const mutations = {
  SELECT_UNiT_TEAM_MEMBER(state, teamList){
    state.unitTeamPlayerList = teamList;
  }
};
const actions = {
  async add_unit_team_player(context, form) {
    try {
      const response = await createUnitTeamMember(form);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async select_unit_team_member({
    commit
  }, unitTeamId) {
    try {
      const response = await getUnitTeamMember(unitTeamId);
      commit("SELECT_UNiT_TEAM_MEMBER", response);
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