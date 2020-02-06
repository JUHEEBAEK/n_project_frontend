<template>
  <v-menu
    v-model="addMenu"
    :close-on-content-click="false"
    :nudge-width="400"
    max-width="448"
    offset-x
  >
    <v-card color="grey lighten-4">
      <v-form class="form">
        <v-toolbar color="grey lighten-4" flat tile height="40px">
          <v-spacer />
          <v-btn icon small class="mx-1" @click="SET_ADD_CALENDAR_MODAL(false)">
            <v-icon small>fas fa-times</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-3">
          <v-row>
            <v-col cols="2"></v-col>
            <v-col cols="9">
              <v-text-field placeholder="제목 및 시간 추가" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2" align-self="center">
              <v-avatar size="20" :color="color" />
            </v-col>
            <v-col cols="9" align-self="center">
              <v-select
                v-model="selected_type"
                :items="types"
                label="Select a type"
                item-value="id"
                item-text="name"
                @change="clickType()"
              />
            </v-col>
          </v-row>
          <v-row>
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
                  <v-text-field v-model="selectedDate" :placeholder="selectedDate" v-on="on" />
                </template>
                <v-date-picker
                  v-model="selectedDate"
                  no-title
                  @input="menu_date = false"
                />
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
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
          <v-row>
            <v-col cols="2" align-self="center">
              <v-icon>fas fa-map-marker-alt</v-icon>
            </v-col>
            <v-col cols="9">
              <v-select
                v-model="stadium_type"
                :items="stadiums"
                label="Select a stadium"
                item-value="id"
                item-text="name"
                @change="clickType()"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="text-right">
              <v-btn color="primary">저장</v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-form>
    </v-card>
  </v-menu>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("calendar");

import moment from "moment";
export default {
  props: ["selectedDate"],
  data: () => ({
    popover_menu: false,
    color: "rgb(230, 124, 115)",
    // date: moment().format("YYYY-MM-DD"),
    start_time: moment().format("HH:mm"),
    end_time: moment().format("HH:mm"),
    menu_date: false,
    menu_start: false,
    menu_end: false,
    selected_type: {},
    stadium_type: "",
    stadiums: [
      { id: 1, name: "우면 다목적 구장" },
      { id: 2, name: "잠실 제 1 구장" },
      { id: 3, name: "잠실 제 2 구장" },
      { id: 4, name: "잠실 제 3 구장" },
      { id: 5, name: "풀굿 풋살장" }
    ],
    types: [
      { id: 0, type: "training", name: "훈련", color: "rgb(142, 36, 170)" },
      {
        id: 1,
        type: "practice",
        name: "연습경기",
        color: "rgb(51, 182, 121)"
      },
      { id: 2, type: "league", name: "리그", color: "rgb(246, 191, 38)" },
      { id: 3, type: "match", name: "친선", color: "rgb(121, 134, 203)" },
      { id: 4, type: "contest", name: "대회", color: "rgb(230, 124, 115)" }
    ]
  }),
  computed: {
    ...mapState(["addMenu"]),
    addMenu: {
      get() {
        return this.$store.state.calendar.addMenu;
      },
      set(val) {
        this.SET_ADD_CALENDAR_MODAL(val);
      }
    }
  },
  created() {
    this.date = this._clickDate;
  },
  methods: {
    ...mapMutations(["SET_ADD_CALENDAR_MODAL"]),
    clickType() {
      this.color = this.types[this.selected_type].color;
    }
  }
};
</script>

<style></style>
