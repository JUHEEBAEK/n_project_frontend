<template>
  <v-col cols="12" xl="6" lg="6" sm="12">
    <v-card class="report__container" elevation="1" color="#cfead0">
      <v-card-title class="report__header">
        <span class="report__title">게임 기록</span>
        <span
          class="report__score"
          v-if="homeScore !== undefined"
        >{{ `${homeScore} : ${awayScore} `}}</span>
      </v-card-title>
      <v-card-text class="report__content">
        <v-timeline class="report__timeline">
          <v-timeline-item
            class="report__item"
            v-for="gameReport in gameEventList"
            :key="gameReport"
            small
            fill-dot
            color="white"
            :right="gameReport.team_type === 'A' ? true : false"
            :left="gameReport.team_type === 'H' ? true : false"
            :icon="searchProperTimelineIcon(gameReport.event_type)"
            icon-color="black"
          >
            <v-chip
              class="firstEvent ma-2"
              close
              color="#dce775"
              text-color="black"
              close-icon="fas fa-times-circle"
              @click:close="deleteButton(gameReport)"
            >
              <span>{{ gameReport.first_player_name }}</span>
              <v-avatar left>
                <v-icon x-small>{{ searchProperChipIcon(gameReport.event_type, "first")}}</v-icon>
              </v-avatar>
              <span class="lastEvent ma-1">{{ gameReport.last_player_name }}</span>
              <v-avatar left>
                <v-icon x-small>{{ searchProperChipIcon(gameReport.event_type, "second")}}</v-icon>
              </v-avatar>
            </v-chip>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import matchValue from "../../assets/value/match.json";

import { createNamespacedHelpers } from "vuex";
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
  created() {},
  props: {
    gameEventList: {
      default: null,
      type: Object
    }
  },
  data: () => ({}),
  computed: {
    ...gameState(["gameInfo"]),
    ...gameReportState(["homeScore", "awayScore"])
  },
  methods: {
    ...gameReportActions(["deleteGameEvent"]),
    ...gameReportMutations(["SUBTRACT_HOME_SCORE", "SUBTRACT_AWAY_SCORE"]),
    subtractScore: function(gameEvent) {
      if (gameEvent.team_type === "H") {
        this.SUBTRACT_HOME_SCORE(1);
      } else if (gameEvent.team_type === "A") {
        this.SUBTRACT_AWAY_SCORE(1);
      }
    },
    deleteButton: async function(gameReport) {
      this.gameEventList.forEach(async (gameEvent, idx) => {
        if (gameEvent.id === gameReport.id) {
          let body = {
            gameReport_id: gameReport.id
          };
          // 게임 이벤트를 삭제하는 결과를 받아온다. 받아온 결과로 점수를 1점 뺜다.
          let result = await this.deleteGameEvent(body);
          // 이벤트가 정상적으로 삭제 될 경우에만 실행이 된다.
          if (result && gameEvent.event_type === "Goal") {
            this.subtractScore(gameEvent);
          }
          this.$emit("selectEventList");
        }
      });
    },
    searchProperTimelineIcon: function(iconType) {
      return matchValue.gameReportEventTimeLineIcon[iconType];
    },
    searchProperChipIcon: function(iconType, order) {
      if (order === "first") {
        return matchValue.gameReportEventChipFirstIcon[iconType];
      } else if (order === "second") {
        return matchValue.gameReportEventChipSecondIcon[iconType];
      }
    }
  }
};
</script>

<style lang="scss" src="../../styles/components/match/eventList.scss"></style>
