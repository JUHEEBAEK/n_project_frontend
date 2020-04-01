const state = {
    team_division: {
        teams: [],
        jocker_player: null
    }
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
};

const actions = {

};

export default {
    state,
    mutations,
    actions
};