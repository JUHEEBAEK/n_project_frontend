const state = {
  rankingData: {
    GOAL: [],
    ASSIST: [],
    CLEAN_SHEET: [],
    ATTEND: []
  },
  leagueRankingData: [],
  relativePerformance: []
};
const mutations = {
  SET_ASSIST_RANKING_DATA(state, assistData) {
    state.rankingData["ASSIST"] = assistData;
  },
  SET_CLEAN_SHEET_RANKING_DATA(state, cleanSheetData) {
    state.rankingData["CLEAN_SHEET"] = cleanSheetData;
  },
  SET_GOAL_RANKING_DATA(state, goalData) {
    state.rankingData["GOAL"] = goalData;
  },
  SET_LEAGUE_RANKING_DATA(state, rankingData) {
    state.leagueRankingData = rankingData;
  },
  SET_RELATIVE_PERFORMANCE(state, performance) {
    state.relativePerformance = performance;
  },
  SET_ATTEND_RANKING_DATA(state, attendData) {
    state.rankingData["ATTEND"] = attendData;
  }
};
const actions = {
  // async add_stadium({ dispatch, rootGetters }, form) {
  //   const apiClient = rootGetters["global/apiClient"];
  //   const { success, error } = await apiClient.stadium.createStadium(form);

  //   if (success) {
  //     dispatch("apiSuccessHandler", { message: "경기장이 추가되었습니다" }, { root: true });
  //     return true;
  //   } else {
  //     dispatch("apiErrorHandler", { error }, { root: true });
  //     return false;
  //   }
  // },
  async get_assist_ranking({ commit, dispatch, rootGetters }) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.ranking.getAssistRanking();

    if (success) {
      commit("SET_ASSIST_RANKING_DATA", response.data);
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async get_assist_ranking_filter({ commit, dispatch, rootGetters }, condition) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.ranking.getAssistRankingFilter(condition);

    if (success) {
      commit("SET_ASSIST_RANKING_DATA", response.data);
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async get_clean_sheet_ranking({ commit, dispatch, rootGetters }) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.ranking.getCleanSheetRanking();

    if (success) {
      commit("SET_CLEAN_SHEET_RANKING_DATA", response.data);
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async get_clean_sheet_ranking_filter({ commit, dispatch, rootGetters }, condition) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.ranking.getCleanSheetRankingFilter(condition);

    if (success) {
      commit("SET_CLEAN_SHEET_RANKING_DATA", response.data);
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async get_goal_ranking({ commit, dispatch, rootGetters }) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.ranking.getGoalRanking();
    if (success) {
      commit("SET_GOAL_RANKING_DATA", response.data);
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async get_goal_ranking_filter({ commit, dispatch, rootGetters }, condition) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.ranking.getGoalRankingFilter(condition);

    if (success) {
      commit("SET_GOAL_RANKING_DATA", response.data);
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },

  async get_league_ranking({ commit, dispatch, rootGetters }, year) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.ranking.getLeagueRanking(year);

    if (success) {
      commit("SET_LEAGUE_RANKING_DATA", response.data);
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async get_relative_performance({ commit, dispatch, rootGetters }, year) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.ranking.getRelativePerformance(year);

    if (success) {
      commit("SET_RELATIVE_PERFORMANCE", response.data);
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async get_attend_ranking_filter({ commit, dispatch, rootGetters }, condition) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.ranking.getAttendRankingFilter(condition);

    if (success) {
      commit("SET_ATTEND_RANKING_DATA", response.data);
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
