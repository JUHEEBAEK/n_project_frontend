<template>
  <div class="gameReport__list">
    <div class="gameReport__item" v-for="(game, idx) in gameList" :key="idx">
      <div class="item__title">{{ game.date }}</div>
      <div class="item__content">
        <v-slide-group v-model="model" center-active class="pa-4" show-arrows>
          <v-slide-item v-for="(gameInfo, idx) in game.gameList" :key="idx">
            <v-card class="game__card" @click="clickGame(gameInfo)">
              <v-card-title class="game__title">
                <span class="text__quarter">{{ gameInfo.quarter }}</span>
                <span class="text__result">
                  {{ gameInfo.result }}
                  <span class="text__caption">- WIN</span>
                </span>
              </v-card-title>
              <v-card-text>
                <span class="text__score">{{ gameInfo.homeScore }}</span>
                <span class="text__score px-3">:</span>
                <span class="text__score">{{ gameInfo.awayScore }}</span>
              </v-card-text>
              <v-card-text>
                <v-badge class="mr-3" color="#ccda11" dot></v-badge>
                <v-chip
                  v-for="(item, idx) in gameInfo.homeMember"
                  :key="idx"
                  class="mx-1"
                  x-small
                >{{ item }}</v-chip>
              </v-card-text>
              <v-card-text>
                <v-badge class="mr-3" color="#da8c11" dot></v-badge>
                <v-chip
                  v-for="(item, idx) in gameInfo.awayMember"
                  :key="idx"
                  class="mx-1"
                  x-small
                >{{ item }}</v-chip>
              </v-card-text>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </div>
      <v-divider class="mt-3" />
    </div>
  </div>
</template>

<script>
import dummy from "../../assets/value/dummy.json";

export default {
  data() {
    return {
      model: null,
      gameList: dummy.gameReportList
    };
  },
  methods: {
    clickGame: function(gameInfo) {
      console.log("clickGame", gameInfo);
      this.$router.push({
        path: "/gameReport/details/" + gameInfo.id,
        name: "gameDetails",
        params: { gameId: gameInfo.id }
      });
    }
  }
};
</script>

<style lang="scss">
.gameReport__list {
  .gameReport__item {
    .item__title {
      text-align: left;
      font-weight: 700;
      font-size: 1.4rem;
      color: #34558b;
    }
    .item__content {
      display: flex;
      flex-direction: row;
      .game__card {
        margin: 5px;
        .game__title {
          display: flex;
          justify-content: space-between;
          .text__quarter {
            font-weight: 300;
          }
          .text__result {
            font-size: 1.3rem;
            font-weight: 600;
            .text__caption {
              font-weight: 300;
              font-size: 1rem;
              color: #666666;
            }
          }
        }
        .text__score {
          font-size: 2.4rem;
        }
      }
    }
  }
}
</style>