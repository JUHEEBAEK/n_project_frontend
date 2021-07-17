import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import storeConfig from "@/store/modules/squad.js";
import { cloneDeep } from "lodash";
import { NULL } from "node-sass";

test("Devide Team with Members", async () => {
  // 환경세팅
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));

  const input_division_requirement = {
    attend_member_id_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    number_team: 3,
    jocker_exist: false
  };

  // const expected_output_example = {
  //     teams: [
  //         [1, 2, 3, 4],
  //         [5, 6, 7, 8, 9]
  //     ],
  //     jocker_player: null
  // };

  store.commit("divide_member_into_team", input_division_requirement);
  expect(store.state.team_division).toHaveProperty("teams");
  expect(store.state.team_division).toHaveProperty("jocker_player");

  // 1. number_team을 만족하는가
  expect(store.state.team_division.teams.length).toBe(
    input_division_requirement.number_team
  );

  // 3. jocker_exist를 만족하는가
  // 조커는 단 한명 랜덤 선택
  if (input_division_requirement.jocker_exist) {
    expect(store.state.team_division.jocker_player).toBeDefined();
  } else {
    expect(store.state.team_division.jocker_player).toBeNull();
  }

  // 4. 다 합쳤을 떄 member_id_list가 나올것
  // 5. team들과 jocker_player 사이에 중복이 없을 것 (중복이 있으면 exactly same 하지 않음)
  check_all_member_exist(
    store.state.team_division.teams,
    input_division_requirement.attend_member_id_list
  );
});

function check_all_member_exist(
  { teams, jocker_player },
  input_attend_member_id_list
) {
  let all_member_id_list = [];
  let copy_input_member_list = [...input_attend_member_id_list].sort(function(
    a,
    b
  ) {
    return a - b;
  });
  for (let i in teams) {
    let member_id_list = teams[i];
    all_member_id_list.push(...member_id_list);
  }
  if (jocker_player) {
    all_member_id_list.push(jocker_player);
  }
  all_member_id_list.sort(function(a, b) {
    // 오름차순 정렬
    return a - b;
  });

  expect(all_member_id_list).toStrictEqual(copy_input_member_list);
}

test("Get Data from TeamSplit_DB and Save state.teamSplit", async () => {
  // 환경세팅
  const localVue = createLocalVue();
  localVue.use(Vuex);
  const store = new Vuex.Store(cloneDeep(storeConfig));

  let schedule_id = 223;

  await store.dispatch("setSplitTeamListWithSchedule", schedule_id);

  check_splitTeam_property(store.state.splitTeam);

  //가장 처음꺼를 선택한다
  expect(store.state.teamSplitSelected).toEqual(1);
});

function check_splitTeam_property(splitTeam) {
  // 1. dict형태 key가 split_team_index를 의미한다
  // 2. 그 다음 안에는 member_id를 키로 하는 member정보가 있다
  // 3. id(splitTeam id), team_split_index, schedule_id, team_number, member_name
  for (var team_split_index in splitTeam) {
    let member_dict = splitTeam[team_split_index];
    for (var member_id in member_dict) {
      let member = member_dict[member_id];
      expect(member).toHaveProperty("id");
      expect(member).toHaveProperty("team_split_index");
      expect(member).toHaveProperty("schedule_id");
      expect(member).toHaveProperty("member_id");
      expect(member).toHaveProperty("team_number");
      expect(member).toHaveProperty("name");
      expect(member).toHaveProperty("uniform_number");

      expect(member["team_split_index"]).toEqual(Number(team_split_index));
      expect(member["member_id"]).toEqual(Number(member_id));
    }
  }
}
