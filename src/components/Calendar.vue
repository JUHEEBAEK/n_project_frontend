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
          @click:event="showEvent"
          @change="updateRange"
        />
        <v-menu
          v-model="selectedOpen"
          :close-on-content-click="false"
          :activator="selectedElement"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar color="grey lighten-4" flat tile height="40px">
              <v-spacer />
              <v-btn icon small class="mx-1">
                <v-icon small class="toolbar__icon">fas fa-edit</v-icon>
              </v-btn>
              <v-btn icon small class="mx-1">
                <v-icon small class="toolbar__icon">fas fa-trash-alt</v-icon>
              </v-btn>
              <v-btn icon small class="mx-1"  @click="selectedOpen = false">
                <v-icon small>fas fa-times</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text class="pa-2">
              <div class="item__container">
                <div class="row">
                  <div class="col-2 align-self-center">
                    <v-avatar size="20" :color="selectedEvent.color" />
                  </div>
                  <div class="col-10 text-left">
                    <div class="row">
                      <div class="col-12 py-0">
                      <span class="schedule__title" v-html="selectedEvent.name" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 py-0">
                        <span class="schedule__start"
                              v-html="selectedEvent.start" /> ~
                        <span class="schedule__end"
                              v-html="selectedEvent.end" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item__container">
                <div class="row">
                  <div class="col-2 align-self-center">
                    <v-icon>fas fa-map-marker-alt</v-icon>
                  </div>
                  <div class="col-10 text-left">
                    <div class="row">
                      <div class="col-12 py-0">
                        <span class="schedule__place"
                              v-html="selectedEvent.place" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 py-0">
                        <span class="schedule__address"
                             v-html="selectedEvent.address" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="item__container">
                <div class="row">
                  <div class="col-2">
                    <v-icon>fas fa-users</v-icon>
                  </div>
                  <div class="col-10 text-left">
                    <div class="row">
                      <div class="col-12 py-0">
                         <span class="schedule__attendance"
                               v-html="`참석자 ${selectedEvent.attendCount} 명`" />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12 py-0">
                        <span class="attendance__member"
                              v-for="(item, idx) in selectedEvent.attend"
                              :key="idx">
                          {{ item }}
                        </span>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    focus: "",
    today: new Date().toISOString().substr(0, 10),
    start: null,
    end: null,
    selectedOpen: false,
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
        attend: ["백주희", "이현아", "조명선, 이화인", "이종은", "김나경", "이지윤", "박채민", "원지향", "김지현"],
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
        attend: ["백주희", "이현아", "조명선, 이화인", "이종은", "김나경", "이지윤", "박채민",],
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
      console.log("title");
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
    showEvent ({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => this.selectedOpen = true, 10)
      };

      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    updateRange({ start, end }) {
      console.log("updateRange");
      this.start = start;
      this.end = end;
    },
    close() {
      console.log("닫아줘");
      this.selectedOpen = false
    }
  }
};
</script>

<style>
.toolbar__icon {
  font-weight: 400;
}
.schedule__place {
  color: #000;
}
.schedule__title{
  font-weight: 600;
  font-size: 18px;
}

</style>
