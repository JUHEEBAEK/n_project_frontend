import moment from "moment";

const state = {
  attend: {
    member_id: "is_attend_boolean"
  },
  good_attend: [
    {
      attend: false,
      count: 18,
      id: 0,
      name: "테스트"
    }
  ],
  so_so_attend: [],
  ghost_attend: [],
  outsider_attend: []
};

const getters = {};

const mutations = {
  SET_ATTEND(state, attend) {
    let result_dictionary = {};
    for (var i in attend) {
      let item = attend[i];
      result_dictionary[item.member_id] = true;
    }
    state.attend = result_dictionary;
  },
  UPDATE_ATTEND(state) {
    for (let i in state.good_attend) {
      let item = state.good_attend[i];
      if (state.attend[item.id]) {
        item["attend"] = true;
      } else {
        item["attend"] = false;
      }
      state.good_attend[i] = item;
    }
    for (let i in state.so_so_attend) {
      let item = state.so_so_attend[i];
      if (state.attend[item.id]) {
        item["attend"] = true;
      } else {
        item["attend"] = false;
      }
      state.so_so_attend[i] = item;
    }
    for (let i in state.ghost_attend) {
      let item = state.ghost_attend[i];
      if (state.attend[item.id]) {
        item["attend"] = true;
      } else {
        item["attend"] = false;
      }
      state.ghost_attend[i] = item;
    }
  },

  SET_COUNT_THREE_MONTHS(state, countMonthList) {
    // good so_so ghost 3가지로 분류한다
    let good_list = [];
    let so_so_list = [];
    let ghost_list = [];
    let outsider_list = [];

    // 가장 count가 높은 순으로 정렬되어 있기 때문에 max값은 처음 사람의 것
    let max_count = countMonthList[0].count ? countMonthList[0].count : 0;
    let good_count = max_count * 0.7;
    let so_so_count = max_count * 0.2;

    for (var i in countMonthList) {
      let member = countMonthList[i];
      member["attend"] = false;

      if (member.withdraw_date != null) {
        outsider_list.push(member);
        continue;
      }

      if (member.count >= good_count) {
        good_list.push(member);
      } else if (member.count >= so_so_count) {
        so_so_list.push(member);
      } else {
        ghost_list.push(member);
      }
    }

    state.good_attend = good_list;
    state.so_so_attend = so_so_list;
    state.ghost_attend = ghost_list;
    state.outsider_attend = outsider_list;
  }
};

const actions = {
  async get_attend({ commit, dispatch, rootGetters }, schedule_id) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.attend.attendList(schedule_id);

    if (success) {
      commit("SET_ATTEND", response.data);
      commit("UPDATE_ATTEND");
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async countByYear({ dispatch, rootGetters }) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.attend.countByYear();

    if (success) {
      return response.data;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async get_attend_rate({ commit, rootGetters, dispatch }, schedule_date) {
    let date = moment(schedule_date, "YYYY-MM-DD").format("YYYYMM");
    let beforeDate = moment(schedule_date, "YYYY-MM-DD")
      .subtract(3, "months")
      .format("YYYYMM");
    const formData = {
      standard_date: date,
      before_date: beforeDate
    };

    const apiClient = rootGetters["global/apiClient"];
    const { success, error, response } = await apiClient.attend.countThreeMonths(formData);

    if (success) {
      commit("SET_COUNT_THREE_MONTHS", response.data);
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async add_attend({ dispatch, rootGetters }, payload) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error } = await apiClient.attend.createAttend(payload);

    if (success) {
      return true;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async delete_attend({ dispatch, rootGetters }, payload) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error } = await apiClient.attend.deleteAttend(payload);

    if (success) {
      return true;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
