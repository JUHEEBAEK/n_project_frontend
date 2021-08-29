import { createEvent, getEventList, deleteEvent, getEventInfo, updateGameEvent } from "../../api/gmaeReport.js";
import { set } from "../../utils/index";
import * as constants from "../constants";

const state = {
  gameReportEventInfo: {},
  eventList: [],
  awayScore: 0,
  homeScore: 0
};

const getters = {};

const mutations = {
  [constants.setHomeScore]: set("homeScore"),
  [constants.setAwayScore]: set("awayScore"),
  ADD_EVENT(state, event) {
    state.eventList.push(event);
  },
  GET_EVENT_LIST(state, eventList) {
    state.eventList = eventList;
  },
  SET_EVENT_INFO(state, gameReportEventInfo) {
    state.gameReportEventInfo = gameReportEventInfo;
  },
  ADD_HOME_SCORE(state, homeScore) {
    state.homeScore += homeScore;
  },
  ADD_AWAY_SCORE(state, awayScore) {
    state.awayScore += awayScore;
  },
  SUBTRACT_HOME_SCORE(state, homeScore) {
    state.homeScore -= homeScore;
  },
  SUBTRACT_AWAY_SCORE(state, awayScore) {
    state.awayScore -= awayScore;
  }
};

const actions = {
  async addGameEvent({ commit, dispatch, rootGetters }, payload) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error } = await apiClient.gameReport.createEvent(payload);

    if (success) {
      commit("ADD_EVENT", payload);
      return true;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async updateGameEvent({ dispatch, rootGetters }, payload) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error } = await apiClient.gameReport.updateGameEvent(payload);

    if (success) {
      return true;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },

  async deleteGameEvent({ dispatch, rootGetters }, payload) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error } = await apiClient.gameReport.deleteEvent(payload);

    if (success) {
      return true;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async getEventList({ commit, dispatch, rootGetters }, payload) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.gameReport.getEventList(payload);

    if (success) {
      commit("GET_EVENT_LIST", response.data);
      return response.data;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async getEventInfo({ commit, dispatch, rootGetters }, payload) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.gameReport.getEventInfo(payload);

    if (success) {
      commit("SET_EVENT_INFO", response.data);
      return response.data;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
