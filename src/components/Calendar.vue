<template>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat dense color="white">
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Today
          </v-btn>
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
          :events="events"
          :event-color="getEventColor"
          :now="today"
          @click:day="addEvent"
          @change="updateRange"
        >
          <!-- @click:event="showEvent" -->
        </v-calendar>
        <calendar-add :click__date="date"></calendar-add>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapMutations } = createNamespacedHelpers("calendar");

export default {
  data: () => ({
    open: true,
    focus: "",
    today: new Date().toISOString().substr(0, 10),
    start: null,
    end: null,
    selectedOpen: false,
    addCard: true,
    selectedEvent: {},
    selectedElement: null,
    events: [
      {
        name: "[훈련] 우면 다목적 구장",
        start: "2020-01-04 15:00",
        end: "2020-01-04 17:00",
        place: "우면 다목정 구장",
        address: "서울 서초구 우면동 440-5",
        attendCount: 2,
        attend: ["백주희, 이화인"],
        color: "green",
        type: "training"
      },
      {
        name: "[경기] 잠실 제 2구장",
        start: "2020-01-11 17:00",
        end: "2020-01-11 19:00",
        place: "잠실 제 2구장",
        address: "서울특별시 송파구 올림픽로 25",
        attendCount: 10,
        attend: [
          "백주희",
          "이현아",
          "조명선, 이화인",
          "이종은",
          "김나경",
          "이지윤",
          "박채민",
          "원지향",
          "김지현"
        ],
        color: "indigo",
        type: "practice"
      },
      {
        name: "[친선] 잠실 제 3구장",
        start: "2020-01-18 17:00",
        end: "2020-01-18 19:00",
        place: "잠실 제 3구장",
        address: "서울특별시 송파구 올림픽로 25",
        attendCount: 8,
        attend: [
          "백주희",
          "이현아",
          "조명선, 이화인",
          "이종은",
          "김나경",
          "이지윤",
          "박채민"
        ],
        color: "orange",
        type: "game"
      },
      {
        name: "[훈련] 풀굿",
        start: "2020-01-25 15:00",
        end: "2020-01-25 18:00",
        place: "풀굿",
        address: "서울시 관악구 은천동 봉천두산아파트 208동 상가 지하",
        attendCount: 6,
        attend: ["백주희", "이현아", "최주희", "이화인", "이종은", "김나경"],
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
    ...mapMutations(["SET_ADD_CALENDAR_MODAL"]),
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
    addEvent({ date }) {
      console.log("event 추가");
      console.log(this);
      console.log(date);
      this.SET_ADD_CALENDAR_MODAL(true);
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
      this.start = start;
      this.end = end;
    },
    close() {
      console.log("닫아줘");
      this.selectedOpen = false;
    }
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
</style>
