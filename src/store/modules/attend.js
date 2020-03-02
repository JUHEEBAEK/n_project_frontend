import {
    attendList,
    createAttend,
    countThreeMonths,
    deleteAttend,
} from "../../api/attend.js";
import moment from "moment";

const state = {
    attend: [{
        id: null,
        name: null,
        attend: false
    }],
    good_attend: [],
    so_so_attend: [],
    ghost_attend: [],
};

const getters = {

};

const mutations = {
    SET_ATTEND(state, attend) {
        let result_dictionary = {}
        for (var i in attend) {
            let item = attend[i]
            result_dictionary[item.member_id] = true
        }
        state.attend = result_dictionary;
    },
    update_attend_attend(state) {
        // state.attend
        for (let i in state.good_attend) {
            let item = state.good_attend[i]
            if (state.attend[item.id]) {
                item["attend"] = true
            } else {
                item["attend"] = false
            }
            state.good_attend[i] = item;
        }
        for (let i in state.so_so_attend) {
            let item = state.so_so_attend[i]
            if (state.attend[item.id]) {
                item["attend"] = true
            } else {
                item["attend"] = false
            }
            state.so_so_attend[i] = item;
        }
        for (let i in state.ghost_attend) {
            let item = state.ghost_attend[i]
            if (state.attend[item.id]) {
                item["attend"] = true
            } else {
                item["attend"] = false
            }
            state.ghost_attend[i] = item;
        }

    },

    SET_COUNT_THREE_MONTHS(state, countMonthList) {

        // good so_so ghost 3가지로 분류한다
        let good_list = [];
        let so_so_list = [];
        let ghost_list = [];

        // 가장 count가 높은 순으로 정렬되어 있기 때문에 max값은 처음 사람의 것
        let max_count = countMonthList[0].count ? countMonthList[0].count : 0;
        let good_count = max_count * 0.7;
        let so_so_count = max_count * 0.2;

        for (var i in countMonthList) {
            let item = countMonthList[i];
            item["attend"] = false;

            if (item.count >= good_count) {
                good_list.push(item);
                continue;
            } else if (item.count >= so_so_count) {
                so_so_list.push(item);
            } else {
                ghost_list.push(item);
            }
        }

        state.good_attend = good_list;
        state.so_so_attend = so_so_list;
        state.ghost_attend = ghost_list;

    }
};

const actions = {
    async get_attend({
        commit
    }, schedule_id) {
        const attend = await attendList(schedule_id);
        commit("SET_attend", attend.data);
        commit("update_attend_attend");
    },
    async get_attend_rate({
        commit
    }, schedule_date) {

        let date = moment(schedule_date, 'YYYY-MM-DD').format("YYYYMM");
        let beforeDate = moment(schedule_date, 'YYYY-MM-DD')
            .subtract(3, "months")
            .format("YYYYMM");
        const formData = {
            standard_date: date,
            before_date: beforeDate
        };
        const countMonthList = await countThreeMonths(formData);
        commit("SET_COUNT_THREE_MONTHS", countMonthList);
    },
    async add_attend(context, payload) {
        let response = await createAttend(payload);
        console.log('add_attend', response)
        if (response.err) {
            return false
        } else {
            return true
        }
    },
    async delete_attend(context, payload) {
        let response = await deleteAttend(payload);
        console.log('delte_attend', response)
        if (response.err) {
            return false
        } else {
            return true
        }
    },

};


export default {
    state,
    getters,
    mutations,
    actions
};