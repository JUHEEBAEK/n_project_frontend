<template>
  <div class="gameInfo__container">
    <v-progress-linear v-show="isLoading" indeterminate color="primary"></v-progress-linear>
    <div class="gameInfo__header">
      <div class="header__first">
        <span class="px-1 text__type">{{ formatGameType(gameInfo.type) }}</span>
        <span class="px-1 text__date">{{ $moment(gameInfo.date).format("D MMM YYYY") }}</span>
      </div>
      <div class="header__second">
        <span class="text__staduim">{{ gameInfo.stadium_name}}</span>
      </div>
    </div>
    <div class="gameInfo__content">
      <div class="home__container">
        <div class="home__emblem">
          <v-avatar class="emblem" size="124">
            <v-img aspect-ratio="1" cover :src="$imgBaseUrl + homeEmblem" />
          </v-avatar>
        </div>
        <div class="title__name">NNNN - HOME</div>
      </div>
      <div class="score__container">
        <div class="text__bigTitle">{{ gameInfo.home_score }} : {{ gameInfo.away_score }}</div>
        <div class="text__description">
          <span class="mr-4 mb-1">{{ `Quarter ${gameInfo.quarter}`}}</span>
          <v-icon small>fas fa-stopwatch</v-icon>
          <span class="mx-1">10 '</span>
        </div>
      </div>
      <div class="away__container">
        <div class="away__emblem">
          <v-avatar class="emblem" size="124">
            <v-img aspect-ratio="1" cover :src="$imgBaseUrl + awayEmblem" />
          </v-avatar>
        </div>
        <div class="title__name">NNNN - AWAY</div>
      </div>
    </div>
  </div>
</template>

<script>
import gameValue from "../../assets/value/gameReport.json";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: gameMapState,
  mapActions: gameMapAction
} = createNamespacedHelpers("game");

export default {
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
  data() {
    return {
      homeEmblem: "emblem/nnnn_emblem01.jpg",
      awayEmblem: "emblem/nnnn_emblem02.jpg",
      isLoading: false
    };
  },
  methods: {
    ...gameMapAction(["getMultiplexGameInfo"]),
    getGameInfo: async function(gameId) {
      this.isLoading = true;
      this.gameInfo = await this.getMultiplexGameInfo(gameId);
      console.log("gameInfo.vue ; ", this.gameInfo);
      this.isLoading = false;
    },
    formatGameType(gameType) {
      console.log(gameType);
      return gameValue.gameTypeFormat[gameType];
    }
  }
};
</script>

<style lang="scss" scoped src="../../styles/components/report/gameInfo.scss"></style>
