<template>
  <v-col cols="12" xl="6" lg="6" sm="12">
    <div class="event__header">
      <v-switch class="mt-0" v-model="isGoal" hide-details :label="`Status: ${setStatus}`"></v-switch>
    </div>
    <v-card class="home__container" elevation="1">
      <v-card-title class="home__header">HOME</v-card-title>
      <v-card-text class="home__content">
        <v-row justify="center">
          <v-col v-for="player in homePlayerList" :key="player" cols="4" align-self="center">
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
          <v-col v-for="player in awayPlayerList" :key="player" cols="4" align-self="center">
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
</template>

<script>
import moment from "moment";
import dummyData from "../../assets/value/dummy.json";
import Position from "../../assets/value/Postion.json";

export default {
  data: () => ({
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
    this.getHomeTeamPlayerList();
    this.getAwayTeamPlayerList();
  },
  methods: {
    init() {
      this.firstPlayer = null;
      this.lastPlayer = null;
      this.teamType = null;
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
    }
  }
};
</script>

<style lang="scss" src="../../styles/components/match/eventInput.scss">
</style>