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
          @click:day="event => dateClick(event, true)"
          @change="updateRange"
        >
          <template v-slot:day="{ date }">
            <template v-for="event in eventsMap[date]">
              <v-menu
                :key="event.name"
                v-model="event.open"
                :close-on-content-click="false"
                :nudge-width="250"
                offset-x
                offset-y
                offset-overfloww
              >
                <template v-slot:activator="{ on }">
                  <div
                    v-ripple
                    :class="`my__event ${event.color}`"
                    v-on="on"
                    @click.stop
                    v-html="event.name"
                  ></div>
                </template>

                <calendar-event :selectedEvent="event" @close="close(event)"></calendar-event>
                <calendar-fullEvent :selectedEvent="event"></calendar-fullEvent>
              </v-menu>
            </template>

            <calendar-add :newEventBox="newEventBox" :selectedDate="clickDay" :day="date"></calendar-add>
          </template>
          <!-- <calendar-add :click__date="date"></calendar-add> -->
          <!-- @click:event="showEvent" -->
        </v-calendar>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import stringSchedule from "../assets/value/stringSchedule.json";

import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "calendar"
);

export default {
  data: () => ({
    open: true,
    focus: "",
    today: new Date().toISOString().substr(0, 10),
    start: null,
    end: null,
    clickDay: "",
    // newEventBox: false,
    closeOnClick: true,
    selectedOpen: false,
    selectedEvent: {},
    selectedElement: null,
    events: stringSchedule.events
  }),
  computed: {
    ...mapState(["newEventBox", "eventList"]),
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
    eventsMap() {
      const map = {};
      this.eventList.forEach(e => {
        console.log(e);
        (map[e.date] = map[e.date] || []).push(e);
      });
      console.log(map);
      return map;
    }
  },
  methods: {
    ...mapMutations(["SET_NEW_EVENT_MODAL"]),
    ...mapActions(["select_event"]),
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    dateClick(event, isAdd) {
      console.log(event);
      this.clickDay = event.date;
      this.SET_NEW_EVENT_MODAL(!this.newEventBox);
    },
    getEventColor(event) {
      console.log(event);
      return event.color;
    },
    updateRange({ start, end }) {
      this.start = start;
      this.end = end;
    },
    close(event) {
      console.log("닫아줘");
      console.log(event.open);
      event.open = false;
    }
  },
  mounted() {
    this.select_event();
    console.log("예시 events");
    console.log(this.events);
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
.my__event {
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

.no__event {
}
</style>
