import {
  createLocalVue
} from "@vue/test-utils";
import Vuex from "vuex";
import storeConfig from "@/store/modules/calendar.js";
import {
  cloneDeep
} from "lodash";

test("State has right values", () => {
  // 환경세팅
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));

  expect(store.state.newScheduleBox).toBeFalsy();
  expect(store.state.fullScheduleDialog).toBeFalsy();
  expect(store.state.scheduleList).toStrictEqual([]);
  expect(store.state.scheduleInfo).toStrictEqual({});
});

test("Mutation Setters work", () => {
  // 환경세팅
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));

  let test_value = "qweradsfzcxv";
  store.commit("SET_NEW_SCHEDULE_MODAL", test_value);
  expect(store.state.newScheduleBox).toBe(test_value);

  store.commit("SET_FULL_SCHEDULE_MODAL", test_value);
  expect(store.state.newScheduleBox).toBe(test_value);

  let input_schedule_list = [{
      id: 168,
      date: "2019-08-10",
      type: "P",
      start: "19:00:00",
      end: "21:00:00",
      name: "[자체경기] 잠실 제 3구장",
      stadium_id: 3,
      stadium_name: "잠실 제 3구장",
      address: "서울 송파구 올림픽로 25 잠실종합운동장 제3풋살장",
      member_id_list: Array(0),
      member_name_list: Array(0),
      attendCount: 0,
      open: false,
      type_index: 1,
      color: "rgb(51, 182, 121)"
    },
    {
      id: 171,
      date: "2019-08-31",
      type: "P",
      start: "19:00:00",
      end: "21:00:00",
      name: "[자체경기] 잠실 제 2구장",
      stadium_id: 2,
      stadium_name: "잠실 제 2구장",
      address: "서울 송파구 올림픽로 25 잠실종합운동장 제2풋살장",
      member_id_list: Array(0),
      member_name_list: Array(0),
      attendCount: 0,
      open: false,
      type_index: 1,
      color: "rgb(51, 182, 121)"
    }
  ];

  let result_schedule_list = [{
      id: 168,
      date: "2019-08-10",
      type: "P",
      start: "19:00:00",
      end: "21:00:00",
      name: "[자체경기] 잠실 제 3구장",
      stadium_id: 3,
      stadium_name: "잠실 제 3구장",
      address: "서울 송파구 올림픽로 25 잠실종합운동장 제3풋살장",
      member_id_list: Array(0),
      member_name_list: Array(0),
      attendCount: 0,
      open: false,
      type_index: 1,
      color: "rgb(51, 182, 121)"
    },
    {
      id: 171,
      date: "2019-08-31",
      type: "P",
      start: "19:00:00",
      end: "21:00:00",
      name: "[자체경기] 잠실 제 2구장",
      stadium_id: 2,
      stadium_name: "잠실 제 2구장",
      address: "서울 송파구 올림픽로 25 잠실종합운동장 제2풋살장",
      member_id_list: Array(0),
      member_name_list: Array(0),
      attendCount: 0,
      open: false,
      type_index: 1,
      color: "rgb(51, 182, 121)"
    }
  ];
  store.commit("SET_SCHEDULE_LIST", input_schedule_list);
  expect(store.state.scheduleList).toStrictEqual(result_schedule_list);
});

test("Setting Members according to Schedule", async () => {
  // 환경세팅
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));

  const initial_scheduleList = [{
    id: 167
  }, {
    id: 168
  }];

  const input_member_list = [{
      id: 36,
      member_id: 36,
      schedule_id: 168,
      name: "김나경",
    },
    {
      id: 31,
      member_id: 31,
      schedule_id: 168,
      name: "윤영임",

    },
    {
      id: 14,
      member_id: 14,
      schedule_id: 168,
      name: "김지현",
    },
    {
      id: 10,
      member_id: 10,
      schedule_id: 168,
      name: "박아란",

    },
    {
      id: 2,
      member_id: 2,
      schedule_id: 168,
      name: "백주희",

    },
    {
      id: 11,
      member_id: 11,
      schedule_id: 168,
      name: "원지향",

    },
    {
      id: 20,
      member_id: 20,
      schedule_id: 168,
      name: "조명선",

    },
    {
      id: 12,
      member_id: 12,
      schedule_id: 168,
      name: "최예린",
    },
    {
      id: 30,
      member_id: 30,
      schedule_id: 168,
      name: "함박눈",
    }
  ];
  const expect_result = [{
    id: 167
  }, {
    attendCount: 9,
    id: 168,
    member_id_list: [36, 31, 14, 10, 2, 11, 20, 12, 30],
    member_name_list: [
      "김나경",
      "윤영임",
      "김지현",
      "박아란",
      "백주희",
      "원지향",
      "조명선",
      "최예린",
      "함박눈"
    ]
  }];
  // await store.dispatch('select_schedule')
  store.state.scheduleList = initial_scheduleList;
  store.commit("ADD_MEMBER_LIST", input_member_list);
  expect(store.state.scheduleList).toStrictEqual(expect_result);
});

test("Get Schedule with specific id ", async () => {
  // 환경세팅
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));

  let intput_id = 1;
  let schedule_with_id = await store.dispatch("get_schedule_info", intput_id);

  let expected_schedule = {
    "address": "서울 관악구 은천로 86 두산아파트",
    "date": "2018-01-06",
    "end_time": null,
    "id": 1,
    "name": "[자체 경기] 풀굿",
    "place": "풀굿 FC 풋살장(봉천)",
    "stadium_id": 10,
    "start_time": null,
    "type": "P"
  }
  expect(schedule_with_id).toStrictEqual(expected_schedule);
});