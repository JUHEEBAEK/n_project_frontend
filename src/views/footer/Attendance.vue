<template>
  <div>
    <core-Toolbar></core-Toolbar>
    <core-navigation></core-navigation>
    <div>
      <v-sheet elevation="8">
        <div>
          <v-row>
            <v-col cols="6" class="attandance__date">
              <span>SELECTED DATE</span> -
              <span class="date__month pr-2">{{ setMonth }}</span>
              <span class="date__year">{{ setYear }}</span>
            </v-col>
          </v-row>
        </div>
        <v-slide-group v-model="model" show-arrows center-active>
          <v-slide-item
            v-for="item in scheduleList"
            :key="item.id"
            v-slot:default="{ active, toggle }"
          >
            <v-card
              :color="active ? 'primary' : 'grey lighten-1'"
              class="ma-4"
              height="40"
              width="80"
              @click="toggle"
              @click.native="setDate(item)"
            >
              <v-row class="fill-height" align="center" justify="center">
                <v-scale-transition>
                  <span class="date__day">{{ item.date.substr(8,2) }}</span>
                </v-scale-transition>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
        <v-expand-transition>
          <v-sheet color="grey lighten-4" height="400" tile>
            <v-row class="fill-height" align="center" justify="center">
              <v-col cols="12" sm="12" md="12" lg="3">
                <v-card :loading="loading" class="mx-auto">
                  <v-card-title class="schedule__title">{{ scheduleName }}</v-card-title>

                  <v-card-text>
                    <div
                      class="my-3 subtitle-1 schedule__time"
                    >{{ scheduleStart }} - {{ scheduleEnd }}</div>
                  </v-card-text>

                  <v-divider class="mx-4"></v-divider>

                  <v-card-text class="schedule__stadium">{{ scheduleStadium }}</v-card-text>
                  <v-card-text class="grey--text">{{ scheduleAddress }}</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="12" md="12" lg="8">
                <v-card outlined class="pa-3">
                  <v-row wrap justify="center">
                    <v-col cols="1" align-self="center">
                      <v-img src="../../assets/sun.png" contain width="30" height="30" />
                    </v-col>
                    <v-col cols="9">
                      <div class="text-left">
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
                      </div>
                    </v-col>
                  </v-row>
                  <v-row wrap justify="center">
                    <v-col cols="1" align-self="center">
                      <v-img src="../../assets/rainy.png" contain width="30" height="30" />
                    </v-col>
                    <v-col cols="9">
                      <div class="text-left">
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
                      </div>
                    </v-col>
                  </v-row>
                  <v-row wrap justify="center">
                    <v-col cols="1" align-self="center">
                      <v-img src="../../assets/cemetery.png" contain width="30" height="30" />
                    </v-col>
                    <v-col cols="9">
                      <div class="text-left">
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
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-sheet>
        </v-expand-transition>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import stringAttendance from "../../assets/value/Attendance.json";
import stringSchedule from "../../assets/value/Schedule.json";
import { selectSchedule, countThreeMonths } from "../../api/attendance.js";
import { selectMember } from "../../api/member.js";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("calendar");

export default {
  name: "Attendance.vue",
  async created() {
    this.scheduleList = await selectSchedule();
    // await this.setFormatMemberList();

    this.activeSchedule();

    let date = moment(this.today).format("YYYYMM");
    let beforeDate = moment(this.today)
      .subtract(3, "months")
      .format("YYYYMM");

    const formData = { standard_date: date, before_date: beforeDate };

    console.log("want to see 1", this.scheduleList[this.model]);
    //날짜를 가져오기
    
    // 이후에 출석을 했는지 여부는 추가로 넣어주자
    // 선택된 schedule id가 필요하다 this.scheduleList[this.model].id
    // get_attendance로 이름을 바꾼다
    // if (this.scheduleList[this.model].id) {
    //   await this.load_member(this.scheduleList[this.model].id);
    //   console.log("want to see", this.memberAttendList);
    // }
  },
  data: () => ({
    memberList: [],
    setMemberList: [],
    countMonthList: [],
    model: null,
    setYear: moment().format("YYYY"),
    setMonth: moment().format("MMMM"),
    today: moment().format("YYYY-MM-DD"),
    setDay: null,
    scheduleList: [],
    scheduleLength: 0,
    scheduleName: null,
    scheduleStart: null,
    scheduleEnd: null,
    scheduleStadium: null,
    scheduleAddress: null,
    good: stringAttendance.good,
    so_so: stringAttendance.so_so,
    ghost: stringAttendance.ghost
  }),
  computed: {
    ...mapState(["memberAttendList"])
  },
  methods: {
    ...mapActions(["load_member"]),
    isAttend(item) {
      item.attend = !item.attend;
    },
    // 제일 최근의 스케줄을 선택해주는 함수.
    activeSchedule: async function() {
      this.model = this.scheduleList.length - 1;
      this.setDate(this.scheduleList[this.model]);
    },

    setFormatMemberList: async function(countMember) {
      this.memberList = await selectMember();
    },
    setAttendaceList(attendList) {
      console.log("attendList", attendList);
    },
    setDate(item) {
      this.setYear = moment(item.date).format("YYYY");
      this.setMonth = moment(item.date).format("MMMM");

      this.scheduleName = item.name;
      this.scheduleStart = item.start;
      this.scheduleEnd = item.end;
      this.scheduleAddress = item.address;
      this.scheduleStadium = item.stadium_name;
    }
  }
};
</script>

<style scoped>
.attandance__date {
  font-size: 20px;
  font-weight: 200;
}
.date__year {
  font-size: 20px;
  font-weight: 400;
}
.date__month {
  font-size: 24px;
  font-weight: 500;
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
