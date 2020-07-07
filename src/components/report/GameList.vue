<template>
  <div class="gameReport__list">
    <div class="gameReport__item" v-for="(game, idx) in gameList" :key="idx">
      <div class="item__title">{{ game.date }}</div>
      <div class="item__content">
        <v-card class="game__card" v-for="(gameInfo, idx) in game.gameList" :key="idx">
          <v-card-title class="game__title">
            <span class="text__quarter">{{ gameInfo.quarter }}</span>
            <span class="text__result">{{ gameInfo.result }} - WIN</span>
          </v-card-title>
          <v-card-text>{{ gameInfo.HomeMember }}</v-card-text>
          <v-card-text>{{ gameInfo.AwayMember }}</v-card-text>
        </v-card>
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
      gameList: dummy.gameReportList
    };
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
          }
        }
      }
    }
  }
}
</style>