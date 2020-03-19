<template>
  <div>
    <v-sheet elevation="8">
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
      </div>
      <v-expand-transition>
        <v-row class="fill-height" align="center" justify="center">
          <v-col cols="12" sm="12" md="5" lg="3">
            <schedule-info-card
              :cardInfoLoading="loading"
              :scheduleName="scheduleName"
              :scheduleStart="scheduleStart"
              :scheduleEnd="scheduleEnd"
              :scheduleStadium="scheduleStadium"
              :scheduleAddress="scheduleAddress"
            ></schedule-info-card>
          </v-col>
          <v-col cols="12" sm="12" md="7" lg="9">
            <v-card class="py-2">
              <v-card-title>쿼터 선택</v-card-title>
              <v-card-text>
                <v-slide-group v-model="quarterIndex">
                  <v-slide-item
                    v-for="quarter in quarterList"
                    :key="quarter"
                    v-slot:default="{ active, toggle }"
                  >
                    <v-chip
                      :color="active ? 'primary' : 'grey lighten-1'"
                      class="mx-2"
                      @click="toggle"
                      dark
                      label
                    >{{ quarter }}</v-chip>
                  </v-slide-item>
                  <v-chip class="mx-2 px-5" dark color="tertiary" label @click="addQuarter">+</v-chip>
                </v-slide-group>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-expand-transition>
    </v-sheet>
    <v-card outlined class="pa-3">
      <v-card-actions class="setting__actions">
        <v-btn class="mx-3" dark color="primary" outlined large>팀나누기</v-btn>
        <v-btn icon @click="showSetting">
          <v-icon large>fas fa-cog</v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-text>
        <v-row wrap justify="center">
          <v-col cols="12">
            <v-chip
              v-for="member in attendMember"
              dark
              label
              class="chip__member mx-1"
              color="grey lighten-1"
              :key="member.name"
            >{{ member.name }}</v-chip>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <v-row wrap justify="center">
          <v-col cols="12">
            <v-chip
              v-for="member in attendMember"
              dark
              label
              class="chip__member mx-1"
              color="grey lighten-1"
              :key="member.name"
            >{{ member.name }}</v-chip>
          </v-col>
        </v-row>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <div>
          <v-btn class="tab__team ma-1" fab small outlined color="blue-grey darken-1"></v-btn>
          <v-btn class="tab__team ma-1" fab small outlined color="blue-grey lighten-3"></v-btn>
        </div>
        <div>6 Vs 6</div>
        <div>깍두기 없음</div>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn click="save" color="primary">저장</v-btn>
      </v-card-actions>
    </v-card>
    <squad-setting></squad-setting>
  </div>
</template>

<script>
import moment from "moment";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("attend");
const { mapMutations: commonapMutaions } = createNamespacedHelpers("common");
const {
  mapState: scheduleMapState,
  mapActions: scheduleMapActions
} = createNamespacedHelpers("calendar");
import dummy from "../../assets/value/dummy.json";

export default {
  name: "Attendance.vue",
  async created() {
    this.scheduleList = dummy.scheduleList;
    this.activeSchedule();
    this.activeQuarter();

    this.setAttendMember();
  },
  data: () => ({
    quarterIndex: 0,
    scheduleIndex: null,
    setYear: moment().format("YYYY"),
    setMonth: moment().format("MMMM"),
    scheduleList: [],
    scheduleName: null,
    scheduleStart: null,
    scheduleEnd: null,
    scheduleStadium: null,
    attendMember: [],
    quarterList: []
  }),
  computed: {
    ...mapState(["attendance"])
  },
  watch: {
    scheduleIndex: async function(val) {
      if (val) {
        this.setDate(this.scheduleList[this.scheduleIndex]);
        // 그중에 출석한 사람들 업데이트 해주기
      }
    }
  },

  methods: {
    ...mapActions(["get_attendance"]),
    ...commonapMutaions(["setSetting"]),
    addQuarter() {
      let idx = this.quarterList.length + 1;
      let item = "Q" + idx;
      this.quarterList.push(item);
      this.activeQuarter();
    },
    activeQuarter() {
      if (this.quarterList.length > 0) {
        this.quarterIndex = this.quarterList.length;
      }
    },
    // 제일 최근의 스케줄을 선택해주는 함수.
    activeSchedule: async function() {
      this.scheduleIndex = this.scheduleList.length - 1;
      this.setDate(this.scheduleList[this.scheduleIndex]);
    },
    save() {
      console.log("저장");
    },
    setDate(item) {
      this.setYear = moment(item.date).format("YYYY");
      this.setMonth = moment(item.date).format("MMMM");

      this.scheduleName = item.name;
      this.scheduleStart = item.start;
      this.scheduleEnd = item.end;
      this.scheduleAddress = item.address;
      this.scheduleStadium = item.stadium_name;
    },
    setAttendMember: function() {
      console.log("setAttendMember");
      // this.attendMember = stringAttendance.member;
    },
    showSetting() {
      console.log("show");
      this.setSetting(!this.$store.state.common.setting);
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
</style>
