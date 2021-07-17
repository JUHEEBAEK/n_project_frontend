<template>
  <div>
    <core-breadcrumbs :items="items" />
    <report-game-info
      :game-info="gameInfo"
      :quarter-list="gameList"
    ></report-game-info>
    <report-position-view :game_id="game_id"></report-position-view>
    <report-event-list
      :game-info="gameInfo"
      :game-event-list="eventList"
    ></report-event-list>
    <util-spinner v-if="loading"></util-spinner>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: gameMapState,
  mapActions: gameMapAction
} = createNamespacedHelpers("game");

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

import util from "../../mixins/util.js";

export default {
  name: "TesmSetting",
  mixins: [util],
  props: {
    gameId: {
      type: [String, Number],
      default: null
    },
    scheduleId: {
      type: [String, Number],
      default: null
    }
  },
  data: () => ({
    items: [
      {
        text: "경기 리스트",
        disabled: false,
        href: "/gameReport"
      },
      {
        text: "경기 리포트",
        disabled: true
      }
    ]
  }),
  computed: {
    ...gameMapState(["gameInfo", "gameList"]),
    ...gameReportState(["eventList"]),
    ...prepareMatchState(["homeMembers", "awayMembers"])
  },
  async created() {
    await this.getGameInfo(this.game_id);
    await this.getGameListWithScheduleId(this.schedule_id);
    this.getHomeAwayMemberList();
    this.selectEventList();
  },
  methods: {
    ...gameMapAction(["getMultiplexGameInfo", "getGameListWithScheduleId"]),
    ...gameReportActions(["getEventList"]),
    ...gameReportMutations(["SET_EVENT_INFO"]),
    ...prepareMatchActions(["getHomeAwayMember"]),
    getGameInfo: async function(gameId) {
      // TODO: loadingBar 추가해주기 setLoadingBar
      this.setLoadingBar(true);
      this.gameInfo = await this.getMultiplexGameInfo(gameId);
      this.setLoadingBar(false);
    },
    getHomeAwayMemberList: async function() {
      let scheduleAndQuarter = {
        schedule_id: this.gameInfo.schedule_id,
        quarter: this.gameInfo.quarter
      };
      let homeAwayMembers = await this.getHomeAwayMember(scheduleAndQuarter);
    },
    selectEventList: async function() {
      await this.getEventList(this.game_id);
    }
  }
};
</script>

<style scoped></style>
