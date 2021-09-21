export const state = {
  unitTeamMembers: [],
  allUnitMembers: []
};

export const getters = {
  unitTeamMembers(state) {
    return state.unitTeamMembers;
  },
  allUnitMembers(state) {
    return state.allUnitMembers;
  }
};
const mutations = {
  SELECT_UNIT_TEAM_MEMBERS(state, list) {
    state.unitTeamMembers = list;
  },
  SELECT_ALL_UNIT_MEMBERS(state, list) {
    state.allUnitMembers = list;
  }
};

export const actions = {
  async createUnitMember({ dispatch, rootGetters }, form) {
    const { unit_team_id } = form;
    const apiClient = rootGetters["global/apiClient"];
    const { success, error } = await apiClient.unitMember.createUnitTeamMember(form);
    if (success) {
      dispatch("apiSuccessHandler", { message: "성공적으로 유닛 선수를 등록했습니다." }, { root: true });
      dispatch("getUnitTeamMember", unit_team_id);
      return true;
    } else if (error) {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async getAllUnitMemberList({ commit, dispatch, rootGetters }) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, response, error } = await apiClient.unitMember.getAllUnitMember();
    if (success) {
      commit("SELECT_ALL_UNIT_MEMBERS", response.data);
    } else if (error) {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async getUnitTeamMember({ commit, dispatch, rootGetters }, unitTeamId) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, response, error } = await apiClient.unitMember.getUnitTeamMember(unitTeamId);

    if (success) {
      commit("SELECT_UNIT_TEAM_MEMBERS", response.data);
    } else if (error) {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async deleteUnitMember({ dispatch, rootGetters }, member) {
    const apiClient = rootGetters["global/apiClient"];
    const { id_unit_member, unit_team_id } = member;
    console.log(id_unit_member, unit_team_id);
    const { success, error } = await apiClient.unitMember.deleteUnitTeamMember(id_unit_member);

    if (success) {
      dispatch("apiSuccessHandler", { message: "성공적으로 유닛선수가 삭제되었습니다." }, { root: true });
      dispatch("getUnitTeamMember", unit_team_id);
      return true;
    } else if (error) {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
