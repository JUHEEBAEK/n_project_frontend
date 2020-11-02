import {
  createUnitTeamMember,
  getUnitTeamMember,
  getAllUnitMember
} from "../../api/unitMember.js";

const state = {
  unitTeamPlayerList: [],
  allUnitMemberList: [],
};

const getters = {};
const mutations = {
  SELECT_UNIT_TEAM_MEMBER(state, memberList){
    state.unitTeamPlayerList = memberList;
  },
  SELECT_ALL_UNIT_MEMBER(state, unitMemberList){
    state.allUnitMemberList = unitMemberList;
  }
};
const actions = {
  async add_unit_member(context, form) {
    try {
      const response = await createUnitTeamMember(form);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async select_all_unit_member({
    commit
  }) {
    try {
      const response = await getAllUnitMember();
      commit("SELECT_ALL_UNIT_MEMBER", response);
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
      commit("SELECT_UNIT_TEAM_MEMBER", response);
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