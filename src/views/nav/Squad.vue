<template>
  <div>
    <v-sheet elevation="8">
      <div>
        <v-sheet elevation="8">
          <schedule-date-list
            :scheduleList="scheduleList"
            :scheduleIndex="scheduleIndex"
            :setYear="setYear"
            :setMonth="setMonth"
            :setDay="setDay"
            @changeDate="setScheduleData"
          ></schedule-date-list>
        </v-sheet>
      </div>
      <v-expand-transition>
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="12" sm="12" md="5">
            <schedule-info-card
              :cardInfoLoading="loading"
              :scheduleName="scheduleName"
              :scheduleStart="scheduleStart"
              :scheduleEnd="scheduleEnd"
              :scheduleStadium="scheduleStadium"
              :scheduleAddress="scheduleAddress"
            ></schedule-info-card>
          </v-col>
          <v-col cols="12" sm="12" md="7"> 
            <squad-team-split-list />
          </v-col>
        </v-row>
      </v-expand-transition>
    </v-sheet>
    <squad-team-split />
    <util-snack-bar :purpose="snackBarPurpose" :message="snackBarMessage" />
  </div>
</template>

<script>
import moment from "moment";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("attend");
const {
  mapState: commonState,
  mapMutations: commonapMutaions
} = createNamespacedHelpers("common");
const {
  mapState: calendarMapState,
  mapMutations: calendarMapMutations,
  mapActions: calendarMapActions
} = createNamespacedHelpers("calendar");

import regex from "../../mixin/regex.js";
import util from "../../mixin/util.js";

export default {
  name: "Attendance.vue",
  async created() {
    this.scheduleList = await this.select_schedule();
    // 가장 최신걸 선택
    this.scheduleIndex = this.scheduleList.length - 1;
  },
  mixins: [util, regex],
  data: () => ({
    minCount: null,
    scheduleEnd: null,
    scheduleIndex: null,
    scheduleList: [],
    scheduleName: null,
    scheduleStadium: null,
    scheduleStart: null,
    setMonth: moment().format("MMMM"),
    setYear: moment().format("YYYY"),
    setDay: moment().format("DD"),
    
    
  }),
  computed: {
    ...mapState(["attendance"]),
    
  },
  watch: {
    scheduleIndex: async function(val) {
      if (val) {
        this.setScheduleData(this.scheduleList[this.scheduleIndex]);
        // 그중에 출석한 사람들 업데이트 해주기
      }
    }
  },
  methods: {
    ...calendarMapMutations(["SET_ATTEND_MEMBER"]),
    ...calendarMapActions(["select_schedule", "load_member"]),
    ...mapActions(["get_attendance"]),

    
    async setScheduleData(selected_schedule) {
      // 업데이트 받기
      console.log("setScheduleData", selected_schedule);
      await this.load_member(selected_schedule.id);

      this.setYear = moment(selected_schedule.date).format("YYYY");
      this.setMonth = moment(selected_schedule.date).format("MMMM");
      this.setDay = moment(selected_schedule.date).format("DD");

      this.scheduleName = selected_schedule.name;
      this.scheduleStart = selected_schedule.start;
      this.scheduleEnd = selected_schedule.end;
      this.scheduleAddress = selected_schedule.address;
      this.scheduleStadium = selected_schedule.stadium_name;
      let attend_member_list = [];

      // 만약에 color나 teamNumber에 대한 정보가 있으면 그걸 불러오는게 좋을거 같은데
      for (let i in selected_schedule.member_id_list) {
        let attend_member = {
          name: selected_schedule.memeber_name_list[i],
          id: selected_schedule.member_id_list[i],
          color: "grey",
          teamNumber: null
        };
        attend_member_list.push(attend_member);
      }

      this.SET_ATTEND_MEMBER(attend_member_list);
    },
    
    
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

.schedule__title {
  font-size: 16px;
  font-weight: 600;
}
.setting__actions {
  justify-content: space-between;
}

.tab__team {
  border: solid 5px;
}
.group__item {
  margin: 0 5px;
}
/* .jocker {
  background: black;
} */
</style>
