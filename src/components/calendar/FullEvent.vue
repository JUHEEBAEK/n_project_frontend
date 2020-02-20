<template>
  <v-dialog
    v-model="fullEventDialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card tile>
      <form>
        <v-toolbar class="pa-2" flat light>
          <v-btn icon @click="close()">
            <v-icon>fas fa-times</v-icon>
          </v-btn>
          <v-text-field
            class="event__title"
            height="48"
            v-model="selectedEvent.name"
            placeholder="제목 및 시간 추가"
          />
          <v-btn color="primary" dark class="ma-2" @click="save()">Save</v-btn>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-row dense>
            <v-col cols="2" class="d-flex">
              <span class="px-3">
                <v-icon class="white--text">fas fa-times</v-icon>
              </span>
              <v-menu
                ref="menu_date"
                v-model="menu_date"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="selectedEvent.date"
                    solo
                    dense
                    de
                    :placeholder="selectedEvent.date"
                    v-on="on"
                  />
                </template>
                <v-date-picker
                  v-model="selectedEvent.date"
                  dense
                  no-title
                  @input="menu_date = false"
                />
              </v-menu>
            </v-col>
            <v-col cols="1">
              <v-menu
                ref="menu_start"
                v-model="menu_start"
                :nudge-right="40"
                :return-value.sync="start_time"
                transition="scale-transition"
                max-width="240px"
                min-width="240px"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="start_time"
                    dense
                    solo
                    :placeholder="start_time"
                    color="grey"
                    readonly
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="menu_start"
                  v-model="start_time"
                  full-width
                  @click:minute="$refs.menu_start.save(start_time)"
                />
              </v-menu>
            </v-col>
            <b class="align-self-center">-</b>
            <v-col cols="1">
              <v-menu
                ref="menu_end"
                v-model="menu_end"
                :nudge-right="40"
                :return-value.sync="end_time"
                transition="scale-transition"
                max-width="240px"
                min-width="240px"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    v-model="end_time"
                    dense
                    solo
                    color="grey"
                    placeholder="19:00"
                    readonly
                    v-on="on"
                  />
                </template>
                <v-time-picker
                  v-if="menu_end"
                  v-model="end_time"
                  full-width
                  @click:minute="$refs.menu_end.save(end_time)"
                />
              </v-menu>
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <v-row dense>
            <v-col cols="4" class="d-flex">
              <span class="px-2 align-self-center">
                <v-icon>fas fa-map-marker-alt</v-icon>
              </span>
              <v-select
                class="px-2"
                v-model="selectedEvent.place"
                dense
                solo
                hide-details
                :items="stadiums"
                label="Select a stadium"
                item-value="id"
                item-text="name"
              />
            </v-col>
          </v-row>
          <v-row dense>
            <v-col cols="4" class="d-flex">
              <span class="px-2 align-self-center">
                <v-icon :style="`color: ${color}`">fas fa-circle</v-icon>
              </span>
              <v-select
                v-model="selectedEvent.type"
                class="px-1"
                dense
                solo
                hide-details
                :items="types"
                label="Select a type"
                item-value="id"
                item-text="name"
                @change="clickType()"
              />
            </v-col>
          </v-row>
        </v-card-text>

        <div style="flex: 1 1 auto;"></div>
      </form>
    </v-card>
  </v-dialog>
</template>

<script>
import stringStadium from "../../assets/value/Stadium";
import stringSchedules from "../../assets/value/Schedule";

import { createNamespacedHelpers } from "vuex";
import moment from "moment";
const { mapState, mapMutations } = createNamespacedHelpers("calendar");

export default {
  props: ["selectedEvent"],
  data: () => ({
    start_time: moment().format("HH:mm"),
    end_time: moment().format("HH:mm"),
    menu_date: false,
    menu_start: false,
    menu_end: false,
    notifications: false,
    sound: true,
    widgets: false,
    stadiums: stringStadium.stadium,
    types: stringSchedules.types,
    items: [
      {
        title: "Click Me"
      },
      {
        title: "Click Me"
      },
      {
        title: "Click Me"
      },
      {
        title: "Click Me 2"
      }
    ]
  }),
  computed: {
    ...mapState(["fullEventDialog"])
  },
  created() {
    console.log("created");
    console.log(this.selectedEvent);
  },
  methods: {
    ...mapMutations(["SET_FULL_EVENT_MODAL"]),
    close() {
      console.log("dialog 닫아라");
      this.SET_FULL_EVENT_MODAL(!this.fullEventDialog);
    },
    save() {
      console.log("event 저장");
    }
  }
};
</script>

<style>
.event__title {
  font-size: 28px;
  line-height: 28px;
}
</style>