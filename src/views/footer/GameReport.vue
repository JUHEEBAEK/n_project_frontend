<template>
  <div class="gameReport__container ma-3">
    <v-app-bar prominent flat color="white">
      <v-row>
<<<<<<< HEAD
        <!-- <v-col cols="12" xs="12" sm="12" md="2" lg="2" xl="2">
          <v-btn outlined @click="movePage">리그전</v-btn>
        </v-col> -->
        <v-spacer></v-spacer>
=======
>>>>>>> develop
        <v-col cols="6" xs="6" sm="6" md="3" lg="2" xl="2">
          <v-select v-model="nowYear" :items="years" label="년도 선택" solo rounded />
        </v-col>
        <v-col cols="6" xs="6" sm="6" md="3" lg="2" xl="2">
          <v-select v-model="nowMonth" :items="months" label="월 선택" solo rounded />
        </v-col>
      </v-row>
    </v-app-bar>
    <report-game-list :game_id="game_id" :selectedYear="nowYear" :selectedMonth="nowMonth"></report-game-list>
  </div>
</template>

<script>
import gameReportData from "@/assets/value/gameReport.json";

export default {
  props: {
    game_id: {
      type: [String, Number],
      default: null
    }
  },
  data: () => ({
    years: gameReportData.years,
    months: gameReportData.months,
    scheduleList: [],
    nowYear: new Date().getFullYear(),
    nowMonth: new Date().getMonth() + 1
  }),
  watch: {
    nowYear() {
      console.log("nowYear", this.nowYear);
    }
  },
  methods: {
    movePage() {
      this.$router.push({
        name: "leagueReport",
        params: { season: this.nowYear }
      });
    }
  }
};
</script>

<style></style>
