import {
  getMyAssisterById,
  getMyGoalerById,
  getNumberOfGoal,
  getNumberOfAssist,
  getNumberOfAttend,
  getNumberOfPlayedMatch
} from "../../api/personal.js";

const state = {
  whoMyAssistList: [],
  whoMyGoalList: [],
}
const mutations = {
  SET_MY_ASSISTER_LIST(state, myAssistList){
    state.whoMyAssistList = myAssistList
  },
  SET_MY_GOALER_LIST(state, myGoalList){
    state.whoMyGoalList = myGoalList
  }
}
const actions = {
  async get_my_assister_list(context, payload) {
    try {
      const response = await getMyAssisterById(payload);
      context.commit("SET_MY_ASSISTER_LIST", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async get_my_goaler_list(context, payload) {
    try {
      const response = await getMyGoalerById(payload);
      context.commit("SET_MY_GOALER_LIST", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async get_number_of_goal(context, payload) {
    try {
      const response = await getNumberOfGoal(payload);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async get_number_of_assist(context, payload) {
    try {
      const response = await getNumberOfAssist(payload);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async get_number_of_attended(context, payload) {
    try {
      const response = await getNumberOfAttend(payload);
      return response;
    } catch (e) {
      console.log(e);
    }
  },
  async get_number_of_played_match(context, payload) {
    try {
      const response = await getNumberOfPlayedMatch(payload);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
}
export default {
    state,
    mutations,
    actions
};