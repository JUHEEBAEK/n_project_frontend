<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <div class="selectHeader">
            <b>경기 종류</b>
          </div>
        </v-col>
        <v-col>
        <div class="selectHeader">
            <b>연도별</b>
          </div>
        </v-col>
        <v-col>
        <div class="selectHeader">
            <b>월별</b>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="selectBody">
            <v-radio-group v-model="selectedContest">
              <v-radio
                v-for="(contest, index) in contests"
                :key="`contest-${index}`"
                :label="contest"
                :value="contest"
              ></v-radio>
            </v-radio-group>
          </div>
        </v-col>
        <v-col>
          <div class="selectBody">
            <v-radio-group v-model="selectedYear">
              <v-radio
                v-for="(year, index) in years"
                :key="`year-${index}`"
                :label="year"
                :value="year"
              ></v-radio>
            </v-radio-group>
          </div>
        </v-col>
        <v-col> 
          <div class="selectBody">
            <v-radio-group v-model="selectedMonth">
              <v-radio
                v-for="(month, index) in months"
                :key="`month-${index}`"
                :label="month"
                :value="month"
              ></v-radio>
            </v-radio-group>
          </div>
        </v-col>
      </v-row>
    </v-container>
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

      contests: ["대회", "친선"],
      years: ["전체", 2018, 2019, 2020],
      months: ["전체", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

      selectedContest: "대회",
      selectedYear: "전체",
      selectedMonth: "전체"
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

<style scoped>
.filter-button {
}
.selectBody{
  overflow-y: auto;
  height: 200px;
  border-right: 1px solid #d5d8d8;
  border-left: 1px solid #d5d8d8;
  padding: 2px 8px;
}
.selectHeader{
  padding: 8px 0;
  border-bottom: 1px solid #d5d8d8;
  text-align: left;
  font-weight: normal;
  text-indent: 20px;
  font-size: 20px;
}
</style>
