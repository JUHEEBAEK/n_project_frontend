<template>
  <div class="match__container">
    <!-- 스케쥴 리스트 영역 -->
    <v-contatner fluid>
      <v-form ref="form">
        <schedule-date-list @changeDate="setScheduleData"></schedule-date-list>
        <!-- 쿼터 리스트 영역 -->
        <squad-quarter @changeQuarterAndParams="changeQuarterAndParams"></squad-quarter>
      </v-form>
    </v-contatner>

    <!-- 경기 기록 이벤트 타입 설정 부분 -->
    <v-container class="event__container">
      <!--필드 그림:: 선수 선택 페이지 -->
      <v-row class="event__main">
        <!-- 경기 기록 페이지 -->
        <match-event-input
          @getHomeAwayMemberList="getHomeAwayMemberList"
          @selectEventList="selectEventList"
        ></match-event-input>
        <match-event-list :gameEventList="eventList" @selectEventList="selectEventList"></match-event-list>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="saveGame" color="primary">저장</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import Position from "../../../assets/value/Postion.json";
import regex from "../../../mixin/regex.js";

import { createNamespacedHelpers } from "vuex";
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
    quarterIndex: null,
    quarterCount: null,
    buttonClickState: null,
    // 이벤트 기록 영역
    isGoal: true,
    firstEventType: "Goal",
    lastEventType: "Assist",
    firstPlayer: null,
    lastPlayer: null,
    teamType: null,
    benchList: Position.benchList,
    positionHomeList: Position.homeList,
    positionAwayList: Position.awayList,
    position: Position.basicPostion,
    homePlayerList: [],
    awayPlayerList: []
  }),
  computed: {
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
    console.log("matchInput created");
    await this.setGameId();
    await this.selectEventList();
  },
  watch: {
    scheduleIndex: async function(val) {
      if (val) {
        let selected_schedule = this.scheduleList[this.scheduleIndex];
        this.setDateString(selected_schedule);
        this.scheduleInfo = selected_schedule;
      }
    },
    quarterCount: function() {
      this.quarterIndex =
        this.scheduleList[this.scheduleIndex]["quarterCount"] - 1;
    },
    "$route.params.quarter": async function(newQuarter, oldQuarter) {
      this.quarterIndex = newQuarter;
      await this.setGameId();
      await this.getHomeAwayMemberList();
      this.selectEventList();
    }
  },
  methods: {
    ...squadActions(["getSplitTeamListWithSchedule"]),
    ...prepareMatchActions(["getHomeAwayMember"]),
    ...gameActions(["getGameId", "updateGameScore"]),
    ...gameReportMutations(["SET_HOME_SCORE", "SET_AWAY_SCORE"]),
    ...gameReportActions(["getEventList"]),
    changeQuarterAndParams(item) {
      let changeQuarter = this.extractNumberFromStr(item);
      this.$router.replace({
        name: "matchInput",
        params: { quarter: changeQuarter }
      });
    },
    getHomeAwayMemberList: async function() {
      let scheduleAndQuarter = {
        schedule_id: this.$route.params.schedule_id,
        quarter: this.$route.params.quarter
      };
      let homeAwayMembers = await this.getHomeAwayMember(scheduleAndQuarter);
    },
    saveGame: async function() {
      let body = {
        game_id: this.gameInfo.id,
        game: {
          quarter: this.gameInfo.quarter,
          away_score: this.awayScore,
          home_score: this.homeScore
        }
      };
      console.log(body);
      await this.updateGameScore(body);
      this.setGameId(body.game_id);
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
      let body = {
        schedule_id: this.schedule_id,
        quarter: this.quarter
      };
      await this.getGameId(body);
      console.log(this.gameInfo);
      await this.SET_HOME_SCORE(this.gameInfo.home_score);
      this.SET_AWAY_SCORE(this.gameInfo.away_score);
    },
    async setScheduleData(selected_schedule) {
      if (this.scheduleIndex == -1) return;
    }
  }
};
</script>

<style
  lang="scss"
  src="../../../styles/views/nav/match/matchInput.scss"
></style>
