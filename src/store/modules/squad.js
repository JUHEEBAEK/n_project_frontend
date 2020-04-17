import {
    createTeamSplit,
    getTeamSplitList,
    getSplitTeamListWithSchedule,
    getInfo,
    deleteTeamSplit,
    updateTeamSplit,
    bulkCreateOrUpdate,

  } from "../../api/teamSplit.js";

const state = {
    team_division: {
        teams: [],
        jocker_player: null
    },
    teamSplitList: [1, 2, 3, 4, 5, 6],
    temaSplitSelected: 1,
    splitTeam: {},
};

const mutations = {
    divide_member_into_team(state, {
        attend_member_id_list,
        number_team,
        jocker_exist
    }) {
        // initialize
        state.team_division = {
            teams: [],
            jocker_player: null
        }

        // jocker가 있는 경우 한명을 뺌
        if (jocker_exist) {
            state.team_division.jocker_player = array_random_extract(attend_member_id_list, 1)[0]
        }

        while (attend_member_id_list && number_team) {
            // 뺄 사람 수를 정한다
            let number_of_player_in_team = Math.ceil(attend_member_id_list.length / number_team--);
            let random_member_id_list = array_random_extract(attend_member_id_list, number_of_player_in_team);
            state.team_division.teams.push(random_member_id_list);
        }
        return true

        function array_random_extract(original_array, number_of_extraction) {
            let extracted_array = []
            for (let i = 0; i < number_of_extraction; i++) {

                let random_selected_index = getRandomInt(0, original_array.length - 1)

                extracted_array.push(original_array[random_selected_index])
                original_array.splice(random_selected_index, 1)
            }
            return extracted_array
        }

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
        }
    },
    
    SET_SPLIT_TEAM(state, splitTeamList){
        state.splitTeam = {}
        // team_split_index 별로 나눈다음에
        // member id를 키 값으로 다시 저장
        for (let i in splitTeamList){
            let splitTeamItem = splitTeamList[i]
            if (!state.splitTeam[splitTeamItem.team_split_index]){
                state.splitTeam[splitTeamItem.team_split_index] = {}
            }
            state.splitTeam[splitTeamItem.team_split_index][splitTeamItem.member_id] = splitTeamItem
        }
    },
    SET_TEAM_SPLIT_SELECTED(state){
        if (state.teamSplitList) {
            state.temaSplitSelected = state.teamSplitList[0]
        }else{
            state.temaSplitSelected = 1
        }
    },
    SET_TEAM_INDEX_CHANGED(state, temaSplitSelected){
        state.temaSplitSelected = temaSplitSelected
    }
};

const actions = {
    async saveTeamSplit(context, payload){
        console.log('saveTeamSplit Action', payload);
        try {
            const response = await bulkCreateOrUpdate(payload);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    },
    async getTeamList(context, payload){
        // payload에는 schedule_id가 있으면 될듯하다
        console.log("getTeamList", payload)
    },
    async getSplitTeamListWithSchedule(context, schedule_id){
        try {
            const response = await getSplitTeamListWithSchedule(schedule_id);
            console.log("getSplitTeamListWithSchedule", response.data)
            context.commit("SET_SPLIT_TEAM", response.data)
            context.commit("SET_TEAM_SPLIT_SELECTED")
            
            return response.data;
            // 아래 dict의 List가 온다
            // {id: 31
            // team_split_index: 1
            // schedule_id: 223
            // member_id: 3
            // team_number: 1}
        } catch (e) {
            console.log(e);
        }
    }
    
};

export default {
    state,
    mutations,
    actions
};