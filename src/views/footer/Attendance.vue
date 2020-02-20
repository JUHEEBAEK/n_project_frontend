<template>
  <div>
    <core-Toolbar></core-Toolbar>
    <core-navigation></core-navigation>
    <div>
      <v-container>
        <v-row justify="center">
          <v-col cols="4" class="attandance__date">
            <span class="date__year">{{ year }}</span>
            <span>-</span>
            <span class="date__month">{{ month }}</span>
          </v-col>
        </v-row>
      </v-container>

      <v-sheet class="mx-auto" elevation="8">
        <v-slide-group v-model="model" class="pa-5" show-arrows center-active>
          <v-slide-item
            v-for="item in scheduleList"
            :key="item.id"
            v-slot:default="{ active, toggle }"
          >
            <v-card
              :color="active ? 'primary' : 'grey lighten-1'"
              class="ma-4"
              height="50"
              width="100"
              @click="toggle"
              @click.native="setDate(item)"
            >
              <v-row class="fill-height" align="center" justify="center">
                <v-scale-transition>
                  <span class="date__day">{{ item.date.substr(8,2) }}</span>
                  <v-icon v-if="active" color="white" size="36" v-text="'fas fa-times-circle'"></v-icon>
                </v-scale-transition>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>

        <v-expand-transition>
          <v-sheet color="grey lighten-4" height="200" tile>
            <v-row class="fill-height" align="center" justify="center">
              <v-col cols="12" sm="12" md="12" lg="3">
                <h3 class="title">{{ scheduleName }}</h3>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="3">
                <h5 class="title">{{ scheduleStart }} - {{ scheduleEnd }}</h5>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="3">
                <p class="title">{{ scheduleStadium }}</p>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="3">
                <p class="title">{{ scheduleAddress }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-card outlined>
                <v-row wrap class="pa-2">
                  <v-img src="../../assets/sun.png" contain width="30" height="30" />
                </v-row>
                <v-row class justify="center">
                  <v-col cols="8">
                    <v-chip
                      v-for="member in good"
                      dark
                      label
                      :outlined="member.attend ? 'outlined' : ''"
                      :class="member.attend ? 'chip__member' : 'chip__member opacity-4'"
                      :color="member.attend ? 'tertiary' : 'muji'"
                      :key="member.name"
                      @click="isAttend(member)"
                    >{{ member.name }}</v-chip>
                  </v-col>
                </v-row>
                <v-row wrap>
                  <v-img src="../../assets/rainy.png" contain width="30" height="30" />
                </v-row>
                <v-row class>
                  <v-col>
                    <v-chip
                      v-for="member in so_so"
                      dark
                      label
                      :outlined="member.attend ? 'outlined' : ''"
                      :class="member.attend ? 'chip__member' : 'chip__member opacity-4'"
                      :color="member.attend ? 'tertiary' : 'muji'"
                      :key="member.name"
                      @click="isAttend(member)"
                    >{{ member.name }}</v-chip>
                  </v-col>
                </v-row>
                <v-row wrap>
                  <v-img src="../../assets/cemetery.png" contain width="30" height="30" />
                </v-row>
                <v-row class>
                  <v-col>
                    <v-chip
                      v-for="member in ghost"
                      dark
                      label
                      :outlined="member.attend ? 'outlined' : ''"
                      :class="member.attend ? 'chip__member' : 'chip__member opacity-4'"
                      :color="member.attend ? 'tertiary' : 'muji'"
                      :key="member.name"
                      @click="isAttend(member)"
                    >{{ member.name }}</v-chip>
                  </v-col>
                </v-row>
              </v-card>
            </v-row>
          </v-sheet>
        </v-expand-transition>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import stringAttendance from "../../assets/value/Attendance.json";
import stringSchedule from "../../assets/value/Schedule.json";
import {
  countAllSchedule,
  countAttendance,
  selectSchedule
} from "../../api/attendance.js";

export default {
  name: "Attendance.vue",
  async created() {
    console.log("created");
    this.countAllSchedule = await countAllSchedule();
    this.countAttendace = await countAttendance();
    // this.scheduleList = await selectSchedule();

    console.log(this.scheduleList);

    this.setAllScheduleList(this.countAllSchedule);
  },
  data: () => ({
    countAllSchedule: null,
    countAttendace: null,
    yearAllSceduleCount: {},
    scheduleList: stringSchedule.events,
    model: 0,
    year: new Date().toISOString().substr(0, 4),
    month: new Date().toISOString().substr(5, 2),
    scheduleName: null,
    scheduleStart: null,
    scheduleEnd: null,
    scheduleStadium: null,
    scheduleAddress: null,
    good: stringAttendance.good,
    so_so: stringAttendance.so_so,
    ghost: stringAttendance.ghost
  }),
  methods: {
    isAttend(item) {
      item.attend = !item.attend;
    },
    setAllScheduleList(countList) {
      console.log("countList", countList);
    },
    setAttendaceList(attendList) {
      console.log("attendList", attendList);
    },
    setDate(item) {
      this.year = item.date.substr(0, 4);
      this.month = item.date.substr(5, 2);

      this.scheduleName = item.name;
      this.scheduleStart = item.start.substr(11, 5);
      this.scheduleEnd = item.end.substr(11, 5);
      this.scheduleAddress = item.address;
      this.scheduleStadium = item.place;
    }
  }
};
</script>

<style scoped>
.attandance__date {
  font-size: 24px;
  font-weight: 800;
}
.date__day {
  font-size: 20px;
  font-weight: 600;
  color: white;
}
.schdule__list {
  display: flex;
  flex-flow: column;
  flex-direction: column;
  background-color: bisque;
}

.date__item {
  background-color: pink;
  list-style: none;
}
</style>
