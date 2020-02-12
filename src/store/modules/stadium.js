import * as constants from "../constants";
import { selectStadium } from "../../api/stadium.js";

const state = {
  stadiumList: [],
};

const getters = {};
const mutations = {
  [constants.SELECT_STADIUM](state, stadiumList) {
    state.stadiumList = stadiumList;
  },
};

const actions = {
  async select_stadium({ commit }) {
    try {
      const response = await selectStadium();
      commit("SELECT_STADIUM", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};
