<template>
  <v-col cols="12">
    <v-card class="report__container" elevation="1">
      <v-card-title class="report__header">
        <span class="report__title">게임 기록</span>
        <span class="report__score">{{ `${homeScore} : ${awayScore} `}}</span>
      </v-card-title>
      <v-card-text class="report__content">
        <v-row v-resize="onResize">
          <v-col cols="12" sm>
            <v-timeline :dense="windowSize.x < 400 ? true : false">
              <v-timeline-item
                v-for="(event, i) in gameEventList"
                :key="i"
                color="#187c5a"
                fill-dot
                small
                :right="event.team_type === 'A' ? true : false"
                :left="event.team_type === 'H' ? true : false"
              >
                <template v-slot:opposite>
                  <span class="event__time-text" v-text="event.event_time"></span>
                </template>
                <div
                  class="py-4 text-left"
                  :class="windowSize.x < 400 ? `` : event.team_type === 'A' ? `pl-4`: `text-right pr-4`"
                >
                  <div v-if="windowSize.x < 400" class="event__time-text" v-text="event.event_time"></div>
                  <v-icon
                    :small="windowSize.x < 400 ? true : false"
                    class="mb-2 mr-2"
                  >{{searchProperTimelineIcon(event.event_type)}}</v-icon>
                  <span class="event__type-text">{{ event.event_type}}</span>
                  <span
                    v-if="event.lastPlayer"
                    class="event__subType-text"
                  >- {{ searchProperEventType(event.event_type) }}</span>
                  <div class="white--text">
                    <span>{{ event.firstPlayer}}</span>
                    <span v-if="event.lastPlayer">- {{ event.lastPlayer}}</span>
                  </div>
                </div>
              </v-timeline-item>
            </v-timeline>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import dummy from "../../assets/value/dummy.json";
import matchValue from "../../assets/value/match.json";

export default {
  created() {},
  props: {},
  data: () => ({
    homeScore: 2,
    awayScore: 0,
    gameEventList: dummy.gameEventList,
    years: [
      {
        color: "cyan",
        year: "1960"
      },
      {
        color: "green",
        year: "1970"
      },
      {
        color: "pink",
        year: "1980"
      },
      {
        color: "amber",
        year: "1990"
      },
      {
        color: "orange",
        year: "2000"
      }
    ],
    windowSize: {
      x: 0,
      y: 0
    }
  }),
  mounted() {
    this.onResize();
  },
  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },
    searchProperTimelineIcon: function(iconType) {
      return matchValue.gameReportEventTimeLineIcon[iconType];
    },
    searchProperEventType: function(eventType) {
      return matchValue.eventTypePair[eventType];
    }
  }
};
</script>

<style lang="scss" scoped src="../../styles/components/report/eventList.scss"></style>
