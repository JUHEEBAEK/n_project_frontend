import {
    createLocalVue
} from "@vue/test-utils";
import Vuex from "vuex";
import storeConfig from "@/store/modules/squad.js";
import {
    cloneDeep
} from "lodash";
import {
    NULL
} from "node-sass";

test("Devide Team with Members", async () => {
    // 환경세팅
    const localVue = createLocalVue();
    localVue.use(Vuex);
    const store = new Vuex.Store(cloneDeep(storeConfig));


    const input_division_requirement = {
        attend_member_id_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        number_team: 3,
        min_player: 4,
        jocker_exist: true
    };

    const wrong_input_requirement_1 = {
        // 멤버가 적은 경우
        attend_member_id_list: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        number_team: 3,
        min_player: 4,
        jocker_exist: false
    };

    const wrong_input_requirement_2 = {
        // 멤버가 적은 경우
        attend_member_id_list: [1, 2, 3, 4, 5, 6, 7, 8],
        number_team: 2,
        min_player: 4,
        jocker_exist: true
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
    // 2. min_player를 만족했는가
    for (let i in store.state.team_division.teams) {
        expect(store.state.team_division.teams[i].length).toBeGreaterThanOrEqual(
            input_division_requirement.min_player
        );
    }
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

    // 잘못된 input이 들어오는 경우 false를 리턴할 것
    let result = await store.commit(
        "divide_member_into_team",
        wrong_input_requirement_1
    );
    expect(result).toBeFalsy();
    result = await store.commit(
        "divide_member_into_team",
        wrong_input_requirement_2
    );
    expect(result).toBeFalsy();
});

function check_all_member_exist({
        teams,
        jocker_player
    },
    input_attend_member_id_list
) {
    let all_member_id_list = [];
    let copy_input_member_list = [...input_attend_member_id_list].sort(function (
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
    all_member_id_list.sort(function (a, b) {
        // 오름차순 정렬
        return a - b;
    });

    expect(all_member_id_list).toStrictEqual(copy_input_member_list);

}