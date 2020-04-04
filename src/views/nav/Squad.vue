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
            @changeDate="setDate"
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
    <v-card outlined>
      <v-card-actions class="setting__actions">
        <v-list-item>
          <v-list-item-actions class="px-0">
            <v-btn dark color="primary" outlined large>팀나누기</v-btn>
          </v-list-item-actions>

          <v-list-item-content></v-list-item-content>

          <v-list-item-icon>참석자 {{ memberCount }} 명</v-list-item-icon>
        </v-list-item>
      </v-card-actions>
      <v-card-text class>
        <v-form refs="form">
          <v-row justify="start">
            <v-col cols="12" md="6" align-self="center">
              <v-list-item two-line>
                <v-list-item-content class="text-left">
                  <v-list-item-title class="pb-4">팀 수</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-item-group>
                      <v-item
                        v-for="item in attendTeamCount"
                        :key="item"
                        class="group__item"
                        v-slot:default="{ active, toggle }"
                      >
                        <v-btn
                          :color="active ? 'primary' : ''"
                          fab
                          elevation="0"
                          x-small
                          @click="toggle"
                          @click.native="setTeamCount(item)"
                        >
                          <v-scroll-y-transition>
                            <div
                              v-if="acitve"
                              class="flex-grow-1 text-center list__item white--text"
                            >{{ item }}</div>
                            <div v-else class="flex-grow-1 text-center list__item">{{ item }}</div>
                          </v-scroll-y-transition>
                        </v-btn>
                      </v-item>
                      <v-item class="group__item">
                        <v-btn
                          :color="active ? 'primary' : ''"
                          fab
                          elevation="0"
                          x-small
                          @click="addTeamCount"
                        >+</v-btn>
                      </v-item>
                    </v-item-group>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="12" md="6" lg="6" align-self="center">
              <v-list-item two-line>
                <v-list-item-content class="text-left">
                  <v-list-item-title>깍두기 여부</v-list-item-title>
                  <v-list-item-subtitle>
                    <v-checkbox
                      v-model="isJoker"
                      class="mx-2"
                      color="primary"
                      label=" 깍두기 있음"
                      @change="setJoker"
                    ></v-checkbox>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-text>
        <div>
          <v-btn
            v-for="n in teamCount"
            :key="n"
            class="tab__team ma-1"
            fab
            small
            outlined
            :color="colorIndex[n]"
            @click="clickTeam(n)"
          >{{n}}</v-btn>
          <v-btn
            v-for="n in teamJoker"
            :key="n"
            class="tab__team ma-1"
            fab
            small
            outlined
            :color="colorIndex[0]"
            @click="clickTeam('J')"
          >{{n}}</v-btn>
        </div>
        <div v-if="isJoker">깍두기 있음</div>
      </v-card-text>
      <v-card-text>
        <v-row>
          <v-col>
            <span v-if="selectedTeam" class="title">{{ selectedTeam }} 팀의 팀원을 선택하시오</span>
            <span v-if="selectedJoker" class="title">조커를 선택하시오</span>
          </v-col>
        </v-row>
        <v-row wrap justify="center">
          <v-col cols="12">
            <v-chip
              v-for="member in attendMember"
              dark
              outlined
              label
              class="chip__member mx-1"
              :color="member.color"
              :key="member"
              @click="clickMember(member)"
            >
              <!--  -->
              {{ member.name }}
            </v-chip>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn click="save" color="primary">저장</v-btn>
      </v-card-actions>
    </v-card>
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
  mapActions: calendarMapActions
} = createNamespacedHelpers("calendar");

import regex from "../../mixin/regex.js";
import util from "../../mixin/util.js";

export default {
  name: "Attendance.vue",
  async created() {
    this.scheduleList = await this.select_schedule();
    console.log("this.scheduleList", this.scheduleList);
    await this.activeSchedule();
    this.activeQuarter();
  },
  mixins: [util, regex],
  data: () => ({
    attendMember: [],
    attendTeamCount: [2, 3, 4, 5],
    memberCount: 0, // 참석자 수 세는 용도
    isJoker: false,
    minCount: null,
    quarterIndex: 0,
    quarterList: ["Q1"],
    scheduleEnd: null,
    scheduleIndex: null,
    scheduleList: [],
    scheduleName: null,
    scheduleStadium: null,
    scheduleStart: null,
    selectedJoker: false,
    selectedTeam: null,
    setMonth: moment().format("MMMM"),
    setYear: moment().format("YYYY"),
    setDay: moment().format("DD"),
    teamCount: null,
    teamJoker: []
  }),
  computed: {
    ...mapState(["attendance"]),
    ...commonState(["colorIndex"])
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
    ...calendarMapActions(["select_schedule"]),
    ...mapActions(["get_attendance"]),
    addQuarter() {
      let idx = this.quarterList.length + 1;
      let item = "Q" + idx;
      this.quarterList.push(item);
      this.activeQuarter();
    },
    addTeamCount() {
      let length = this.attendTeamCount.length;
      if (length < 9) {
        this.attendTeamCount.push(length + 2);
      } else {
        this.setSnackBar(
          this.snackBarFail,
          "더 이상 팀 수를 늘릴 수 없습니다."
        );
      }
    },
    activeQuarter() {
      if (this.quarterList.length > 0) {
        this.quarterIndex = this.quarterList.length;
      }
    },
    // 제일 최근의 스케줄을 선택해주는 함수.
    activeSchedule: async function() {
      this.scheduleIndex = this.scheduleList.length - 1;
      console.log("Schedule First Index", this.scheduleIndex);
      this.setDate(this.scheduleList[this.scheduleIndex]);
    },
    clickMember: function(value) {
      if (this.selectedTeam && !this.isJocker) {
        value.teamNumber = this.selectedTeam;
      } else {
        //조커가 클릭된 상태일 경우
        this.removeJocekr();
        value.teamNumber = 0;
      }
      value.color = this.colorIndex[value.teamNumber];
    },
    removeJocekr: function() {
      this.attendMember.map(item => {
        if (item.teamNumber === 0) {
          // teamNumber, color를 초기화
          item.teamNumber = null;
          item.color = "grey";
        }
      });
    },

    jockerIsBlack: function() {
      return this.isJocker;
    },
    clickTeam: function(value) {
      if (value !== "J") {
        this.selectedTeam = value;
        this.selectedJoker = false;
      } else {
        this.selectedTeam = null;
        this.isJoker = true;
        this.selectedJoker = true;
      }
    },
    save() {
      console.log("저장");
    },
    setDate(item) {
      this.setYear = moment(item.date).format("YYYY");
      this.setMonth = moment(item.date).format("MMMM");
      this.setDay = moment(item.date).format("DD");

      this.scheduleName = item.name;
      this.scheduleStart = item.start;
      this.scheduleEnd = item.end;
      this.scheduleAddress = item.address;
      this.scheduleStadium = item.stadium_name;
      this.attendMember = item.attend_list;
    },
    setJoker: function(isJoker) {
      if (isJoker) {
        this.teamJoker.push("J");
      } else {
        this.teamJoker = [];
      }
    },
    setTeamCount(count) {
      this.teamCount = Number(count);
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
.group__item {
  margin: 0 5px;
}
/* .jocker {
  background: black;
} */
</style>
