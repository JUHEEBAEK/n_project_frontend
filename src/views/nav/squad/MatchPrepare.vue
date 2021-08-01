<template>
  <v-container class="match__container" fluid>
    <v-row class justify="center">
      <v-col cols="12">
        <schedule-date-list
          :schedule-id="schedule_id"
          @changeDate="setScheduleData"
        ></schedule-date-list>
      </v-col>
      <v-col cols="12">
        <squad-quarter
          @changeQuarterAndParams="setScheduleData"
        ></squad-quarter>
      </v-col>
      <v-col cols="12">
        <squad-team-list></squad-team-list>
      </v-col>
      <v-col cols="6" class="box--home">
        <squad-input-position
          :members="homeTeam.members"
          @change="homeMembers = $event"
        ></squad-input-position>
      </v-col>
      <v-col cols="6" class="box--away">
        <squad-input-position
          :members="awayTeam.members"
          @change="awayMembers = $event"
        ></squad-input-position>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn color="primary" @click="save">저장</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: calendarMapState,
  mapGetters: calendarMapGetters,
  mapMutations: calendarMapMutations,
  mapActions: calendarMapActions
} = createNamespacedHelpers("calendar");
const {
  mapState: squadState,
  mapMutations: squadMutations,
  mapActions: squadActions
} = createNamespacedHelpers("squad");

const {
  mapState: prepareMatchState,
  mapGetters: prepareMatchGetters,
  mapMutations: prepareMatchMutations,
  mapActions: prepareMatchActions
} = createNamespacedHelpers("prepareMatch");

const { mapGetters: accountMapGetters } = createNamespacedHelpers("account");

export default {
  props: {
    scheduleId: {
      type: [String, Number],
      default: null
    },
    quarter: {
      type: [String, Number],
      default: null
    }
  },
  data: () => ({
    members: null,
    homeMembers: {},
    awayMembers: {}
  }),
  computed: {
    ...accountMapGetters(["userInfo"]),
    ...calendarMapGetters(["current_schedule_id"]),
    ...calendarMapState(["scheduleIndex", "scheduleList"]),
    ...prepareMatchGetters(["currentQuarterString", "currentQuarterNumber"]),
    ...prepareMatchState([
      "selectedSplitedTeam",
      "homeTeam",
      "awayTeam",
      "jocker",
      "quarterIndex"
    ])
  },
  async created() {
    this.SET_QAURTER_INDEX(Number(this.quarter) - 1);
  },
  methods: {
    ...squadActions([
      "setSplitTeamListWithSchedule",
      "setSplitTeamWithUnitTeam"
    ]),
    ...calendarMapActions(["select_schedule", "load_member"]),
    ...calendarMapMutations(["CHOOSE_LATEST_SCHEDULE", "SET_SCHEDULE_INDEX"]),
    ...prepareMatchMutations(["SET_QAURTER_INDEX"]),
    ...prepareMatchActions([
      "setSplitTeamList",
      "setSummarySplitTeamList",
      "checkGameAlreadyExist",
      "createSquad",
      "createMultipleMemberSquad",
      "createGame",
      "deleteMemberSquad",
      "updateGame",
      "setSelectedSplitedTeam",
      "getHomeAwayMember"
    ]),

    async save() {
      if (!this.homeTeam) {
        return;
        //home과 away를 return 할 것
        // TODO: 포지션에 중복된 선수가 되있으면 안된다.
      }
      let awayExist = !!this.awayTeam.members;

      let formSearchGame = {};
      formSearchGame["schedule_id"] = this.current_schedule_id;
      formSearchGame["quarter"] = this.currentQuarterNumber;
      let searchedGame = await this.checkGameAlreadyExist(formSearchGame);

      this.addJockerTeam();

      // 해당 스케쥴, 쿼터에 해당하는 게임이 있는지 확인 Action
      if (searchedGame) {
        // 게임이 있다면
        // 0. 스쿼드 id가져오기
        let homeSquadId = searchedGame["home_squad_id"];
        let awaySquadId = searchedGame["away_squad_id"];

        // 1. 기존 스쿼드 멤버들을 없애기
        let deleteMemberSquadForm = {};
        deleteMemberSquadForm["squad_id"] = homeSquadId;
        await this.deleteMemberSquad(deleteMemberSquadForm);
        if (awaySquadId) {
          // 기존 away가 존재할 경우
          deleteMemberSquadForm["squad_id"] = awaySquadId;
          await this.deleteMemberSquad(deleteMemberSquadForm);
        }
        // 2. 스쿼드멤버를 넣기
        await this.createMultipleMemberSquad({
          squad_id: homeSquadId,
          memberData: { ...this.homeTeam, members: this.homeMembers }
        });
        if (awayExist) {
          if (awaySquadId) {
            await this.createMultipleMemberSquad({
              squad_id: awaySquadId,
              memberData: { ...this.awayTeam, members: this.awayMembers }
            });
          } else {
            // awaySqaud 만들기
            let formAwaySquad = {};
            formAwaySquad["schedule_id"] = this.current_schedule_id;
            formAwaySquad["team_number"] = this.awayTeam["teamNumber"];
            awaySquadId = await this.createSquad(formAwaySquad);

            // member 추가하기
            await this.createMultipleMemberSquad({
              squad_id: awaySquadId,
              memberData: this.awayTeam
            });

            // game에 away_squad_id update하기
            let gameUpdateForm = {
              game_id: searchedGame["id"],
              game: { away_squad_id: awaySquadId }
            };
            this.updateGame(gameUpdateForm);
          }
        }
      } else {
        // 게임이 없다면
        // 1. 스쿼드를 만들기
        // 스쿼드 만들려면 스케쥴 id랑 팀 넘버 필요함
        let formHomeSquad = {};
        formHomeSquad["schedule_id"] = this.current_schedule_id;
        formHomeSquad["team_number"] = this.homeTeam["teamNumber"];

        let formAwaySquad = {};
        if (awayExist) {
          formAwaySquad["schedule_id"] = this.current_schedule_id;
          formAwaySquad["team_number"] = this.awayTeam["teamNumber"];
        }

        // 만들어진 스쿼드 id를 가져오기
        let homeSquadId = await this.createSquad(formHomeSquad);
        let awaySquadId = null;
        if (awayExist) {
          awaySquadId = await this.createSquad(formAwaySquad);
        }
        // 2. 스쿼드멤버를 넣기
        await this.createMultipleMemberSquad({
          squad_id: homeSquadId,
          memberData: this.homeTeam
        });
        if (awayExist) {
          await this.createMultipleMemberSquad({
            squad_id: awaySquadId,
            memberData: this.awayTeam
          });
        }
        // 3. 게임을 만들기
        //    등록할 때 0대0 무승부로 등록해두기
        // schedule_id, quarter, home_squad_id, away_squad_id, homescore, awayscore, result
        let gameForm = {};
        gameForm["schedule_id"] = this.current_schedule_id;
        gameForm["quarter"] = this.currentQuarterNumber;
        gameForm["home_squad_id"] = homeSquadId;
        gameForm["away_squad_id"] = awaySquadId;
        gameForm["home_score"] = 0;
        gameForm["away_score"] = 0;
        gameForm["result"] = "D";
        gameForm["user_id"] = this.userInfo.id;
        console.log(this.jocker);
        if (this.jocker.member_id) {
          gameForm["is_jocker"] = true;
        }
        await this.createGame(gameForm);
      }
      this.$router.replace({
        name: "matchInput",
        params: {
          schedule_id: this.current_schedule_id,
          quarter: this.currentQuarterNumber
        }
      });
    },
    addJockerTeam: function() {
      this.jocker.members.forEach(member => {
        this.homeMembers.push({
          member_id: member.member_id,
          name: member.name,
          position: "JK",
          isJocker: true
        });
        this.awayMembers.push({
          member_id: member.member_id,
          name: member.name,
          position: "JK",
          isJocker: true
        });
      });
    },

    async setScheduleData() {
      if (this.scheduleIndex == -1) return;

      this.$router
        .replace({
          name: "matchPrepare",
          params: {
            schedule_id: this.current_schedule_id,
            quarter: this.currentQuarterNumber
          }
        })
        .catch(err => {
          // 같은 주소를 여러 번 호출할 때 나는 에러이다.
          if (err.name != "NavigationDuplocated") {
            throw err;
          }
        });

      let isLeague = this.scheduleList[this.scheduleIndex].type == "L";
      // db에서 불러오는 부분
      if (isLeague) {
        let year = this.scheduleList[this.scheduleIndex].date.slice(0, 4);
        await this.setSplitTeamWithUnitTeam({
          year: year,
          schedule_id: this.current_schedule_id
        });
      } else {
        await this.setSplitTeamListWithSchedule(this.current_schedule_id);
      }

      await this.load_member(this.current_schedule_id);
      // prepareMatch store에서 값 세팅
      await this.setSplitTeamList();
      await this.setSummarySplitTeamList();
      await this.getHomeAwayMember({
        schedule_id: this.current_schedule_id,
        quarter: this.currentQuarterNumber
      });
    }
  }
};
</script>

<style></style>
