import {
  searchWithScheduleIdAndQuarter,
  updateGame
} from "../../api/game.js";

const state = {
  gameInfo: {},
};

const getters = {

};

const mutations = {
  SET_GAME_INFO(state, gameInfo){
    state.gameInfo = gameInfo
  },
};

const actions = {    
  async getGameId({commit}, payload) {
    try {
      let response = await searchWithScheduleIdAndQuarter(payload);
      if (response.data){
        commit("SET_GAME_INFO", response.data[0])
        return response.data.insertId
      }else{
        return false;
      } 
    }catch (e) {
        console.log(e);
    }
  },
  async updateGameScore({commit}, payload) {
    try {
      let response = await updateGame(payload);
       console.log("updateGameScore", payload);
      if (response.data){
        return response.data.insertId
      }else{
        return false;
      } 
    }catch (e) {
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