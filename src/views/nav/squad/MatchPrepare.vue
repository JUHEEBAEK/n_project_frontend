<template>
  <v-container class="match__container" fluid>
    <v-row class justify="center">
      <v-col cols="12">
        <schedule-date-list :scheduleId="schedule_id" @changeDate="setScheduleData"></schedule-date-list>
      </v-col>
      <v-col cols="12">
        <squad-quarter @changeQuarterAndParams="setScheduleData"></squad-quarter>
      </v-col>
      <v-col cols="12">
        <squad-team-list></squad-team-list>
      </v-col>
      <v-col cols="12">
        <squad-input-position :members="members"></squad-input-position>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-btn @click="save" color="primary">저장</v-btn>
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

export default {
  props: {
    schedule_id: {
      type: [String, Number],
      default: null
    },
    quarter: {
      type: [String, Number],
      default: null
    }
  },
  data: () => ({
    members: null
  }),
  computed: {
    ...prepareMatchState([
      "selectedSplitedTeam",
      "homeTeam",
      "awayTeam",
      "jocker",
      "homeMembers",
      "awayMembers",
      "quarterIndex"
    ]),
    ...prepareMatchGetters(["currentQuarterString", "currentQuarterNumber"]),
    ...calendarMapState(["scheduleIndex"]),
    ...calendarMapGetters(["current_schedule_id"])
  },
  async created() {
    this.SET_QAURTER_INDEX(Number(this.quarter) - 1);
  },
  methods: {
    ...squadActions(["getSplitTeamListWithSchedule"]),
    ...calendarMapActions(["select_schedule", "load_member"]),
    ...calendarMapMutations(["CHOOSE_LATEST_SCHEDULE", "SET_SCHEDULE_INDEX"]),
    ...prepareMatchMutations([
      "SET_QAURTER_INDEX",
      "ADD_HOME_JOCKER",
      "ADD_AWAY_JOCKER"
    ]),
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
    addJockerTeam: function() {
      this.ADD_HOME_JOCKER(this.jocker);
      this.ADD_AWAY_JOCKER(this.jocker);
      console.log("home", this.homeTeam);
      console.log("away", this.awayTeam);
    },
    async save() {
      if (!this.homeTeam) {
        return;
        //home과 away를 return 할 것
        // TODO: 포지션에 중복된 선수가 되있으면 안된다.
      }
      if (this.awayTeam.members) {
        var awayExist = true;
      } else {
        var awayExist = false;
      }
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
          memberData: this.homeTeam
        });
        if (awayExist) {
          if (awaySquadId) {
            await this.createMultipleMemberSquad({
              squad_id: awaySquadId,
              memberData: this.awayTeam
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
        gameForm["result"] = "N";
        await this.createGame(gameForm);
      }
      this.$router.push({
        name: "matchInput",
        params: {
          schedule_id: this.current_schedule_id,
          quarter: this.currentQuarterNumber
        }
      });
    },
    async setScheduleData() {
      if (this.scheduleIndex == -1) return;
      this.$router.replace({
        name: "matchPrepare",
        params: {
          schedule_id: this.current_schedule_id,
          quarter: this.currentQuarterNumber
        }
      });

      // db에서 불러오는 부분
      await this.getSplitTeamListWithSchedule(this.current_schedule_id);
      await this.load_member(this.current_schedule_id);
      // prepareMatch store에서 값 세팅
      await this.setSplitTeamList();
      await this.setSummarySplitTeamList();

      this.reset_members();
    },

    async reset_members() {
      // 현재 스케쥴이랑 쿼터 가져오기
      await this.getHomeAwayMember({
        schedule_id: this.current_schedule_id,
        quarter: this.currentQuarterNumber
      });

      let members = []; // {selectType: "home", position: "", name: ""}
      for (var i in this.homeMembers) {
        let member = this.homeMembers[i];
        if (member.position) {
          members.push({
            selectType: "Home",
            position: member.position,
            name: member.name
          });
        }
      }
      for (var i in this.awayMembers) {
        let member = this.awayMembers[i];
        if (member.position) {
          members.push({
            selectType: "Away",
            position: member.position,
            name: member.name
          });
        }
      }
      this.members = members;
    }
  }
};
</script>

<style></style>
