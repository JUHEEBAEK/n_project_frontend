<template>
  <v-col cols="12" xl="6" lg="6" sm="12">
    <v-card class="report__container" elevation="1" color="#cfead0">
      <v-card-title class="report__header">게임 기록</v-card-title>
      <v-card-text class="report__content">
        <v-timeline class="report__timeline">
          <v-timeline-item
            class="report__item"
            v-for="event in eventList"
            :key="event"
            small
            fill-dot
            color="white"
            :right="event.team_type === 'A' ? true : false"
            :left="event.team_type === 'H' ? true : false"
            :icon="
                    event.event_type === 'Goal'
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
              @click:close="deleteButton(event)"
            >
              <span>{{ event.firstPlayer }}</span>
              <v-avatar left>
                <v-icon v-if="event.event_type === 'Goal'" x-small>fas fa-futbol</v-icon>
                <v-icon v-else x-small>fas fa-long-arrow-alt-down</v-icon>
              </v-avatar>
              <span class="lastEvent ma-1">{{ event.lastPlayer }}</span>
              <v-avatar left>
                <v-icon v-if="event.event_type === 'Goal'" x-small>fas fa-shoe-prints fa-rotate-270</v-icon>
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
export default {};
</script>

<style lang="scss" src="../../styles/components/match/eventList.scss">
</style>