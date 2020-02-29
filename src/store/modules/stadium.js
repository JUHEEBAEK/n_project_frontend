import * as constants from "../constants";
import {
  getStadiumList
} from "../../api/stadium.js";

const state = {
  stadiumList: []
};

const getters = {};
const mutations = {
  [constants.SELECT_STADIUM](state, stadiumList) {
    state.stadiumList = stadiumList;
  }
};

const actions = {
  async select_stadium({
    commit
  }) {
    try {
      const response = await getStadiumList();
      commit("SELECT_STADIUM", response);
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