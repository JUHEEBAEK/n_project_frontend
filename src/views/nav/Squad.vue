<template>
  <div>
    <core-Toolbar />
    <core-navigation />
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
  mapMutations: commonMutaions
} = createNamespacedHelpers("common");
const {
  mapState: calendarMapState,
  mapMutations: calendarMapMutations,
  mapActions: calendarMapActions
} = createNamespacedHelpers("calendar");
const {
  mapState: squadState,
  mapActions: squadActions
} = createNamespacedHelpers("squad");

import regex from "../../mixin/regex.js";
import util from "../../mixin/util.js";

export default {
  name: "Attendance.vue",
  
  mixins: [util, regex],
  data: () => ({
    minCount: null,
    scheduleEnd: null,
    scheduleName: null,
    scheduleStadium: null,
    scheduleStart: null,
    setMonth: moment().format("MMMM"),
    setYear: moment().format("YYYY"),
    setDay: moment().format("DD"),
    memeber_name_list: [],
    member_id_list: [],
    
  }),
  computed: {
    ...mapState(["attendance"]),
    ...calendarMapState(["scheduleIndex", "scheduleList"]),
    ...squadState(['splitTeam', 'temaSplitSelcted']),
    ...commonState(['colorIndex']),
    
  },
  watch: {
    temaSplitSelcted(val){
      this.update_attendMember();
    }
   
 },
  async created() {
    await this.select_schedule();
    // 가장 최신걸 선택
    this.SET_SCHEDULE_INDEX(this.scheduleList.length - 1);
  },
 
  methods: {
    ...calendarMapMutations(["SET_ATTEND_MEMBER", "SET_SCHEDULE_INDEX"]),
    ...calendarMapActions(["select_schedule", "load_member"]),
    ...mapActions(["get_attendance"]),
    ...squadActions(['getSplitTeamListWithSchedule']),
    

    async setScheduleData(selected_schedule) {
      if (this.scheduleIndex == -1) return;
      
      // db에서 불러오는 부분
      await this.getSplitTeamListWithSchedule(selected_schedule.id);
      await this.load_member(selected_schedule.id);

      this.setLocalVariable(selected_schedule)
      this.update_attendMember()
    },

    setLocalVariable(selected_schedule){
      this.setYear = moment(selected_schedule.date).format("YYYY");
      this.setMonth = moment(selected_schedule.date).format("MMMM");
      this.setDay = moment(selected_schedule.date).format("DD");

      this.scheduleName = selected_schedule.name;
      this.scheduleStart = selected_schedule.start;
      this.scheduleEnd = selected_schedule.end;
      this.scheduleAddress = selected_schedule.address;
      this.scheduleStadium = selected_schedule.stadium_name;
      this.memeber_name_list = selected_schedule.memeber_name_list
      this.member_id_list = selected_schedule.member_id_list
    },
    update_attendMember(){
      let attend_member_list = [];
      // 만약에 color나 teamNumber에 대한 정보가 있으면 그걸 불러오는게 좋을거 같은데
      let splitTeamInfo = this.splitTeam[this.temaSplitSelcted]
      
      for (let i in this.memeber_name_list) {
        
        let member_name = this.memeber_name_list[i]
        let member_id = this.member_id_list[i]
        let color = "grey"
        let teamNumber = null
        if (splitTeamInfo && splitTeamInfo[member_id]){
            teamNumber = splitTeamInfo[member_id]["team_number"]
            color = this.colorIndex[teamNumber]
        }

        let attend_member = {
          name: member_name,
          id: member_id,
          color: color,
          teamNumber: teamNumber
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
