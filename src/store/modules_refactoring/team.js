export const state = () => ({
  teamList: [],
  teamInfo: {},
  teamType: "Team"
});

export const getters = {
  teamList(state) {
    return state.teamList;
  },
  teamInfo(state) {
    return state.teamInfo;
  },
  teamType(state) {
    return state.teamType;
  }
};

const mutations = {
  SET_TEAM_LIST(state, list) {
    state.teamList = list;
  },
  SET_TEAM_INFO(state, info) {
    state.teamInfo = info;
  },
  SET_TEAM_TYPE(state, teamType) {
    state.teamType = teamType;
  }
};
const actions = {
  async createTeam({ dispatch, rootGetters }, form) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error } = await apiClient.team.createTeam(form);
    if (success) {
      dispatch("apiSuccessHandler", { message: "성공적으로 팀이 등록되었습니다." }, { root: true });
      dispatch("getTeamList");
    } else if (error) {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async getTeamList({ commit, dispatch, rootGetters }) {
    const apiClient = rootGetters["global/apiClient"];

    const { success, response, error } = await apiClient.team.getAllTeam();
    if (success) {
      commit("SET_TEAM_LIST", response.data);
    } else if (error) {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async getTeamInfo({ commit, dispatch, rootGetters }, idfTeam) {
    const apiClient = rootGetters["global/apiClient"];

    const { success, response, error } = await apiClient.team.getTeamInfo(idfTeam);
    if (success) {
      commit("SET_TEAM_INFO", response.data);
    } else if (error) {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async updateTeam({ dispatch, rootGetters }, formData) {
    const apiClient = rootGetters["global/apiClient"];

    const { success, error } = await apiClient.team.updateTeam(formData);
    if (success) {
      dispatch("apiSuccessHandler", { message: "성공적으로 팀이 수정되었습니다." }, { root: true });
      dispatch("getTeamList");

      return true;
    } else if (error) {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async deleteTeam({ dispatch, rootGetters }, idTeam) {
    const apiClient = rootGetters["global/apiClient"];

    const { success, error } = await apiClient.team.deleteTeam(idTeam);
    if (success) {
      dispatch("apiSuccessHandler", { message: "성공적으로 팀이 삭제되었습니다." }, { root: true });
      dispatch("getTeamList");

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
  actions,
  mutations
};
