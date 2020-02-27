import {
    selectSchedule,
    countThreeMonths
} from "../../api/attendance.js";
import {
    attendanceList
} from "../../api/attend.js";

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
        state.attendance = attendance;
    },
    categorize_attendance(state) {
        // 출석률 순으로 분리
        state.attendance
    },
    SET_COUNT_THREE_MONTHS(state, countMonthList) {

        // good so_so ghost 3가지로 분류한다
        let good_list = [];
        let so_so_list = [];
        let ghost_list = [];

        // 가장 count가 높은 순으로 정렬되어 있기 때문에 max값은 처음 사람의 것
        let max_count = countMonthList[0].count;
        let good_count = countMonthList[0].count * 0.7;
        let so_so_count = countMonthList[0].count * 0.2;

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
        commit("SET_ATTENDANCE", attendance);
    },
    async get_attend_rate({
        commit
    }, schedule_date) {
        // 임시로 오늘날짜 기준으로 하지만
        // 해당 스케쥴의 날짜를 받아서 date를 만들어야함
        let date = moment(this.today).format("YYYYMM");
        let beforeDate = moment(this.today)
            .subtract(3, "months")
            .format("YYYYMM");
        const formData = {
            standard_date: date,
            before_date: beforeDate
        };
        const countMonthList = await countThreeMonths(formData);
        commit("SET_COUNT_THREE_MONTHS", countMonthList);
    },
    
};

export default {
    state,
    getters,
    mutations,
    actions
};