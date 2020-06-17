<template>
  <div>
    <div class="filter-button">
      <v-btn> 대회 </v-btn>
      <v-btn> 친선 </v-btn>
    </div>
    <div class="filter-date">
      <v-select :items="years" label="Year" solo></v-select>
      <v-select :items="months" label="Month" solo></v-select>
    </div>
    <v-card color="basil">
      <v-card-title class="text-center justify-center py-6">
        <h1 class="font-weight-bold display-3 basil--text">NNNN Ranking</h1>
      </v-card-title>
      <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
        <v-tab v-for="(item, index) in tabItems" :key="index">{{ item }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(item, index) in tabItems" :key="index">
          <v-card color="basil" flat>
            <ranking-table :tableData="rankingData[item]"></ranking-table>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
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
      tab: null,
      tabItems: ["GOAL", "ASSIST", "CLEAN_SHEET"],
      years: ["전체", 2018, 2019, 2020],
      monrths: ["전체", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    };
  },
  computed: {
    ...rankingMapState(["rankingData"])
  },
  created() {
    this.get_goal_ranking();
    this.get_assist_ranking();
    this.get_clean_sheet_ranking();
  },
  methods: {
    ...rankingMapActions([
      "get_goal_ranking",
      "get_assist_ranking",
      "get_clean_sheet_ranking"
    ])
  }
};
</script>

<style scoped></style>
