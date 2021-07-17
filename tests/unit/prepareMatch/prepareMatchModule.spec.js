import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import storeConfig from "@/store/modules/prepareMatch.js";
import { cloneDeep } from "lodash";

test("Check State Format", async () => {
  // 환경세팅
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));

  for (let i in store.state.headerOfSplitTeam) {
    expect(store.state.headerOfSplitTeam[i]).toHaveProperty("text");
    expect(store.state.headerOfSplitTeam[i]).toHaveProperty("value");
  }
  for (let i in store.state.summarySplitTeamList) {
    expect(store.state.summarySplitTeamList[i]).toHaveProperty(
      "splitTeamIndex"
    );
    expect(store.state.summarySplitTeamList[i]).toHaveProperty("numberOfTeam");
    expect(store.state.summarySplitTeamList[i]).toHaveProperty(
      "memberNameList"
    );
    expect(store.state.summarySplitTeamList[i]).toHaveProperty("jockerName");
  }
  expect(store.state.selectedSplitedTeam).toBe(null);
});
test("Parse state.teamSplit", async () => {
  // 환경세팅
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));

  let splitTeamExample = {
    1: {
      2: { team_split_index: 1, member_id: 2, team_number: 4, name: "d1" },
      3: { team_split_index: 1, member_id: 3, team_number: 3, name: "a3" },
      10: { team_split_index: 1, member_id: 10, team_number: 2, name: "a2" },
      11: { team_split_index: 1, member_id: 11, team_number: 3, name: "b3" },
      13: { team_split_index: 1, member_id: 13, team_number: 1, name: "a1" },
      16: { team_split_index: 1, member_id: 16, team_number: 4, name: "d2" },
      20: { team_split_index: 1, member_id: 20, team_number: 1, name: "b1" },
      21: { team_split_index: 1, member_id: 21, team_number: 3, name: "c3" },
      26: { team_split_index: 1, member_id: 26, team_number: 2, name: "b2" },
      27: { team_split_index: 1, member_id: 27, team_number: 4, name: "d3" },
      35: { team_split_index: 1, member_id: 35, team_number: 1, name: "c1" },
      36: { team_split_index: 1, member_id: 36, team_number: 2, name: "c2" }
    }
  };

  let expectedResult = {
    1: {
      1: {
        13: { team_split_index: 1, member_id: 13, team_number: 1, name: "a1" },
        20: { team_split_index: 1, member_id: 20, team_number: 1, name: "b1" },
        35: { team_split_index: 1, member_id: 35, team_number: 1, name: "c1" }
      },
      2: {
        10: { team_split_index: 1, member_id: 10, team_number: 2, name: "a2" },
        26: { team_split_index: 1, member_id: 26, team_number: 2, name: "b2" },
        36: { team_split_index: 1, member_id: 36, team_number: 2, name: "c2" }
      },
      3: {
        3: { team_split_index: 1, member_id: 3, team_number: 3, name: "a3" },
        11: { team_split_index: 1, member_id: 11, team_number: 3, name: "b3" },
        21: { team_split_index: 1, member_id: 21, team_number: 3, name: "c3" }
      },
      4: {
        2: { team_split_index: 1, member_id: 2, team_number: 4, name: "d1" },
        16: { team_split_index: 1, member_id: 16, team_number: 4, name: "d2" },
        27: { team_split_index: 1, member_id: 27, team_number: 4, name: "d3" }
      }
    }
  };

  store.commit("SET_SPLIT_TEAM_LIST", splitTeamExample);
  expect(store.state.splitTeamList).toStrictEqual(expectedResult);

  expectedResult = [
    {
      splitTeamIndex: 1,
      numberOfTeam: 4,
      memberNameList: ["a1", "b1", "c1"],
      jockerName: "-"
    }
  ];
  store.commit("SET_SUMMARY_SPLIT_TEAM_LIST");
  expect(store.state.summarySplitTeamList).toStrictEqual(expectedResult);

  store.commit("PARSE_SELECTED_SPLIT_TEAM", {
    splitTeam: splitTeamExample,
    selected_index: 1
  });
  expectedResult = {
    1: {
      teamNumber: 1,
      members: [
        {
          team_split_index: 1,
          member_id: 13,
          team_number: 1,
          name: "a1",
          position: null
        },
        {
          team_split_index: 1,
          member_id: 20,
          team_number: 1,
          name: "b1",
          position: null
        },
        {
          team_split_index: 1,
          member_id: 35,
          team_number: 1,
          name: "c1",
          position: null
        }
      ]
    },
    2: {
      teamNumber: 2,
      members: [
        {
          team_split_index: 1,
          member_id: 10,
          team_number: 2,
          name: "a2",
          position: null
        },
        {
          team_split_index: 1,
          member_id: 26,
          team_number: 2,
          name: "b2",
          position: null
        },
        {
          team_split_index: 1,
          member_id: 36,
          team_number: 2,
          name: "c2",
          position: null
        }
      ]
    },
    3: {
      teamNumber: 3,
      members: [
        {
          team_split_index: 1,
          member_id: 3,
          team_number: 3,
          name: "a3",
          position: null
        },
        {
          team_split_index: 1,
          member_id: 11,
          team_number: 3,
          name: "b3",
          position: null
        },
        {
          team_split_index: 1,
          member_id: 21,
          team_number: 3,
          name: "c3",
          position: null
        }
      ]
    },
    4: {
      teamNumber: 4,
      members: [
        {
          team_split_index: 1,
          member_id: 2,
          team_number: 4,
          name: "d1",
          position: null
        },
        {
          team_split_index: 1,
          member_id: 16,
          team_number: 4,
          name: "d2",
          position: null
        },
        {
          team_split_index: 1,
          member_id: 27,
          team_number: 4,
          name: "d3",
          position: null
        }
      ]
    }
  };
  expect(store.state.selectedSplitedTeam).toStrictEqual(expectedResult);
});
