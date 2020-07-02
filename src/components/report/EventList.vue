<template>
  <v-col cols="12">
    <v-card class="report__container" elevation="1">
      <v-card-title class="report__header">
        <span class="report__title">게임 기록</span>
        <span class="report__score">{{ `${homeScore} : ${awayScore} `}}</span>
      </v-card-title>
      <v-card-text class="report__content">
        <v-timeline>
          <v-timeline-item
            v-for="(event, i) in gameEventList"
            :key="i"
            color="#d25f5f"
            fill-dot
            :right="event.team_type === 'A' ? true : false"
            :left="event.team_type === 'H' ? true : false"
            :icon="searchProperTimelineIcon(event.event_type)"
          >
            <template v-slot:opposite>
              <span class="event__time-text" v-text="event.event_time"></span>
            </template>
            <div
              class="py-4"
              :class="event.team_type === 'A'? `text-left pl-10`: `text-right pr-10`"
            >
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
    ]
  }),
  computed: {},
  methods: {
    searchProperTimelineIcon: function(iconType) {
      return matchValue.gameReportEventTimeLineIcon[iconType];
    },
    searchProperEventType: function(eventType) {
      return matchValue.eventType[eventType];
    }
  }
};
</script>

<style lang="scss" src="../../styles/components/report/eventList.scss"></style>
