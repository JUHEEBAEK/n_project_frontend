import * as constants from "../constants";
import {
  createStadium,
  getStadiumList,
  deleteStadium,
  updateStadium,
  detailsStadium
} from "../../api/stadium.js";

const state = {
  stadiumList: [],
  stadiumProfile:{},
  searchResult: []
};

const getters = {};
const mutations = {
  [constants.SELECT_STADIUM](state, stadiumList) {
    state.stadiumList = stadiumList;
    state.searchResult = stadiumList;
  },
  DETAILS_STADIUM(state, stadiumProfile){
    state.stadiumProfile = stadiumProfile;
  },
  SET_SEARCH_RESULT(state, searchResult) {
    state.searchResult = searchResult;
  }
};

const actions = {
  async add_stadium(context, form) {
    try {
      const response = await createStadium(form);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async select_stadium({
    commit
  }) {
    try {
      const response = await getStadiumList();
      commit("SELECT_STADIUM", response.data);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async update_stadium({
    commit
  }, payload) {
    try {
      const response = await updateStadium(payload);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async details_stadium({
    commit
  }, payload) {
    try {
      const response = await detailsStadium(payload);
      commit("DETAILS_STADIUM", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  
  async delete_stadium({
    commit
  }, payload) {
    try {
      const response = await deleteStadium(payload);
      return response;
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