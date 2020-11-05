<template>
  <div class="team__main">
    팀 순위!!!!
    <div class="team__header">
      <div class="header__first">
        <span class="text__blue">2020 시즌</span> <span>팀 순위 </span>
      </div>
      <div class="header__second">
        <v-select
          class="select__season"
          v-model="season"
          :items="seasonList"
          hide-details
        ></v-select>
      </div>
    </div>
    <div class="team__content">
      <table class="rank__table">
        <thead>
          <th><strong>순위</strong></th>
          <th><strong>팀</strong></th>
          <th><strong>경기수</strong></th>
          <th><strong>승점</strong></th>
          <th><strong>승</strong></th>
          <th><strong>무</strong></th>
          <th><strong>패</strong></th>
          <th><strong>득점</strong></th>
          <th><strong>실점</strong></th>
          <th><strong>득실차</strong></th>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in rankingData" :key="item.id_unit_team">
            <td>{{ idx + 1 }}</td>
            <td>
              <div class="table__inner">
                <img width="25" height="25" class="emblem" :src="item.image" />
                <span class="name">{{ item.name }}</span>
              </div>
            </td>
            <td>{{ item.gameCount }}</td>
            <td>{{ item.victoryPoint }}</td>
            <td>{{ item.win }}</td>
            <td>{{ item.draw }}</td>
            <td>{{ item.lose }}</td>
            <td>{{ item.goalEarn }}</td>
            <td>{{ item.goalLose }}</td>
            <td>{{ item.earnAndLoss }}</td>
          </tr>
          <tr>
            <td colspan="10">
              승점 > 득실차 > 상대전적 순으로 순위가 결정된다.
            </td>
          </tr>
        </tbody>
      </table>

    </div>
  </div>
</template>

<script>
import util from "../../../mixins/util.js";

import { createNamespacedHelpers } from "vuex";
import { getLeagueRanking } from "../../../api/ranking.js";

export default {
  mixins: [util],
  data: () => ({
    rankingData: [],
    season: 2020,
    seasonList: [2020, 2019, 2018]
  }),
  computed: {
    setWinnerScore(item) {
      let winnerScore = item.win * 3 + item.draw * 1;
      console.log(item);
      return item.win * 3 + item.draw * 1;
    }
  },
  created() {
    console.log("team tab created");
    this.loadRankingData();
  },
  methods: {
    loadRankingData: async function() {
      const result = await getLeagueRanking(this.season);
      this.rankingData = await this.formatRankingData(result.data);
      this.sortByBictoryPoint();
    },
    formatRankingData: function(rankingData) {
      rankingData.forEach(item => {
        item.image = this.setTeamEmblem(item.name);
        item.victoryPoint = item.win * 3 + item.draw * 1;
        item.earnAndLoss = item.goalEarn - item.goalLose;
        item.orderValue = item.victoryPoint + (item.earnAndLoss/1000000);
      });
      return rankingData;
    },
    setTeamEmblem(name) {
      if(name === "FS팀") {
        return require("@/assets/images/emblem/team_fs.png");
      }else if(name === "난나팀") {
        return require("@/assets/images/emblem/team_nanna.png");
      }else {
        return require("@/assets/images/emblem/team_nunnu.png");
      }
    },
    sortByBictoryPoint: function() {
      this.rankingData.sort(this.dynamicSort("-orderValue"));
      // this.rankingData.sort(this.dynamicSort("-earnAndLoss"));
    }
  }
}
</script>

<style scoped lang="scss" src="@/assets/scss/components/report/tab/team.scss"></style>
