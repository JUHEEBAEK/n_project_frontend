<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat dense color="white">
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
          type="month"
          :now="today"
          @click:day="schedule => dateClick(schedule, true)"
          @change="updateRange"
        >
          <template v-slot:day="{ date }">
            <template v-for="schedule in schedulesMap[date]">
              <v-menu
                :key="schedule.name"
                v-model="schedule.open"
                :close-on-content-click="false"
                offset-x
                offset-y
                offset-overfloww
              >
                <template v-slot:activator="{ on }">
                  <div
                    v-ripple
                    class="my__schedule"
                    :style="`background-color:${schedule.color}`"
                    v-on="on"
                    @click.stop
                    v-html="schedule.name"
                    @click="load_member(schedule.id)"
                  ></div>
                </template>

                <calendar-schedule :selectedSchedule="schedule" @close="close(schedule)"></calendar-schedule>
                <calendar-fullSchedule :scheduleId="schedule.id" @closeEvent="close(schedule)"></calendar-fullSchedule>
              </v-menu>
            </template>

            <calendar-add :newScheduleBox="newScheduleBox" :selectedDate="clickDay" :day="date"></calendar-add>
          </template>
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import stringSchedules from "../assets/value/Schedule.json";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: calendarMapState,
  mapMutations: calendarMapMutations,
  mapActions: calendarMapActions
} = createNamespacedHelpers("calendar");

export default {
  data: () => ({
    open: true,
    focus: "",
    today: new Date().toISOString().substr(0, 10),
    start: null,
    end: null,
    clickDay: "",
    closeOnClick: true,
    selectedOpen: false,
    selectedSchedule: {},
    selectedElement: null
  }),
  computed: {
    ...calendarMapState(["newScheduleBox", "scheduleList"]),
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
    },
    schedulesMap() {
      const map = {};
      this.scheduleList.forEach(e => {
        e.color = this.getScheduleColor(e.type);
        (map[e.date] = map[e.date] || []).push(e);
      });
      return map;
    }
  },
  methods: {
    ...calendarMapMutations(["SET_NEW_SCHEDULE_MODAL"]),
    ...calendarMapActions(["select_schedule", "load_member"]),
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    dateClick(Schedule, isAdd) {
      this.clickDay = Schedule.date;
      this.SET_NEW_SCHEDULE_MODAL(!this.newScheduleBox);
    },
    getScheduleColor(type) {
      return stringSchedules.types[type].color;
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },
    close(schedule) {
      schedule.open = false;
    }
  },
  mounted() {
    this.select_schedule();
  }
};
</script>

<style scoped>
.toolbar__icon {
  font-weight: 400;
}
.schedule__place {
  color: #000;
}
.schedule__title {
  font-weight: 600;
  font-size: 18px;
}
.my__schedule {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  color: #fff;
  height: 20px;
  width: 95%;
  margin-bottom: 1px;
  font-size: 11px;
  padding: 3px;
  border-radius: 4px;
  cursor: pointer;
}
</style>