<template>
  <div class="match__container">
    <!-- 스케쥴 리스트 영역 -->
    <v-contatner fluid>
      <v-form ref="form">
        <schedule-date-list @changeDate="setScheduleData"></schedule-date-list>
        <!-- 쿼터 리스트 영역 -->
        <squad-quarter></squad-quarter>
      </v-form>
    </v-contatner>

    <!-- 경기 기록 이벤트 타입 설정 부분 -->
    <v-container class="event__container">
      <!--필드 그림:: 선수 선택 페이지 -->
      <v-row class="event__main">
        <!-- 경기 기록 페이지 -->
        <match-event-input></match-event-input>
        <match-event-list></match-event-list>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import dummyData from "../../../assets/value/dummy.json";
import Position from "../../../assets/value/Postion.json";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: calendarMapState,
  mapGetters: calendarMapGetters,
  mapMutations: calendarMapMutations,
  mapActions: calendarMapActions,
} = createNamespacedHelpers("calendar");
const {
  mapState: squadState,
  mapMutations: squadMutations,
  mapActions: squadActions,
} = createNamespacedHelpers("squad");
const {
  mapState: prepareMatchState,
  mapGetters: prepareMatchGetters,
  mapMutations: prepareMatchMutations,
  mapActions: prepareMatchActions,
} = createNamespacedHelpers("prepareMatch");

export default {
  filters: {
    setMomentMonth: function(val) {
      return moment(val).format("MMM");
    },
  },
  data: () => ({
    // 스케쥴 리스트 영역
    scheduleList: [],
    scheduleIndex: null,
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
    awayPlayerList: [],
  }),
  computed: {
    ...prepareMatchState(["homeMembers", "awayMembers"]),
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
    },
  },
  watch: {
    scheduleIndex: async function(val) {
      if (val) {
        let selected_schedule = this.scheduleList[this.scheduleIndex];
        this.setDateString(selected_schedule);
        // this.$emit("changeDate", selected_schedule);
      }
    },
    quarterCount: function() {
      this.quarterIndex =
        this.scheduleList[this.scheduleIndex]["quarterCount"] - 1;
    },
  },
  async created() {
    await this.setScheduleList();
  },
  methods: {
    ...squadActions(["getSplitTeamListWithSchedule"]),
    ...prepareMatchActions(["getHomeAwayMember"]),
    setDateString(selected_schedule) {
      this.setYear = moment(selected_schedule.date).format("YYYY");
      this.setMonth = moment(selected_schedule.date).format("MMMM");
      this.setDay = moment(selected_schedule.date).format("DD");
    },
    setInfo(item) {
      // TODO: 스케쥴 정보 선택 API 호출
      this.quarterCount = item.quarterCount;
    },
    setScheduleList() {
      this.scheduleList = dummyData.MatchInput_scheduleList;
      // 스케쥴 초기 세팅
      this.scheduleIndex = this.scheduleList.length - 1;
      // 쿼터 초기 세팅
      this.quarterCount = this.scheduleList[this.scheduleIndex]["quarterCount"];
    },
    async setScheduleData(selected_schedule) {
      if (this.scheduleIndex == -1) return;
    },
  },
};
</script>

<style
  lang="scss"
  src="../../../styles/views/nav/match/matchInput.scss"
></style>
