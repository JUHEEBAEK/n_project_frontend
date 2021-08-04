<template>
  <div class="gameReport__container ma-3">
    <v-app-bar prominent flat color="white">
      <v-row>
        <v-col cols="6" xs="6" sm="6" md="3" lg="2" xl="2">
          <v-select
            v-model="nowYear"
            :items="years"
            label="년도 선택"
            solo
            rounded
          />
        </v-col>
        <v-col cols="6" xs="6" sm="6" md="3" lg="2" xl="2">
          <v-select
            v-model="nowMonth"
            :items="months"
            label="월 선택"
            solo
            rounded
          />
        </v-col>
      </v-row>
    </v-app-bar>
    <report-game-list
      :game_id="game_id"
      :selected-year="nowYear"
      :selected-month="nowMonth"
    ></report-game-list>
  </div>
</template>

<script>
export default {
  props: {
    gameId: {
      type: [String, Number],
      default: null
    }
  },
  data: () => ({
    months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    nowYear: new Date().getFullYear(),
    nowMonth: new Date().getMonth() + 1
  }),
  computed: {
    years() {
      let years = [];
      let startYear = 2018;
      while (startYear <= new Date().getFullYear()) {
        years.push(startYear++);
      }
      return years;
    }
  },
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
