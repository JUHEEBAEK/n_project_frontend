<template>
  <div>
    <core-Toolbar></core-Toolbar>
    <core-navigation></core-navigation>
    <div>
      <v-sheet elevation="8">
        <schedule-date-list
          :scheduleList="scheduleList"
          :scheduleIndex="initIndex"
          :setYear="setYear"
          :setMonth="setMonth"
          :setDay="setDay"
          @setDate="setDate"
        ></schedule-date-list>
      </v-sheet>
      <v-expand-transition>
        <v-sheet color="grey lighten-4" height="400" tile>
          <v-row class="fill-height" align="center" justify="center">
            <v-col cols="12" sm="12" md="12" lg="3">
              <schedule-info-card
                :cardInfoLoading="cardInfoLoading"
                :scheduleName="scheduleName"
                :scheduleStart="scheduleStart"
                :scheduleEnd="scheduleEnd"
                :scheduleStadium="scheduleStadium"
                :scheduleAddress="scheduleAddress"
              ></schedule-info-card>
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
                        v-for="member in good_attend"
                        dark
                        label
                        :outlined="member.attend ? 'outlined' : ''"
                        :class="
                            member.attend
                              ? 'chip__member'
                              : 'chip__member opacity-4'
                          "
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
                        v-for="member in so_so_attend"
                        dark
                        label
                        :outlined="member.attend ? 'outlined' : ''"
                        :class="
                            member.attend
                              ? 'chip__member'
                              : 'chip__member opacity-4'
                          "
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
                        v-for="member in ghost_attend"
                        dark
                        label
                        :outlined="member.attend ? 'outlined' : ''"
                        :class="
                            member.attend
                              ? 'chip__member'
                              : 'chip__member opacity-4'
                          "
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
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { getScheduleList, countThreeMonths } from "../../api/attend.js";
import { getMember } from "../../api/member.js";
import { createNamespacedHelpers } from "vuex";
const {
  mapState: attendMapState,
  mapActions: attendMapActions
} = createNamespacedHelpers("attend");

export default {
  name: "Attend.vue",
  async created() {
    this.scheduleList = await getScheduleList();

    await this.activeSchedule();

    let date = moment(this.today).format("YYYYMM");
    let beforeDate = moment(this.today)
      .subtract(3, "months")
      .format("YYYYMM");

    const formData = { standard_date: date, before_date: beforeDate };

    this.countMonthList = await countThreeMonths(formData);
  },
  data: () => ({
    memberList: [],
    cardInfoLoading: false,
    countMonthList: [],
    initIndex: null,
    setYear: moment().format("YYYY"),
    setMonth: moment().format("MMMM"),
    setDay: moment().format("DD"),
    today: moment().format("YYYY-MM-DD"),
    scheduleList: [],
    scheduleInfo: {},
    scheduleName: null,
    scheduleStart: moment().format("hh:mm"),
    scheduleEnd: null,
    scheduleStadium: null,
    scheduleAddress: null,
    requesting: false
  }),
  computed: {
    ...attendMapState(["good_attend", "so_so_attend", "ghost_attend"])
  },
  methods: {
    ...attendMapActions(["add_attend", "delete_attend"]),
    async isAttend(item) {
      console.log("this is clicked", item);
      this.requesting = true;

      let success_in_query = false;
      let form = {
        member_id: item.id,
        schedule_id: this.scheduleList[this.initIndex].id
      };
      if (item.attend) {
        // delete api
        success_in_query = await this.delete_attend(form);
      } else {
        // insert api
        success_in_query = await this.add_attend(form);
      }

      // attend를 없애기 만약 콜백에 문제가 없는 경우에 로컬 변경
      if (success_in_query) {
        item.attend = !item.attend;
      }

      this.requesting = false;
    },

    setDate(item) {
      this.cardInfoLoading = true;

      this.setYear = moment(item.date).format("YYYY");
      this.setMonth = moment(item.date).format("MMMM");
      this.setDay = moment(item.date).format("DD");

      this.scheduleName = item.name;
      this.scheduleStart = item.start;
      this.scheduleEnd = item.end;
      this.scheduleAddress = item.address;
      this.scheduleStadium = item.stadium_name;

      this.cardInfoLoading = false;
    },

    setFormatMemberList: async function(countMember) {
      this.memberList = await getMember();
    },
    // 제일 최근의 스케줄을 선택해주는 함수.
    activeSchedule: async function() {
      this.initIndex = this.scheduleList.length - 1;
      this.setDate(this.scheduleList[this.initIndex]);
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
