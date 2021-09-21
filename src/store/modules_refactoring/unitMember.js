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
    const apiClient = rootGetters["global/apiClient"];
    const { success, error } = await apiClient.unitMember.createUnitTeamMember(form);
    if (success) {
      dispatch("apiSuccessHandler", { message: "성공적으로 유닛 선수를 등록했습니다." }, { root: true });
      return true;
    } else if (error) {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async getAllUnitTeamMemberList({ commit, dispatch, rootGetters }) {
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
  async deleteUnitMember({ dispatch, rootGetters }, formData) {
    const apiClient = rootGetters["global/apiClient"];

    const { success, error } = await apiClient.unitMember.deleteUnitTeamMember(formData);
    if (success) {
      dispatch("apiSuccessHandler", { message: "성공적으로 유닛선수가 삭제되었습니다." }, { root: true });

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
