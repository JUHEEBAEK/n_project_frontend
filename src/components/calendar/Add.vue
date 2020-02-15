<template>
  <div v-if="createNewEvent">
    <v-menu
      v-model="newEventBox"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-x
      offset-y
      offset-overflow
    >
      <template v-slot:activator="{ on }">
        <div v-ripple v-on="on" class="event__new muji" @click.stop="close()">{{new_event_title}}</div>
      </template>

      <v-card color="grey lighten-4" :slotData="slotData">
        <v-form class="form">
          <v-toolbar class="popover__header" height="40" color="grey lighten-4" flat tile>
            <v-spacer />
            <v-btn icon small class="mx-1" @click="close()">
              <v-icon small>fas fa-times</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="pa-3 pt-0">
            <v-row dense>
              <v-col cols="2"></v-col>
              <v-col cols="9">
                <v-text-field v-model="event_name" dense height="40" placeholder="제목 및 시간 추가" />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2" align-self="start">
                <v-avatar size="25" :color="color" />
              </v-col>
              <v-col cols="9" align-self="start">
                <v-select
                  v-model="event_type"
                  dense
                  :items="types"
                  label="Select a type"
                  item-value="type"
                  item-text="name"
                  @change="changeType()"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2" align-self="center">
                <v-icon>fas fa-calendar-alt</v-icon>
              </v-col>
              <v-col cols="9" align-self="center">
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
                      v-model="selectedDate"
                      dense
                      readonly
                      :placeholder="selectedDate"
                      v-on="on"
                    />
                  </template>
                  <v-date-picker v-model="selectedDate" dense no-title @input="menu_date = false" />
                </v-menu>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="2" align-self="center">
                <v-icon>fas fa-clock</v-icon>
              </v-col>
              <v-col cols="4" align-self="center">
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
                      :placeholder="start_time"
                      color="grey"
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
              <v-col cols="4" align-self="center">
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
                      color="grey"
                      placeholder="19:00"
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
            <v-row dense>
              <v-col cols="2" align-self="center">
                <v-icon>fas fa-map-marker-alt</v-icon>
              </v-col>
              <v-col cols="9">
                <v-select
                  v-model="stadium_id"
                  dense
                  :items="stadiumList"
                  label="Select a stadium"
                  item-value="id"
                  item-text="name"
                />
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12" class="text-right">
                <v-btn color="primary" @click="submit">저장</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-form>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
import stringStadium from "../../assets/value/stringStadium";
import stringSchedules from "../../assets/value/stringSchedule";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: calendarMapState,
  mapMutations: calendarMapMutaions,
  mapActions: calendarMapActions
} = createNamespacedHelpers("calendar");
const {
  mapState: stadiuMapState,
  mapActions: stadiumMapActions
} = createNamespacedHelpers("stadium");

import moment from "moment";
export default {
  props: ["selectedDate", "day", "newEventBox"],
  data: () => ({
    popover_menu: false,
    color: "rgb(230, 124, 115)",
    // date: moment().format("YYYY-MM-DD"),
    start_time: "17:00",
    end_time: "19:00",
    menu_date: false,
    menu_start: false,
    menu_end: false,

    event_name: "",
    event_type: "",
    stadium_type: "",

    new_event_title: "(제목없음)",
    types: stringSchedules.typeList
  }),
  created() {
    this.date = this._clickDate;
  },
  computed: {
    ...calendarMapState(["newEventBox"]),
    ...stadiuMapState(["stadiumList"]),
    createNewEvent() {
      return this.newEventBox && this.day === this.selectedDate;
    },
    slotData() {
      return {
        close: this.close
      };
    }
  },
  mounted() {
    this.select_stadium();
  },
  methods: {
    ...stadiumMapActions(["select_stadium"]),
    ...calendarMapActions(["add_event"]),
    ...calendarMapMutaions(["SET_NEW_EVENT_MODAL"]),
    changeType() {
      this.color = stringSchedules.types[this.event_type].color;
    },
    submit() {
      console.log("저장");

      let _srcData = {};

      _srcData["name"] = this.event_name;
      _srcData["stadium_id"] = this.stadium_id;
      _srcData["type"] = this.event_type;
      _srcData["date"] = this.selectedDate;
      _srcData["start_time"] = this.start_time;
      _srcData["end_time"] = this.end_time;

      console.log(_srcData);

      this.add_event(_srcData).then(() => {
        console.log("success");
      });
    },
    close() {
      console.log("close");
      this.SET_NEW_EVENT_MODAL(!this.newEventBox);
    }
  }
};
</script>

<style scoped>
.popover__header {
  padding-top: 20px;
}
.event__new {
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
</style>
