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
              <v-menu :key="event.name" v-model="event.open" offset-x>
                <template v-slot:activator="{ on }">
                  <div
                    v-if="!event.hasDay"
                    v-ripple
                    :class="`my__event ${event.color}`"
                    v-on="on"
                    @click.stop
                    v-html="event.name"
                  ></div>
                </template>
                <calendar-add :selectedDate="date"></calendar-add>

                <calendar-event :selectedEvent="event"></calendar-event>
              </v-menu>
            </template>
          </template>

          <!-- <calendar-add :click__date="date"></calendar-add> -->
          <!-- @click:event="showEvent" -->
        </v-calendar>
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
    closeOnClick: true,
    selectedOpen: false,
    selectedEvent: {},
    addEvent: {},
    selectedElement: null,
    events: [
      {
        id: 1,
        name: "[훈련] 우면 다목적 구장",
        date: "2020-02-01",
        start: "2020-02-01 15:00",
        end: "2020-02-01 17:00",
        place: "우면 다목정 구장",
        address: "서울 서초구 우면동 440-5",
        attendCount: 2,
        attend: ["백주희, 이화인"],
        color: "grape",
        type: "training",
        open: false
      },
      {
        id: 2,
        name: "[경기] 잠실 제 2구장",
        date: "2020-02-08",
        start: "2020-02-08 17:00",
        end: "2020-02-08 19:00",
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
        color: "sage",
        type: "practice",
        open: false
      },
      {
        id: 3,
        name: "[친선] 잠실 제 3구장",
        date: "2020-02-15",
        start: "2020-02-15 17:00",
        end: "2020-02-15 19:00",
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
        color: "lavender",
        type: "game",
        open: false
      },
      {
        id: 4,
        name: "[훈련] 풀굿",
        date: "2020-02-22",
        start: "2020-02-22 15:00",
        end: "2020-02-22 18:00",
        place: "풀굿",
        address: "서울시 관악구 은천동 봉천두산아파트 208동 상가 지하",
        attendCount: 6,
        attend: ["백주희", "이현아", "최주희", "이화인", "이종은", "김나경"],
        color: "grape",
        type: "training",
        open: false
      },
      {
        id: 5,
        name: "[대회] 수원 에스빌드 파크",
        date: "2020-02-29",
        start: "2020-02-29 09:00",
        end: "2020-02-22 13:00",
        place: "수원 에스빌드 파크",
        address: "수원시",
        attendCount: 8,
        attend: [
          "백주희",
          "이현아",
          "최주희",
          "이화인",
          "이종은",
          "김나경",
          "함박눈",
          "윤영임"
        ],
        color: "banana",
        type: "training",
        open: false
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
    },
    eventsMap() {
      const map = {};
      this.events.forEach(e => {
        console.log(e);
        (map[e.date] = map[e.date] || []).push(e);
      });
      console.log(map);
      return map;
    }
  },
  methods: {
    ...mapMutations(["SET_ADD_CALENDAR_MODAL"]),
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
      this.events.push({
        name: "(제목없음)",
        date: event.date,
        start: event.date,
        end: event.date,
        place: "",
        address: "",
        color: "sage",
        type: "practice",
        new: true,
        open: true
      });
      this.SET_ADD_CALENDAR_MODAL(true);
    },
    getEventColor(event) {
      console.log(event);
      return event.color;
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
