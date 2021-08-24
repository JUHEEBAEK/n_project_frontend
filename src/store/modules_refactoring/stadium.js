import * as constants from "../constants";
import { createStadium, getStadiumList, deleteStadium, updateStadium, detailsStadium } from "../../api/stadium.js";

const state = {
  stadiumList: [],
  stadiumProfile: {},
  searchResult: []
};

const getters = {};
const mutations = {
  [constants.SELECT_STADIUM](state, stadiumList) {
    state.stadiumList = stadiumList;
    state.searchResult = stadiumList;
  },
  DETAILS_STADIUM(state, stadiumProfile) {
    state.stadiumProfile = stadiumProfile;
  },
  SET_SEARCH_RESULT(state, searchResult) {
    state.searchResult = searchResult;
  }
};

const actions = {
  async add_stadium({ dispatch, rootGetters }, form) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error } = await apiClient.stadium.createStadium(form);

    if (success) {
      dispatch("apiSuccessHandler", { message: "경기장이 추가되었습니다" }, { root: true });
      return true;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async select_stadium({ commit, dispatch, rootGetters }) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.stadium.getStadiumList();

    if (success) {
      commit("SELECT_STADIUM", response.data);
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async update_stadium({ dispatch, rootGetters }, payload) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.stadium.updateStadium(payload);

    if (success) {
      return response;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async details_stadium({ commit, dispatch, rootGetters }, payload) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.stadium.detailsStadium(payload);

    if (success) {
      commit("DETAILS_STADIUM", response.data);
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },

  async delete_stadium({ dispatch, rootGetters }, payload) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.stadium.deleteStadium(payload);

    if (success) {
      return response;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
