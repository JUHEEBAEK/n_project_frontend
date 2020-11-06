import {
    getGoalRanking,
    getGoalRankingFilter,
    getAssistRanking,
    getAssistRankingFilter,
    getCleanSheetRanking,
    getCleanSheetRankingFilter,
    getLeagueRanking,
    getRelativePerformance
} from "../../api/ranking.js";

const state = {
  rankingData: {
    'GOAL': [], 
    'ASSIST': [], 
    'CLEAN_SHEET': [],
  },
  leagueRankingData: [],
  relativePerformance: []
}
const mutations = {
  SET_ASSIST_RANKING_DATA(state, assistData){
    state.rankingData['ASSIST'] = assistData
  },
  SET_CLEAN_SHEET_RANKING_DATA(state, cleanSheetData){
    state.rankingData['CLEAN_SHEET'] = cleanSheetData
  },
  SET_GOAL_RANKING_DATA(state, goalData){
    state.rankingData['GOAL'] = goalData
  },
  SET_LEAGUE_RANKING_DATA(state, rankingData){
    state.leagueRankingData = rankingData
  },
  SET_RELATIVE_PERFORMANCE(state, performance){
    state.relativePerformance = performance
  }
}
const actions = {
  async get_assist_ranking(context){
    try {
      const response = await getAssistRanking();
      context.commit("SET_ASSIST_RANKING_DATA", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async get_assist_ranking_filter(context, condition){
    try {
      const response = await getAssistRankingFilter(condition);
      context.commit("SET_ASSIST_RANKING_DATA", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
   }
  },
  async get_clean_sheet_ranking(context){
    try {
      const response = await getCleanSheetRanking();
      context.commit("SET_CLEAN_SHEET_RANKING_DATA", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async get_clean_sheet_ranking_filter(context, condition){
    try {
      const response = await getCleanSheetRankingFilter(condition);
      context.commit("SET_CLEAN_SHEET_RANKING_DATA", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async get_goal_ranking(context){
    try {
      const response = await getGoalRanking();
      context.commit("SET_GOAL_RANKING_DATA", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async get_goal_ranking_filter(context, condition){
    try {
      const response = await getGoalRankingFilter(condition);
      context.commit("SET_GOAL_RANKING_DATA", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async get_league_ranking(context, year) {
    try {
      const response = await getLeagueRanking(year);
      context.commit("SET_LEAGUE_RANKING_DATA", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async get_relative_performance(context, year) {
    try {
      const response = await getRelativePerformance(year);
      context.commit("SET_RELATIVE_PERFORMANCE", response.data);
      return response.data;
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