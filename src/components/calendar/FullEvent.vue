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
            ref="name"
            class="event__title"
            height="48"
            v-model="name"
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
                v-model="menu_date"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    ref="menu_date"
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
                v-model="menu_start"
                :nudge-right="40"
                transition="scale-transition"
                max-width="240px"
                min-width="240px"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    ref="start_time"
                    v-model="start_time"
                    dense
                    solo
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
                v-model="menu_end"
                :nudge-right="40"
                transition="scale-transition"
                max-width="240px"
                min-width="240px"
                offset-y
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    ref="end_time"
                    v-model="end_time"
                    dense
                    solo
                    color="grey"
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
                ref="stadium"
                v-model="selectedEvent.stadium_id"
                class="px-2"
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
                ref="type"
                v-model="selectedEvent.type_index"
                class="px-1"
                dense
                solo
                hide-details
                :items="types"
                label="Select a type"
                item-value="id"
                item-text="name"
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
const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
  "calendar"
);

export default {
  props: ["selectedEvent"],
  data: () => ({
    name: "제목 들어갈 곳",
    start_time: "17:00",
    end_time: "19:00",
    menu_date: false,
    menu_start: false,
    menu_end: false,
    notifications: false,
    sound: true,
    widgets: false,
    stadiums: stringStadium.stadium,
    types: stringSchedules.typeList,
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
    this.start_time = this.selectedEvent.start;
    this.end_time = this.selectedEvent.end;
    this.name = this.selectedEvent.name;
  },
  methods: {
    ...mapMutations(["SET_FULL_EVENT_MODAL"]),
    ...mapActions(["update_event"]),
    close() {
      this.SET_FULL_EVENT_MODAL(!this.fullEventDialog);
    },
    save() {
      // value 포맷 맞추기 날짜, 없을 때
      var date = this.$refs.menu_date.value;
      var start_time = this.$refs.start_time.value;
      var end_time = this.$refs.end_time.value;
      var stadium_id = this.$refs.stadium.value;
      var name = this.$refs.name.value;
      var type = this.$refs.type.value + 1;

      var scheduleFormData = {
        date: date,
        start_time,
        start_time,
        end_time: end_time,
        stadium_id: stadium_id,
        name: name,
        type: type
      };
      this.update_event({
        schedule_id: this.selectedEvent.id,
        schedule: scheduleFormData
      });
      this.close();
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
