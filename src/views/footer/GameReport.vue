<template>
  <div class="gameReport__container">
    <v-app-bar flat color="white">
      <v-row>
        <v-spacer></v-spacer>
        <v-col cols="2">
          <v-select v-model="nowYear" :items="years" label="년도 선택" solo rounded />
        </v-col>
        <v-col cols="2">
          <v-select v-model="nowMonth" :items="months" label="월 선택" solo rounded />
        </v-col>
      </v-row>
    </v-app-bar>
    <report-game-list :selectedYear="nowYear" :selectedMonth="nowMonth"></report-game-list>
  </div>
</template>

<script>
import gameReportData from "../../assets/value/gameReport.json";

export default {
  data: () => ({
    years: gameReportData.years,
    months: gameReportData.months,
    scheduleList: [],
    nowYear: new Date().getFullYear(),
    nowMonth: "0" + new Date().getMonth()
  }),
  watch: {
    nowYear() {
      console.log("nowYear", this.nowYear);
    }
  },
  methods: {}
};
</script>

<style></style>
