import {
    getGoalRanking,
    getGoalRankingFilter,
    getAssistRanking,
    getAssistRankingFilter,
    getCleanSheetRanking,
    getCleanSheetRankingFilter,
} from "../../api/ranking.js";

const state = {
    rankingData: {
        'GOAL': [
          {
            name: 'Frozen Yogurt',
            score: 159,
          },
          {
            name: 'Ice cream sandwich',
            score: 237,
          },
          {
            name: 'Eclair',
            score: 262,
          },
        ], 
        'ASSIST': [
          {
            name: '탕수육',
            score: 45,
          },
          {
            name: '치킨',
            score: 22,
          },
          {
            name: '피자',
            score: 11,
          },
        ], 
        'CLEAN_SHEET': [
          {
            name: '상추',
            score: 11159,
          },
          {
            name: '배추',
            score: 3237,
          },
          {
            name: '김치',
            score: 1262,
          },
        ],
        
    }

}
const mutations = {
    SET_GOAL_RANKING_DATA(state, goalData){
        state.rankingData['GOAL'] = goalData
    },
    SET_ASSIST_RANKING_DATA(state, assistData){
        state.rankingData['ASSIST'] = assistData
    },
    SET_CLEAN_SHEET_RANKING_DATA(state, cleanSheetData){
        state.rankingData['CLEAN_SHEET'] = cleanSheetData
    },

}
const actions = {

    async get_goal_ranking(context){
        try {
            const response = await getGoalRanking();
            context.commit("SET_GOAL_RANKING_DATA", response.data);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async get_assist_ranking(context){
        try {
            const response = await getAssistRanking();
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
    async get_goal_ranking_filter(context, condition){
      try {
          const response = await getGoalRankingFilter(condition);
          context.commit("SET_GOAL_RANKING_DATA", response.data);
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
    async get_clean_sheet_ranking_filter(context, condition){
        try {
            const response = await getCleanSheetRankingFilter(condition);
            context.commit("SET_CLEAN_SHEET_RANKING_DATA", response.data);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    },
}

export default {
    state,
    mutations,
    actions
};