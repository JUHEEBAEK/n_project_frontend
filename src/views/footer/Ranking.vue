<template>
  <div>
    <h1>리그전 리포트 페이지</h1>
    <div class="bottom__tab">
      <v-tabs v-model="tabs">
        <v-tabs-slider></v-tabs-slider>
        <v-tab href="#PERSONAL" class="tab__item">
          <span
            v-if="tabs === 'PERSONAL'"
            class="item__text-active primary--text"
            >개인 순위</span
          >
          <span v-else class="item__text">개인 순위</span>
        </v-tab>
        <v-tab href="#TEAM" class="tab__item">
          <span v-if="tabs === 'TEAM'" class="item__text-active primary--text"
            >리그 전 팀 순위</span
          >
          <span v-else class="item__text">리그 전 팀 순위</span>
        </v-tab>
      </v-tabs>
    </div>
    <div class="bottom__divider"></div>
    <div class="bottom__content">
      <div v-if="tabs === 'TEAM'" class="content__general">
        <report-tab-team></report-tab-team>
      </div>
      <div v-if="tabs === 'PERSONAL'" class="content__general">
        <ranking-filter @filterChanged="filterRanking" />
        <v-card>
          <v-card-title class="text-center justify-center py-6">
            <div class="font-weight-bold display-3">N-Ranking</div>
          </v-card-title>
          <v-card-subtitle>
            <span
              >단, 랭킹을 계수하는 기준은 깍두기 없이 5, 6명 실외 구장을
              기준으로 한다.
            </span>
          </v-card-subtitle>
          <v-tabs v-model="tab" background-color="transparent" grow>
            <v-tab v-for="(item, index) in tabItems" :key="index">
              {{ item }}
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="(item, index) in tabItems" :key="index">
              <v-card flat>
                <ranking-table
                  :table-data="rankingData[item]"
                  :played-matched="rankingData['ATTEND']"
                ></ranking-table>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: rankingMapState,
  mapActions: rankingMapActions
} = createNamespacedHelpers("ranking");

export default {
  name: "TesmSetting",
  data() {
    return {
      tabs: null,
      tab: null,
      tabItems: ["GOAL", "ASSIST", "CLEAN_SHEET"]
    };
  },
  computed: {
    ...rankingMapState(["rankingData"])
  },
  created() {},
  methods: {
    ...rankingMapActions([
      "get_goal_ranking",
      "get_assist_ranking",
      "get_clean_sheet_ranking",
      "get_goal_ranking_filter",
      "get_assist_ranking_filter",
      "get_clean_sheet_ranking_filter",
      "get_attend_ranking_filter"
    ]),
    filterRanking(filter) {
      this.get_goal_ranking_filter(filter);
      this.get_assist_ranking_filter(filter);
      this.get_clean_sheet_ranking_filter(filter);
      this.get_attend_ranking_filter(filter);
    }
  }
};
</script>

<style scoped></style>
