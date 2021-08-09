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
            v-if="nowMonth"
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
      @clickGame="goGameDetail"
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
    nowYear: null,
    nowMonth: null
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
      this.replaceUrlParams();
    },
    nowMonth() {
      this.replaceUrlParams();
    }
  },
  created() {
    this.nowYear = Number(this.$route.query.year) || new Date().getFullYear();
    this.nowMonth =
      Number(this.$route.query.month) || new Date().getMonth() + 1;
  },
  methods: {
    goGameDetail({ gameInfo, scheduleId }) {
      this.$router.push({
        name: "gameDetails",
        params: { gameId: gameInfo.id, scheduleId: scheduleId }
      });
    },
    replaceUrlParams() {
      this.$router
        .push({
          query: { year: this.nowYear, month: this.nowMonth }
        })
        .catch(err => {
          // 에러 로그 발생 시키지 않기 위함
        });
    }
  }
};
</script>

<style></style>
