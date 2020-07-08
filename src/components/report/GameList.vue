<template>
  <div class="gameReport__list">
    <div
      class="gameReport__item"
      v-for="schedule in filteredSchedule"
      :key="schedule.id"
    >
      <div class="item__title">{{ schedule.date }}</div>
      <div class="item__content">
        <v-slide-group v-model="model" center-active class="pa-4" show-arrows>
          <v-slide-item
            v-for="(gameInfo, index) in schedule.gameList"
            :key="index"
          >
            <v-card class="game__card" @click="clickGame(gameInfo)">
              <v-card-title class="game__title">
                <span class="text__quarter">{{ gameInfo.quarter }}</span>
                <span class="text__result">
                  {{ gameInfo.result }}
                  <span class="text__caption">- WIN</span>
                </span>
              </v-card-title>
              <v-card-text>
                <span class="text__score">{{ gameInfo.home_score }}</span>
                <span class="text__score px-3">:</span>
                <span class="text__score">{{ gameInfo.away_score }}</span>
              </v-card-text>
              <v-card-text>
                <v-badge class="mr-3" color="#ccda11" dot></v-badge>
                <v-chip
                  v-for="(item, idx) in homeMember"
                  :key="idx"
                  class="mx-1"
                  x-small
                  >{{ item }}</v-chip
                >
              </v-card-text>
              <v-card-text>
                <v-badge class="mr-3" color="#da8c11" dot></v-badge>
                <v-chip
                  v-for="(item, idx) in awayMember"
                  :key="idx"
                  class="mx-1"
                  x-small
                  >{{ item }}</v-chip
                >
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
import { createNamespacedHelpers } from "vuex";

const {
  mapState: calendarMapState,
  mapActions: calendarMapActions
} = createNamespacedHelpers("calendar");

const {
  mapState: gameMapState,
  mapMutations: gameMutations,
  mapActions: gameActions
} = createNamespacedHelpers("game");

export default {
  props: {
    selectedYear: String,
    selectedMonth: String
  },
  computed: {
    ...calendarMapState(["scheduleList"]),
    ...gameMapState(["gameList"])
  },
  async beforeMount() {
    await this.getScheduleList();
    this.getGameList();
  },
  watch: {
    selectedYear() {
      this.filteredSchedule = this.selectedFilterlingDate(this.scheduleList);
      this.divideSchduleIdInGame();
    },
    selectedMonth() {
      this.filteredSchedule = this.selectedFilterlingDate(this.scheduleList);
      this.divideSchduleIdInGame();
    }
  },
  data() {
    return {
      model: null,
      filteredSchedule: [],
      homeMember: ["주희", "채민", "종은", "솔잎", "아란"],
      awayMember: ["명선", "화인", "나경", "소연", "지윤"]
    };
  },
  methods: {
    ...calendarMapActions(["select_schedule"]),
    ...gameActions(["selectGameList"]),
    clickGame: function(gameInfo) {
      this.$router.push({
        path: "/gameReport/details/" + gameInfo.id,
        name: "gameDetails",
        params: { gameId: gameInfo.id }
      });
    },
    getGameList: async function() {
      this.gameList = await this.selectGameList();
      this.divideSchduleIdInGame();
    },
    getScheduleList: async function() {
      this.scheduleList = await this.select_schedule();
      this.filteredSchedule = this.selectedFilterlingDate(this.scheduleList);
    },
    selectedFilterlingDate: function(scheduleList) {
      let filteringDate = this.selectedYear + "-" + this.selectedMonth;
      return scheduleList.filter(
        scheduleInfo => scheduleInfo.date.indexOf(filteringDate) > -1
      );
    },
    selectedFilterlingScheduleId: function(schedule_id) {
      return this.gameList.filter(
        gameInfo => gameInfo.schedule_id == schedule_id
      );
    },
    divideSchduleIdInGame: function() {
      this.filteredSchedule.forEach(element => {
        let gameList = this.selectedFilterlingScheduleId(element.id);
        element.gameList = gameList;
      });
      this.filteredSchedule.push({});
      this.filteredSchedule.pop();
      console.log(this.filteredSchedule);
    }
  }
};
</script>

<style
  lang="scss"
  scoped
  src="../../styles/components/report/gameList.scss"
></style>
