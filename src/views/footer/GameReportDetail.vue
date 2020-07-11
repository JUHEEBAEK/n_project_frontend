<template>
  <div>
    <report-game-info :gameInfo="gameInfo"></report-game-info>
    <report-position-view :game_id="game_id"></report-position-view>
    <report-event-list :gameInfo="gameInfo" :gameEventList="eventList"></report-event-list>
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

export default {
  name: "TesmSetting",
  props: {
    game_id: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    ...gameMapState(["gameInfo"]),
    ...gameReportState(["eventList"]),
    ...prepareMatchState(["homeMembers", "awayMembers"])
  },
  async created() {
    await this.getGameInfo(this.game_id);
    this.getHomeAwayMemberList();
    this.selectEventList();
  },
  methods: {
    ...gameMapAction(["getMultiplexGameInfo"]),
    ...gameReportActions(["getEventList"]),
    ...gameReportMutations(["SET_EVENT_INFO"]),
    ...prepareMatchActions(["getHomeAwayMember"]),
    getGameInfo: async function(gameId) {
      // TODO: loadingBar 추가해주기 setLoadingBar
      this.gameInfo = await this.getMultiplexGameInfo(gameId);
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
