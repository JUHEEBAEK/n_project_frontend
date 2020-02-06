<template>
  <v-card color="grey lighten-4" min-width="350px" flat>
    <v-toolbar color="grey lighten-4" flat tile height="40px">
      <v-spacer />
      <v-btn icon small class="mx-1">
        <v-icon small class="toolbar__icon">fas fa-edit</v-icon>
      </v-btn>
      <v-btn icon small class="mx-1">
        <v-icon small class="toolbar__icon">fas fa-trash-alt</v-icon>
      </v-btn>
      <v-btn icon small class="mx-1" @click="selectedOpen = false">
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
                <span class="schedule__start" v-html="selectedEvent.start" />
                ~
                <span class="schedule__end" v-html="selectedEvent.end" />
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
                <span class="schedule__place" v-html="selectedEvent.place" />
              </div>
            </div>
            <div class="row">
              <div class="col-12 py-0">
                <span
                  class="schedule__address"
                  v-html="selectedEvent.address"
                />
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
                <span
                  class="schedule__attendance"
                  v-html="`참석자 ${selectedEvent.attendCount} 명`"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 py-0">
                <span
                  class="attendance__member"
                  v-for="(item, idx) in selectedEvent.attend"
                  :key="idx"
                >
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: ["selectedEvent"]
};
</script>

<style></style>
