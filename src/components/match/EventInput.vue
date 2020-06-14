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
      <v-card-text>
        <span class="data__text">
          <v-text-field
            class="data__time"
            v-model="time"
            label="시간"
            outlined
            hide-details
            dense
            placeholder="05:00"
          ></v-text-field>
        </span>
      </v-card-text>
      <v-card-text class="label__container">
        <span class="label__text">상태</span>
        <span class="label__text">선수1</span>
        <span class="label__text">상태</span>
        <span class="label__text">선수2</span>
        <v-btn class="my-1" small @click="init">
          취소
          <v-icon class="pl-2" dark small>fas fa-eraser</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text class="data__container">
        <span class="data__text fixed__type">{{ firstEventType }}</span>
        <span class="data__text">{{ firstPlayer }}</span>
        <span class="data__text fixed__type">{{ lastEventType }}</span>
        <span class="data__text">{{ lastPlayer }}</span>
        <v-btn class="my-1" small color="primary" @click="clickButton()">
          {{ buttonName }}
          <v-icon class="pl-2" dark small>fas fa-pencil-alt</v-icon>
        </v-btn>
      </v-card-text>
      <v-card-text v-if="isGoal === false">
        <v-checkbox v-model="isKeepChange" :label="`키퍼교체: ${isKeepChange.toString()}`"></v-checkbox>
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
import matchValue from "../../assets/value/match.json";
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
  props: {
    isUpdate: {
      type: Boolean,
      default: false
    },
    toggle: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    // 이벤트 기록 영역
    buttonName: "추가",
    isGoal: true,
    isKeepChange: false,
    firstEventType: "Goal",
    lastEventType: "Assist",
    firstPlayer: null,
    lastPlayer: null,
    firstPlayerId: null,
    lastPlayerId: null,
    teamType: null,
    time: "",
    homePlayerList: [],
    awayPlayerList: []
  }),
  computed: {
    ...prepareMatchState(["homeMembers", "awayMembers"]),
    ...gameReportState(["eventList", "gameReportEventInfo"]),
    ...gameState(["gameInfo"]),
    setStatus() {
      if (!this.isUpdate) {
        this.init();
      }
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
    toggle: async function() {
      if (this.isUpdate) {
        this.buttonName = "수정";
        // 상태를 맞춰준다.
        await this.setEventType();
        // 상태를 변경하고 데이터를 세팅해준다.
        this.setGameReportInfo();
      } else {
        this.init();
        this.buttonName = "추가";
      }
    }
  },
  async created() {
    await this.$emit("getHomeAwayMemberList");
  },
  methods: {
    ...gameReportActions([
      "getEventList",
      "addGameEvent",
      "getEventInfo",
      "updateGameEvent"
    ]),
    ...gameReportMutations([
      "ADD_EVENT",
      "ADD_HOME_SCORE",
      "ADD_AWAY_SCORE",
      "SUBTRACT_HOME_SCORE",
      "SUBTRACT_AWAY_SCORE"
    ]),
    addGameScore: function(eventInfo) {
      if (eventInfo.team_type === "H") {
        this.ADD_HOME_SCORE(1);
      } else if (eventInfo.team_type === "A") {
        this.ADD_AWAY_SCORE(1);
      }
    },
    subtractGameScore: function(eventInfo) {
      if (eventInfo.team_type === "H") {
        this.SUBTRACT_HOME_SCORE(1);
      } else if (eventInfo.team_type === "A") {
        this.SUBTRACT_HOME_SCORE(1);
      }
    },
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
    clickButton: async function() {
      let event = {
        time: this.time,
        event_type: this.firstEventType,
        first_player: this.firstPlayerId,
        last_player: this.lastPlayerId,
        team_type: this.teamType
      };
      if (this.isKeepChange) {
        event.event_type = "K.O";
      }

      if (this.isUpdate) {
        await this.clickUpdateButton(event);
      } else {
        await this.clickSaveButton(event);
      }

      // input 창 초기화
      this.init();
      // 경기기록 리스트 다시 불러와주기
      this.$emit("selectEventList");
    },
    clickSaveButton: async function(event) {
      event.game_id = this.gameInfo.id;
      // 경기 기록 추가 actions
      let addGameEventresult = await this.addGameEvent(event);
      // 게임 이벤트추가 결과가 true이고 골일 경우에만 스코어를 추가시켜주기 위해서.
      if (addGameEventresult && event.event_type === "Goal") {
        this.addGameScore(event);
      }
    },
    clickUpdateButton: async function(event) {
      let gameReportform = {
        gameReport_id: this.gameReportEventInfo.id,
        gameReport: event
      };
      let beforeEventType = this.gameReportEventInfo.event_type;
      // 경기 기록 추가 actions
      let updateGameEventresult = await this.updateGameEvent(gameReportform);
      /* 이벤트 타입이 변경된 경우 
      골  => 다른 걸로 변경된 경우 점수 뺴기
      다른거에서 => 골로 변경된 경우 점수 추가
     */
      let isChangeType = beforeEventType === event.event_type;
      let isGoalChangeOtehrEvent =
        beforeEventType === "Goal" && event.event_type !== "Goal";
      let isOtherChangeGoalEvent =
        beforeEventType !== "Goal" && event.event_type === "Goal";

      if (updateGameEventresult && isGoalChangeOtehrEvent) {
        this.subtractGameScore(event);
      } else if (updateGameEventresult && isOtherChangeGoalEvent) {
        this.addGameScore(event);
      }
    },
    init() {
      this.firstPlayer = null;
      this.firstPlayerId = null;
      this.lastPlayer = null;
      this.teamType = null;
      this.time = null;
      this.lastPlayerId = null;
      this.isKeepChange = false;
      this.$emit("initSaveButton");
    },
    setEventType: function() {
      if (this.gameReportEventInfo.event_type === "Goal") {
        this.isGoal = true;
      } else if (this.gameReportEventInfo.event_type === "Out") {
        this.isGoal = false;
      } else {
        this.isGoal = false;
        this.isKeepChange = true;
      }
    },
    setGameReportInfo: function() {
      this.time = this.gameReportEventInfo.time;
      this.teamType = this.gameReportEventInfo.team_type;
      this.firstPlayer = this.gameReportEventInfo.first_player_name;
      this.firstPlayerId = this.gameReportEventInfo.first_player;
      this.lastPlayer = this.gameReportEventInfo.last_player_name;
      this.lastPlayerId = this.gameReportEventInfo.last_player;
    },
    setLastEvent: function(firstType) {
      return matchValue.event_type[firstType];
    }
  }
};
</script>

<style lang="scss" src="../../styles/components/match/eventInput.scss"></style>
