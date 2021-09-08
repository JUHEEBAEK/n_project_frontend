const state = {
  whoMyAssistList: [],
  whoMyGoalList: []
};
const mutations = {
  SET_MY_ASSISTER_LIST(state, myAssistList) {
    state.whoMyAssistList = myAssistList;
  },
  SET_MY_GOALER_LIST(state, myGoalList) {
    state.whoMyGoalList = myGoalList;
  }
};
const actions = {
  async get_my_assister_list({ commit, dispatch, rootGetters }, payload) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.personal.getMyAssisterById(payload);

    if (success) {
      commit("SET_MY_ASSISTER_LIST", response.data);
      return response.data;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async get_my_goaler_list({ commit, dispatch, rootGetters }, payload) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.personal.getMyGoalerById(payload);

    if (success) {
      commit("SET_MY_GOALER_LIST", response.data);
      return response.data;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async get_number_of_goal({ dispatch, rootGetters }, payload) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.personal.getNumberOfGoal(payload);

    if (success) {
      return response;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async get_number_of_assist({ dispatch, rootGetters }, payload) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.personal.getNumberOfAssist(payload);

    if (success) {
      return response;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async get_number_of_attended({ dispatch, rootGetters }, payload) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.personal.getNumberOfAttend(payload);

    if (success) {
      return response;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async get_number_of_played_match({ dispatch, rootGetters }, payload) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.personal.getNumberOfPlayedMatch(payload);

    if (success) {
      return response;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
