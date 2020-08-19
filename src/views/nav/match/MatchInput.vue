<template>
  <div class="match__container">
    <!-- 스케쥴 리스트 영역 -->
    <v-contatner fluid>
      <schedule-date-list :scheduleId="schedule_id" @changeDate="setScheduleData"></schedule-date-list>
      <!-- 쿼터 리스트 영역 -->
      <squad-quarter @changeQuarterAndParams="changeQuarterAndParams"></squad-quarter>
    </v-contatner>

    <!-- 경기 기록 이벤트 타입 설정 부분 -->
    <v-container class="event__container">
      <!--필드 그림:: 선수 선택 페이지 -->
      <v-row class="event__main">
        <!-- 경기 기록 페이지 -->
        <match-event-input
          :isUpdate="isUpdate"
          @setGameReport="setGameReport"
          @setGameId="setGameId"
          @initSaveButton="initSaveButton"
          @getHomeAwayMemberList="getHomeAwayMemberList"
          @updateGameInfo="updateGameInfo"
          @subtractGameScore="subtractGameScore"
          @selectEventList="selectEventList"
        ></match-event-input>
        <match-event-list
          :gameEventList="eventList"
          @selectEventList="selectEventList"
          @subtractGameScore="subtractGameScore"
          @changeUpdateButton="changeUpdateButton"
        ></match-event-list>
      </v-row>
      <!-- <v-row>
        <v-col>
          <v-btn @click="saveGame" color="primary">저장</v-btn>
        </v-col>
      </v-row>-->
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import Position from "@/assets/value/position.json";
import regex from "../../../mixin/regex.js";

import { createNamespacedHelpers } from "vuex";
const {
  mapGetters: calendarGetters,
  mapMutations: calendarMapMutations
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

const {
  mapState: gameReportState,
  mapGetters: gameReportGetters,
  mapMutations: gameReportMutations,
  mapActions: gameReportActions
} = createNamespacedHelpers("gameReport");

const {
  mapState: gameState,
  mapMutations: gameMutations,
  mapActions: gameActions
} = createNamespacedHelpers("game");

export default {
  mixins: [regex],
  filters: {
    setMomentMonth: function(val) {
      return moment(val).format("MMM");
    }
  },
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
    // 스케쥴 리스트 영역
    scheduleList: [],
    scheduleIndex: null,
    scheduleInfo: {},
    setYear: moment().format("YYYY"),
    setMonth: moment().format("MMMM"),
    setDay: moment().format("DD"),
    // 쿼터 리스트 영역
    buttonClickState: null,
    // 이벤트 기록 영역
    isGoal: true,
    isUpdate: false,
    firstEventType: "Goal",
    lastEventType: "Assist",
    firstPlayer: null,
    lastPlayer: null,
    teamType: null,
    benchList: Position.benchList,
    positionHomeList: Position.homeList,
    positionAwayList: Position.awayList,
    position: JSON.parse(JSON.stringify(Position.basicPostion)),
    homePlayerList: [],
    awayPlayerList: []
  }),
  computed: {
    ...calendarGetters(["current_schedule_id"]),
    ...prepareMatchGetters(["currentQuarterNumber"]),
    ...prepareMatchState(["homeMembers", "awayMembers"]),
    ...gameState(["gameInfo"]),
    ...gameReportState(["eventList", "awayScore", "homeScore"]),
    setStatus() {
      this.init();
      if (this.isGoal) {
        this.firstEventType = "Goal";
        this.lastEventType = "Assist";
        return "Goal/Assist";
      } else {
        this.firstEventType = "Out";
        this.lastEventType = "In";
        return "Change Player";
      }
    }
  },
  async created() {
    this.SET_QAURTER_INDEX(Number(this.quarter));
  },
  methods: {
    ...calendarMapMutations(["SET_SCHEDULE_INDEX"]),
    ...squadActions(["getSplitTeamListWithSchedule"]),
    ...prepareMatchMutations(["SET_QAURTER_INDEX"]),
    ...prepareMatchActions(["getHomeAwayMember"]),
    ...gameActions(["updateGameScore", "getGameId"]),
    ...gameReportMutations([
      "SET_HOME_SCORE",
      "SET_AWAY_SCORE",
      "SUBTRACT_HOME_SCORE",
      "SUBTRACT_AWAY_SCORE"
    ]),
    ...gameReportActions(["getEventList", "updateGameEvent"]),

    async setScheduleData(selected_schedule) {
      let changedScheduleId = selected_schedule.id;
      this.setDateString(selected_schedule);

      if (this.$router.currentRoute.params.schedule_id != changedScheduleId) {
        this.$router.replace({
          name: "matchInput",
          params: {
            schedule_id: changedScheduleId
          }
        });
      }
      this.initializeGame();
    },
    async initializeGame() {
      await this.setGameId();
      await this.getHomeAwayMemberList();
      this.selectEventList();
    },
    changeQuarterAndParams(item) {
      let changeQuarter = this.extractNumberFromStr(item);

      this.$router.replace({
        name: "matchInput",
        params: {
          quarter: changeQuarter
        }
      });
      this.initializeGame();
    },
    changeUpdateButton: function() {
      this.isUpdate = true;
    },
    getHomeAwayMemberList: async function() {
      let scheduleAndQuarter = {
        schedule_id: this.current_schedule_id,
        quarter: this.currentQuarterNumber
      };
      let homeAwayMembers = await this.getHomeAwayMember(scheduleAndQuarter);
    },
    initSaveButton() {
      this.isUpdate = false;
    },
    selectEventList: async function() {
      this.gameEventList = await this.getEventList(this.gameInfo.id);
    },
    setDateString(selected_schedule) {
      this.setYear = moment(selected_schedule.date).format("YYYY");
      this.setMonth = moment(selected_schedule.date).format("MMMM");
      this.setDay = moment(selected_schedule.date).format("DD");
    },
    setGameId: async function() {
      let scheduleQuarter = {
        schedule_id: this.current_schedule_id,
        quarter: this.currentQuarterNumber
      };
      await this.getGameId(scheduleQuarter);
      if (this.gameInfo) {
        this.SET_HOME_SCORE(this.gameInfo.home_score);
        this.SET_AWAY_SCORE(this.gameInfo.away_score);
      } else {
        this.SET_HOME_SCORE(0);
        this.SET_AWAY_SCORE(0);
      }
    },
    setGameResult() {
      let caculateScore = this.homeScore - this.awayScore;
      if (caculateScore > 0) {
        return "H";
      } else if (caculateScore < 0) {
        return "A";
      } else {
        return "D";
      }
    },
    subtractGameScore: function(eventInfo) {
      if (eventInfo.team_type === "H") {
        this.SUBTRACT_HOME_SCORE(1);
      } else if (eventInfo.team_type === "A") {
        this.SUBTRACT_HOME_SCORE(1);
      }
      this.updateGameInfo();
    },
    updateGameInfo: function() {
      let gameResult = this.setGameResult();
      let body = {
        game_id: this.gameInfo.id,
        game: {
          quarter: this.gameInfo.quarter,
          away_score: this.awayScore,
          home_score: this.homeScore,
          result: gameResult
        }
      };
      this.updateGameScore(body);
      this.$emit("setGameId");
    }
  }
};
</script>

<style
  lang="scss"
  src="../../../styles/views/nav/match/matchInput.scss"
></style>
