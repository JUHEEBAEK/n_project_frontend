<template>
  <div>
    <report-game-info :gameInfo="gameInfo"></report-game-info>
    <report-position-view :game_id="game_id"></report-position-view>
    <report-event-list :game_id="game_id"></report-event-list>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: gameMapState,
  mapActions: gameMapAction
} = createNamespacedHelpers("game");

export default {
  name: "TesmSetting",
  props: {
    game_id: {
      type: [String, Number],
      default: null
    }
  },
  computed: {
    ...gameMapState(["gameInfo"])
  },
  created() {
    this.getGameInfo(this.game_id);
  },
  methods: {
    ...gameMapAction(["getMultiplexGameInfo"]),
    getGameInfo: async function(gameId) {
      // TODO: loadingBar 추가해주기 setLoadingBar
      this.gameInfo = await this.getMultiplexGameInfo(gameId);
    }
  }
};
</script>

<style scoped></style>
