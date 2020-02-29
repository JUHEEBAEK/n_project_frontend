import {
    countThreeMonths
} from "../../api/attendance.js";
import {
    attendanceList,
    addAttend,
    deleteAttend,
} from "../../api/attend.js";
import moment from "moment";

const state = {
    attendance: [{
        id: null,
        name: null,
        attend: false
    }],
    good_attendance: [],
    so_so_attendance: [],
    ghost_attendance: [],
};

const getters = {

};

const mutations = {
    SET_ATTENDANCE(state, attendance) {
        let result_dictionary = {}
        for (var i in attendance) {
            let item = attendance[i]
            result_dictionary[item.member_id] = true
        }
        state.attendance = result_dictionary;
    },
    update_attendance_attend(state) {
        // state.attendance
        for (let i in state.good_attendance) {
            let item = state.good_attendance[i]
            if (state.attendance[item.id]) {
                item["attend"] = true
            } else {
                item["attend"] = false
            }
            state.good_attendance[i] = item;
        }
        for (let i in state.so_so_attendance) {
            let item = state.so_so_attendance[i]
            if (state.attendance[item.id]) {
                item["attend"] = true
            } else {
                item["attend"] = false
            }
            state.so_so_attendance[i] = item;
        }
        for (let i in state.ghost_attendance) {
            let item = state.ghost_attendance[i]
            if (state.attendance[item.id]) {
                item["attend"] = true
            } else {
                item["attend"] = false
            }
            state.ghost_attendance[i] = item;
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

        state.good_attendance = good_list;
        state.so_so_attendance = so_so_list;
        state.ghost_attendance = ghost_list;

    }
};

const actions = {
    async get_attendance({
        commit
    }, schedule_id) {
        const attendance = await attendanceList(schedule_id);
        commit("SET_ATTENDANCE", attendance.data);
        commit("update_attendance_attend");
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
        let response = await addAttend(payload);
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