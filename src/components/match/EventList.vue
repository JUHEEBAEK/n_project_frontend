<template>
  <v-col cols="12" xl="6" lg="6" sm="12">
    <v-card class="report__container" elevation="1" color="#cfead0">
      <v-card-title class="report__header">게임 기록</v-card-title>
      <v-card-text class="report__content">
        <v-timeline class="report__timeline">
          <v-timeline-item
            class="report__item"
            v-for="gameReport in gameEventList"
            :key="gameReport"
            small
            fill-dot
            color="white"
            :right="gameReport.team_type === 'A' ? true : false"
            :left="gameReport.team_type === 'H' ? true : false"
            :icon="
              gameReport.event_type === 'Goal'
                ? 'fas fa-futbol'
                : 'fas fa-exchange-alt fa-rotate-270'
            "
            icon-color="black"
          >
            <v-chip
              class="firstEvent ma-2"
              close
              color="#dce775"
              text-color="black"
              close-icon="fas fa-times-circle"
              @click:close="deleteButton(gameReport)"
            >
              <span>{{ gameReport.first_player }}</span>
              <v-avatar left>
                <v-icon v-if="gameReport.event_type === 'Goal'" x-small>fas fa-futbol</v-icon>
                <v-icon v-else x-small>fas fa-long-arrow-alt-down</v-icon>
              </v-avatar>
              <span class="lastEvent ma-1">{{ gameReport.last_player }}</span>
              <v-avatar left>
                <v-icon
                  v-if="gameReport.event_type === 'Goal'"
                  x-small
                >fas fa-shoe-prints fa-rotate-270</v-icon>
                <v-icon v-else x-small>fas fa-long-arrow-alt-up</v-icon>
              </v-avatar>
            </v-chip>
          </v-timeline-item>
        </v-timeline>
      </v-card-text>
    </v-card>
  </v-col>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: gameReportState,
  mapGetters: eventGetters,
  mapMutations: eventMutations,
  mapActions: eventActions
} = createNamespacedHelpers("gameReport");

const {
  mapState: gameState,
  mapMutations: gameMutations,
  mapActions: gameActions
} = createNamespacedHelpers("game");

export default {
  created() {},
  props: {
    gameEventList: {
      type: Object,
      default: null
    }
  },
  data: () => ({}),
  computed: {
    ...gameState(["gameInfo"])
  },
  methods: {
    deleteButton: function(gameReport) {
      this.gameEventList.forEach((item, idx) => {
        if (item.event_id === gameReport.event_id) {
          this.gameEventList.splice(idx, 1);
        }
      });
    }
  }
};
</script>

<style lang="scss" src="../../styles/components/match/eventList.scss"></style>
