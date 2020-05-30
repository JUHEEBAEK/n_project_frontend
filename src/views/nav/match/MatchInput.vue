<template>
  <div class="match__container">
    <core-Toolbar />
    <core-Navigation />
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
      <div class="event__header">
        <v-switch class="mt-0" v-model="isGoal" hide-details :label="`Status: ${setStatus}`"></v-switch>
      </div>
      <v-row class="event__main">
        <!--필드 그림:: 선수 선택 페이지 -->
        <v-col cols="12" xl="6" lg="6" sm="12">
          <v-card class="home__container" elevation="1">
            <v-card-title class="home__header">HOME</v-card-title>
            <v-card-text class="home__content">
              <v-row justify="center">
                <v-col
                  v-for="player in homePlayerList"
                  :key="player"
                  class="position__box position__box-home"
                  cols="4"
                  align-self="center"
                >
                  <v-btn
                    rounded
                    small
                    color="lime lighten-2"
                    @click="clickPlayer(player)"
                  >{{ player.name }}</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card class="input__container" outlined evalation="2">
            <v-card-text class="label__container">
              <span class="label__text">상태</span>
              <span class="label__text">선수1</span>
              <span class="label__text">상태</span>
              <span class="label__text">선수2</span>
              <v-btn class="my-1" x-small fab @click="init">
                <v-icon dark>fas fa-eraser</v-icon>
              </v-btn>
            </v-card-text>
            <v-card-text class="data__container">
              <span class="data__text fixed__type">{{ firstEventType }}</span>
              <span class="data__text">{{ firstPlayer }}</span>
              <span class="data__text fixed__type">{{ lastEventType }}</span>
              <span class="data__text">{{ lastPlayer }}</span>
              <v-btn class="my-1" x-small fab color="primary" @click="clickSaveButton">
                <v-icon dark>fas fa-pencil-alt</v-icon>
              </v-btn>
            </v-card-text>
          </v-card>
          <v-card class="away__container" elevation="1">
            <v-card-title class="away__header">AWAY</v-card-title>
            <v-card-text class="away__content">
              <v-row justify="center">
                <v-col
                  v-for="player in awayPlayerList"
                  :key="player"
                  class="position__box position__box-away"
                  cols="4"
                  align-self="center"
                >
                  <v-btn
                    rounded
                    small
                    color="lime lighten-2"
                    @click="clickPlayer(player)"
                  >{{ player.name }}</v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
        <!-- 경기 기록 페이지 -->
        <v-col cols="12" xl="6" lg="6" sm="12">
          <v-card class="report__container" elevation="1" color="#cfead0">
            <v-card-title class="report__header">게임 기록</v-card-title>
            <v-card-text class="report__content">
              <v-timeline class="report__timeline">
                <v-timeline-item
                  class="report__item"
                  v-for="event in eventList"
                  :key="event"
                  small
                  fill-dot
                  color="white"
                  :right="event.team_type === 'A' ? true : false"
                  :left="event.team_type === 'H' ? true : false"
                  :icon="
                    event.event_type === 'Goal'
                      ? 'fas fa-futbol'
                      : 'fas fa-exchange-alt fa-rotate-270'
                  "
                  icon-color="black"
                >
                  <v-chip
                    class="firstEvent ma-2"
                    close
                    color="#dce775"
                    text-color="black"
                    close-icon="fas fa-times-circle"
                    @click:close="deleteButton(event)"
                  >
                    <span>{{ event.firstPlayer }}</span>
                    <v-avatar left>
                      <v-icon x-small>fas fa-futbol</v-icon>
                    </v-avatar>
                    <span class="lastEvent ma-1">{{ event.lastPlayer }}</span>
                    <v-avatar left>
                      <v-icon x-small>fas fa-shoe-prints fa-rotate-270</v-icon>
                    </v-avatar>
                  </v-chip>
                </v-timeline-item>
              </v-timeline>
            </v-card-text>
          </v-card>
        </v-col>
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
  mapActions: calendarMapActions
} = createNamespacedHelpers("calendar");
const {
  mapState: squadState,
  mapMutations: squadMutations,
  mapActions: squadActions
} = createNamespacedHelpers("squad");

export default {
  filters: {
    setMomentMonth: function(val) {
      return moment(val).format("MMM");
    }
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
    eventList: []
  }),
  computed: {
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
    }
  },
  async created() {
    await this.setScheduleList();
    this.getHomeTeamPlayerList();
    this.getAwayTeamPlayerList();
    this.getEventList();
  },
  methods: {
    ...squadActions(["getSplitTeamListWithSchedule"]),
    init() {
      this.firstPlayer = null;
      this.lastPlayer = null;
      this.teamType = null;
    },
    clickSaveButton() {
      console.log(this.eventList);
      this.eventList.push({
        event_type: this.firstEventType,
        firstPlayer: this.firstPlayer,
        lastPlayer: this.lastPlayer,
        team_type: this.teamType
      });

      this.init();
    },
    clickPlayer(val) {
      console.log("clickPlayer", val);
      if (this.teamType !== null && this.teamType !== val.team) {
        alert("같은 팀을 선택해주세요.");
        this.init();
      } else if (this.firstPlayer !== null && this.firstPlayer === val.name) {
        alert("같은 사람을 선택할 수 없습니다.");
        this.init();
      } else {
        this.teamType = val.team;
        if (this.firstPlayer === null) {
          this.firstPlayer = val.name;
        } else {
          this.lastPlayer = val.name;
        }
      }
    },
    deleteButton: function(event) {
      this.eventList.forEach((item, idx) => {
        if (item.event_id === event.event_id) {
          this.eventList.splice(idx, 1);
        }
      });
    },
    getEventList: function() {
      // TODO: 경기 이벤트 리스트 가져오는 API 호출
      this.eventList = dummyData.gameEventList;
      // console.log(this.eventList);
    },
    getHomeTeamPlayerList: function() {
      // TODO: 홈팀 선수리스트 가져오는 API 호출
      this.homePlayerList = dummyData.homeTeamPlayers;
      // console.log(this.homePlayerList);
    },
    getAwayTeamPlayerList: function() {
      // TODO: 어웨이팀 선수리스트 가져오는 API 호출
      this.awayPlayerList = dummyData.awayTeamPlayers;
      // console.log(this.awayPlayerList);
    },
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
    }
  }
};
</script>

<style lang="scss" src="../../../styles/views/nav/match/matchInput.scss">
</style>
