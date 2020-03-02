<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat color="white">
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">Today</v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small>fas fa-chevron-left</v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small>fas fa-chevron-right</v-icon>
          </v-btn>
          <v-toolbar-title>{{ title }}</v-toolbar-title>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="schedules"
          :event-color="getScheduleColor"
          :now="today"
          type="month"
          @click:event="showSchedule"
          @change="updateRange"
        ></v-calendar>
        <v-menu
          v-model="modal"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="selectedSchedule.color" dark>
              <v-btn icon>
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-toolbar-title v-html="selectedSchedule.name"></v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <span v-html="selectedSchedule.details"></span>
            </v-card-text>
            <v-card-actions>
              <v-btn text color="secondary" @click.stop="cancelButton">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: commonMapState,
  mapMutations: commonMapMutations
} = createNamespacedHelpers("common");

export default {
  data: () => ({
    focus: "",
    today: new Date().toISOString().substr(0, 10),
    start: null,
    end: null,
    selectedSchedule: {},
    selectedElement: null,
    selectedOpen: false,
    schedules: [
      {
        name: "훈련 + 자체 경기 우면 다목적 구장",
        start: "2020-01-04 15:00",
        end: "2020-01-04 17:00",
        color: "green",
        type: "training"
      },
      {
        name: "자체 경기 잠실 제 2구장",
        start: "2020-01-11 17:00",
        end: "2020-01-11 19:00",
        color: "indigo",
        type: "practice"
      },
      {
        name: "친선 경기 잠실 제 3구장",
        start: "2020-01-18 17:00",
        end: "2020-01-18 19:00",
        color: "orange",
        type: "game"
      },
      {
        name: "훈련 + 자체 경기 풀굿",
        start: "2020-01-25 15:00",
        end: "2020-01-25 18:00",
        color: "green",
        type: "training"
      }
    ],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1"
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party"
    ]
  }),
  computed: {
    ...commonMapState(["modal"]),
    title() {
      const { start, end } = this;
      if (!start || !end) {
        return "";
      }

      const startMonth = this.monthFormatter(start);
      const startYear = start.year;
      return `${startMonth} ${startYear}`;
    },
    monthFormatter() {
      return this.$refs.calendar.getFormatter({
        timeZone: "UTC",
        month: "long"
      });
    }
  },
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    ...commonMapMutations(["SET_MODAL"]),

    getScheduleColor(schedule) {
      return schedule.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    cancelButton() {
      this.SET_MODAL(false);
    },
    showSchedule({ nativeSchedule, schedule }) {
      const open = () => {
        this.selectedSchedule = schedule;
        this.selectedElement = nativeSchedule.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeSchedule.stopPropagation();
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    }
  }
};
</script>

<style></style>
