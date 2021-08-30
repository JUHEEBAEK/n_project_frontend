const state = {
  gameInfo: {},
  gameList: [],
  homeSquad: [],
  awaySquad: []
};

const getters = {};

const mutations = {
  SET_GAME_INFO(state, gameInfo) {
    state.gameInfo = gameInfo;
  },
  SET_GAME_LIST(state, gameList) {
    state.gameList = gameList;
  },
  SET_HOME_SQUAD(state, homeSquad) {
    state.homeSquad = homeSquad;
  },
  SET_AWAY_SQUAD(state, awaySquad) {
    state.awaySquad = awaySquad;
  }
};

const actions = {
  async getGameId({ commit, dispatch, rootGetters }, form) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.game.searchWithScheduleIdAndQuarter(form);

    if (success) {
      if (response.data.length == 0) {
        commit("SET_GAME_INFO", {});
      } else {
        commit("SET_GAME_INFO", response.data[0]);
      }
      return response.data.insertId;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async getMultiplexGameInfo({ commit, dispatch, rootGetters }, form) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.game.getMultiplexInfo(form);

    if (success) {
      if (response.data.length == 0) {
        commit("SET_GAME_INFO", {});
      } else {
        commit("SET_GAME_INFO", response.data[0]);
      }
      return response.data.insertId;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async getHomeTeamSquadInfo({ commit, dispatch, rootGetters }, form) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.game.getHomeTeamInfoWithGameId(form);

    if (success) {
      if (response.data.length == 0) {
        commit("SET_HOME_SQUAD", {});
      } else {
        commit("SET_HOME_SQUAD", response.data);
      }
      return response.data.insertId;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async getHomeTeamSquad({ dispatch, rootGetters }, form) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.game.getHomeTeamInfoWithGameId(form);

    if (success) {
      return response.data;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async getAwayTeamSquadInfo({ commit, dispatch, rootGetters }, form) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.game.getAwayTeamInfoWithGameId(form);

    if (success) {
      if (response.data.length == 0) {
        commit("SET_AWAY_SQUAD", {});
      } else {
        commit("SET_AWAY_SQUAD", response.data);
      }
      return response.data.insertId;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async getAwayTeamSquad({ dispatch, rootGetters }, form) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.game.getAwayTeamInfoWithGameId(form);

    if (success) {
      return response.data;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async selectGameList({ commit, dispatch, rootGetters }, form) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.game.selectGameList(form);

    if (success) {
      commit("SET_GAME_LIST", response.data);
      return response.data.insertId;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async getGameListWithScheduleId({ commit, dispatch, rootGetters }, form) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.game.searchWithScheduleId(form);

    if (success) {
      commit("SET_GAME_LIST", response.data);
      return response.data.insertId;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async updateGameScore({ dispatch, rootGetters }, form) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.game.updateGame(form);

    if (success) {
      return response.data.insertId;
    } else {
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
