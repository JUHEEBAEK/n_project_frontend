<template>
  <div>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="64">
          <v-toolbar flat color="white">
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Today
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small>fas fa-chevron-left</v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small>as fa-chevron-right</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>
            <v-spacer />
            <v-menu bottom right>
              <template v-slot:activator="{ on }">
                <v-btn outlined color="grey darken-2" v-on="on">
                  <span>{{ typeToLabel[type] }}</span>
                  <v-icon right>fas fa-caret-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item @click="type = 'month'">
                  <v-list-item-title>Month</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-toolbar>
        </v-sheet>
        <v-sheet height="600">
          <v-calendar
            ref="calendar"
            v-model="focus"
            color="primary"
            :events="events"
            :event-color="getEventColor"
            :now="today"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
            @change="updateRange"
          />
          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card color="grey lighten-4" min-width="350px" flat>
              <v-toolbar :color="selectedEvent.color" dark>
                <v-btn icon>
                  <v-icon>fas fa-pencil-alt</v-icon>
                </v-btn>
                <v-toolbar-title v-html="selectedEvent.name" />
                <v-spacer />
                <v-btn icon>
                  <v-icon>fas fa-heart</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>fas fa-ellipsis-v</v-icon>
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <span v-html="selectedEvent.details" />
              </v-card-text>
              <v-card-actions>
                <v-btn text color="secondary" @click="selectedOpen = false">
                  Cancel
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    focus: "",
    type: "month",
    today: new Date().toISOString().substr(0, 10),
    typeToLabel: {
      month: "Month"
    },
    start: null,
    end: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events2: [],
    events: [
      { name: "훈련 + 자체 경기 우면 다목적 구장", start: "2020-01-04 15:00", end: "2020-01-04 17:00", color: "green", type: "training"},
      { name: "자체 경기 잠실 제 2구장", start: "2020-01-11 17:00", end: "2020-01-11 19:00", color: "indigo", type: "practice"},
      { name: "친선 경기 잠실 제 3구장", start: "2020-01-18 17:00", end: "2020-01-18 19:00", color: "orange", type: "game"},
      { name: "훈련 + 자체 경기 풀굿", start: "2020-01-25 15:00", end: "2020-01-25 18:00", color: "green", type: "training"},
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
    viewDay({ date }) {
      console.log('select viewDay');
      this.focus = date;
      console.log(this.focus);
    },
    getEventColor(event) {
      return event.color;
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
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    updateRange({ start, end }) {
      const events = [];
/*

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: this.formatDate(first, !allDay),
          end: this.formatDate(second, !allDay),
          color: this.colors[this.rnd(0, this.colors.length - 1)]
        });
      }
*/

      this.start = start;
      this.end = end;
    },
    nth(d) {
      return d > 3 && d < 21
        ? "th"
        : ["th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th"][d % 10];
    },
    /*rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    formatDate(a, withTime) {
      return withTime
        ? `${a.getFullYear()}-${a.getMonth() +
            1}-${a.getDate()} ${a.getHours()}:${a.getMinutes()}`
        : `${a.getFullYear()}-${a.getMonth() + 1}-${a.getDate()}`;
    }*/
  }
};
</script>

<style scoped></style>
