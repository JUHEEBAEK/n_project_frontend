<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <schedule-date-list @changeDate="setScheduleData"></schedule-date-list>
      </v-col>
      <v-col cols="12" sm="12" md="5">
        <schedule-info-card
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
      <v-col cols="12">
        <squad-team-split />
      </v-col>
    </v-row>
  </v-container>
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
  mapMutations: squadMutations,
  mapActions: squadActions
} = createNamespacedHelpers("squad");

import regex from "../../../mixins/regex.js";
import util from "../../../mixins/util.js";

export default {
  name: "Attendance.vue",

  mixins: [util, regex],
  data: () => ({
    minCount: null,
    scheduleEnd: null,
    scheduleName: null,
    scheduleStadium: null,
    scheduleStart: null,
    member_name_list: [],
    member_id_list: []
  }),
  computed: {
    ...mapState(["attendance"]),
    ...calendarMapState(["scheduleIndex", "scheduleList"]),
    ...squadState(["splitTeam", "teamSplitSelected"]),
    ...commonState(["colorIndex"])
  },
  watch: {
    teamSplitSelected(val) {
      this.update_attendMember_color_teamNumber();
    }
  },
  async created() {
    await this.select_schedule();

    if (
      this.$route.params &&
      this.$route.params.scheduleIndex &&
      this.$route.params.team_split_index
    ) {
      this.SET_SCHEDULE_INDEX(this.$route.params.scheduleIndex);
      this.SET_TEAM_INDEX_CHANGED(this.$route.params.team_split_index);
    } else {
      this.CHOOSE_LATEST_SCHEDULE();
    }
  },
  methods: {
    ...calendarMapMutations([
      "SET_ATTEND_MEMBER",
      "CHOOSE_LATEST_SCHEDULE",
      "SET_SCHEDULE_INDEX"
    ]),
    ...calendarMapActions(["select_schedule", "load_member"]),
    ...squadMutations(["SET_TEAM_INDEX_CHANGED"]),
    ...mapActions(["get_attendance"]),
    ...squadActions(["getSplitTeamListWithSchedule"]),

    async setScheduleData(selected_schedule) {
      if (this.scheduleIndex == -1) return;

      // db에서 불러오는 부분
      await this.getSplitTeamListWithSchedule(selected_schedule.id);
      await this.load_member(selected_schedule.id);

      this.setLocalVariable(selected_schedule);
      this.update_attendMember_color_teamNumber();
    },

    setLocalVariable(selected_schedule) {
      this.scheduleName = selected_schedule.name;
      this.scheduleStart = selected_schedule.start;
      this.scheduleEnd = selected_schedule.end;
      this.scheduleAddress = selected_schedule.address;
      this.scheduleStadium = selected_schedule.stadium_name;
      this.member_name_list = selected_schedule.member_name_list;
      this.member_id_list = selected_schedule.member_id_list;
    },
    update_attendMember_color_teamNumber() {
      let attend_member_list = [];
      // 만약에 color나 teamNumber에 대한 정보가 있으면 그걸 불러오는게 좋을거 같은데
      let splitTeamInfo = this.splitTeam[this.teamSplitSelected];

      for (let i in this.member_name_list) {
        let member_name = this.member_name_list[i];
        let member_id = this.member_id_list[i];
        let color = "grey";
        let teamNumber = null;
        if (splitTeamInfo && splitTeamInfo[member_id]) {
          teamNumber = splitTeamInfo[member_id]["team_number"];
          if (teamNumber == -1) {
            color = "grey";
          } else {
            color = this.colorIndex[teamNumber];
          }
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
    }
  }
};
</script>

<style scoped></style>

