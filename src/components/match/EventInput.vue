<template>
  <v-col cols="12" xl="6" lg="6" sm="12">
    <div class="event__header">
      <v-switch class="mt-0" v-model="isGoal" hide-details :label="`Status: ${setStatus}`"></v-switch>
    </div>
    <v-card class="home__container" elevation="1">
      <v-card-title class="home__header">HOME</v-card-title>
      <v-card-text class="home__content">
        <v-row justify="center">
          <v-col v-for="player in homeMembers" :key="player" cols="4" align-self="center">
            <v-btn
              rounded
              small
              color="lime lighten-2"
              @click="clickPlayer(player, 'H')"
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
          <v-col v-for="player in awayMembers" :key="player" cols="4" align-self="center">
            <v-btn
              rounded
              small
              color="lime lighten-2"
              @click="clickPlayer(player, 'A')"
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
import { createNamespacedHelpers } from "vuex";

const {
  mapState: prepareMatchState,
  mapGetters: prepareMatchGetters,
  mapMutations: prepareMatchMutations,
  mapActions: prepareMatchActions
} = createNamespacedHelpers("prepareMatch");

const {
  mapState: gameState,
  mapMutations: gameMutations,
  mapActions: gameActions
} = createNamespacedHelpers("game");

const {
  mapState: gameReportState,
  mapGetters: gameReportGetters,
  mapMutations: gameReportMutations,
  mapActions: gameReportActions
} = createNamespacedHelpers("gameReport");

export default {
  data: () => ({
    // 이벤트 기록 영역
    isGoal: true,
    firstEventType: "Goal",
    lastEventType: "Assist",
    firstPlayer: null,
    lastPlayer: null,
    firstPlayerId: null,
    lastPlayerId: null,
    teamType: null,
    homePlayerList: [],
    awayPlayerList: []
  }),
  computed: {
    ...prepareMatchState(["homeMembers", "awayMembers"]),
    ...gameReportState(["eventList"]),
    ...gameState(["gameInfo"]),
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
    await this.$emit("getHomeAwayMemberList");
  },
  methods: {
    ...gameReportActions(["getEventList", "addGameEvent"]),
    ...gameReportMutations(["ADD_EVENT"]),
    clickPlayer: function(val, type) {
      if (this.teamType !== null && this.teamType !== type) {
        alert("같은 팀을 선택해주세요.");
        this.init();
      } else if (this.firstPlayer !== null && this.firstPlayer === val.name) {
        alert("같은 사람을 선택할 수 없습니다.");
        this.init();
      } else {
        this.teamType = type;
        if (this.firstPlayer === null) {
          this.firstPlayer = val.name;
          this.firstPlayerId = val.member_id;
        } else {
          this.lastPlayer = val.name;
          this.lastPlayerId = val.member_id;
        }
      }
    },
    clickSaveButton() {
      let event = {
        game_id: this.gameInfo.id,
        event_type: this.firstEventType,
        first_player: this.firstPlayerId,
        last_player: this.lastPlayerId,
        team_type: this.teamType
      };
      // 경기 기록 추가 actions
      this.addGameEvent(event);
      // input 창 초기화
      this.init();
      // 경기기록 리스트 다시 불러와주기
      this.$emit("selectEventList");
    },
    init() {
      this.firstPlayer = null;
      this.firstPlayerId = null;
      this.lastPlayer = null;
      this.teamType = null;
      this.lastPlayerId = null;
    }
  }
};
</script>

<style lang="scss" src="../../styles/components/match/eventInput.scss"></style>
