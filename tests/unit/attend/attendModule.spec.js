import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import storeConfig from "@/store/modules/attend.js";
import { cloneDeep } from "lodash";

test("State has right key and values", () => {
  // 환경세팅
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));

  expect(store.state.attend).toStrictEqual({
    member_id: "is_attend_boolean"
  });
  expect(store.state.good_attend[0]).toHaveProperty("attend", false);
  expect(store.state.good_attend[0]).toHaveProperty("id", 0);
  expect(store.state.good_attend[0]).toHaveProperty("count", 18);
  expect(store.state.good_attend[0]).toHaveProperty("name", "테스트");
});

test("Get member attend SCHEDULE with certain ID", async () => {
  // 환경세팅
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));

  await store.dispatch("get_attend", 140);
  expect(store.state.attend).toStrictEqual({
    "12": true,
    "25": true,
    "3": true,
    "6": true
  });
});

test("Get Attend Rate For 3 month with Last Date", async () => {
  // 환경세팅
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));

  let expected_subset_good_attend = [
    {
      attend: false,
      count: 18,
      id: 6,
      name: "이종은"
    },
    {
      attend: false,
      count: 17,
      id: 21,
      name: "최주희"
    },
    {
      attend: false,
      count: 15,
      id: 3,
      name: "이화인"
    },
    {
      attend: false,
      count: 15,
      id: 34,
      name: "이선경"
    }
  ];
  let expected_subset_so_so_attend = [
    {
      attend: false,
      count: 12,
      id: 25,
      name: "박소연"
    },
    {
      attend: false,
      count: 11,
      id: 30,
      name: "함박눈"
    },
    {
      attend: false,
      count: 9,
      id: 27,
      name: "장한솔"
    },
    {
      attend: false,
      count: 8,
      id: 2,
      name: "백주희"
    }
  ];
  let expected_subset_ghost_attend = [
    {
      attend: false,
      count: 3,
      id: 14,
      name: "김지현"
    },
    {
      attend: false,
      count: 3,
      id: 17,
      name: "선하은"
    },
    {
      attend: false,
      count: 3,
      id: 31,
      name: "윤영임"
    }
  ];

  await store.dispatch("get_attend_rate", "2019-02-11");

  // subset이 존재하는지 확인
  expect(store.state.good_attend).toEqual(
    expect.arrayContaining(expected_subset_good_attend)
  );
  expect(store.state.so_so_attend).toEqual(
    expect.arrayContaining(expected_subset_so_so_attend)
  );
  expect(store.state.ghost_attend).toEqual(
    expect.arrayContaining(expected_subset_ghost_attend)
  );
});

test("Update Attend(true or false) in good_attend, so_so_attend, ghost_attend with id in attend", () => {
  // 환경세팅
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));

  store.state.attend = {
    "1": true,
    "2": true,
    "3": true
  };
  store.state.good_attend = [
    {
      attend: false,
      id: 1
    },
    {
      attend: false,
      id: 2
    }
  ];
  store.state.so_so_attend = [
    {
      attend: false,
      id: 3
    },
    {
      attend: false,
      id: 4
    }
  ];
  store.state.ghost_attend = [
    {
      attend: false,
      id: 5
    }
  ];
  let expected_good_attend = [
    {
      attend: true,
      id: 1
    },
    {
      attend: true,
      id: 2
    }
  ];
  let expected_so_so_attend = [
    {
      attend: true,
      id: 3
    },
    {
      attend: false,
      id: 4
    }
  ];
  let expected_ghost_attend = [
    {
      attend: false,
      id: 5
    }
  ];
  store.commit("UPDATE_ATTEND");

  expect(store.state.good_attend).toStrictEqual(expected_good_attend);
  expect(store.state.so_so_attend).toStrictEqual(expected_so_so_attend);
  expect(store.state.ghost_attend).toStrictEqual(expected_ghost_attend);
});
