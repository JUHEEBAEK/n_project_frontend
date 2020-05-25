<template>
  <div>
    <core-Toolbar></core-Toolbar>
    <core-navigation></core-navigation>
    <div>
      <v-sheet elevation="8">
        <schedule-date-list @changeDate="changeDate"></schedule-date-list>
      </v-sheet>
      <v-expand-transition>
        <v-sheet color="grey lighten-4" height="300" tile>
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
              <member-rating-list @isAttend="isAttend"></member-rating-list>
            </v-col>
          </v-row>
        </v-sheet>
      </v-expand-transition>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { createNamespacedHelpers } from "vuex";
const { mapActions: attendMapActions } = createNamespacedHelpers("attend");
const { mapActions: memberMapActions } = createNamespacedHelpers("member");
const {
  mapState: calendarMapState,
  mapActions: calendarMapActions,
} = createNamespacedHelpers("calendar");

export default {
  name: "Attend.vue",
  data: () => ({
    memberList: [],
    countMonthList: [],
    cardInfoLoading: false,
    today: moment().format("YYYY-MM-DD"),
    scheduleInfo: {},
    scheduleName: null,
    scheduleStart: moment().format("hh:mm"),
    scheduleEnd: null,
    scheduleStadium: null,
    scheduleAddress: null,
    requesting: false,
  }),
  computed: {
    ...calendarMapState(["scheduleList", "scheduleIndex"]),
  },
  methods: {
    ...attendMapActions([
      "add_attend",
      "delete_attend",
      "get_attend_rate",
      "get_attend",
    ]),
    ...calendarMapActions(["select_schedule"]),
    ...memberMapActions(["select_member"]),
    async isAttend(item) {
      console.log("this is clicked", item);
      this.requesting = true;

      let success_in_query = false;
      let form = {
        member_id: item.id,
        schedule_id: this.scheduleList[this.scheduleIndex].id,
      };
      console.log(form);
      if (item.attend) {
        // delete api
        success_in_query = await this.delete_attend(form);
      } else {
        // insert api
        success_in_query = await this.add_attend(form);
      }
      console.log("result", success_in_query);
      // attend를 없애기 만약 콜백에 문제가 없는 경우에 로컬 변경
      if (success_in_query) {
        item.attend = !item.attend;
      }

      this.requesting = false;
    },
    async changeDate(item) {
      this.cardInfoLoading = true;

      this.scheduleName = item.name;
      this.scheduleStart = item.start;
      this.scheduleEnd = item.end;
      this.scheduleAddress = item.address;
      this.scheduleStadium = item.stadium_name;

      this.cardInfoLoading = false;
      // 출석률 가져오기
      await this.get_attend_rate(item.date);
      // 그중에 출석한 사람들 업데이트 해주기
      await this.get_attend(item.id);
    },

    setFormatMemberList: async function(countMember) {
      this.memberList = await getMember();
    },
  },
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
