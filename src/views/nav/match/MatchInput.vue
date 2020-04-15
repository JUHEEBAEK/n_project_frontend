<template>
  <div>
    <core-Toolbar />
    <core-Navigation />
    <!-- 스케쥴 리스트 영역 -->
    <v-container class="schedule__container">
      <v-row dense>
        <v-col cols="12" xs="12" class="date__content">
          <span>SELECTED DATE</span> -
          <span class="date__month pr-2">{{ setMonth }}</span>
          <span class="date__year">{{ setYear }}</span>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col cols="12" class="schedule__list">
          <v-slide-group v-model="scheduleIndex" show-arrows center-active>
            <v-slide-item
              v-for="item in scheduleList"
              :key="item.id"
              v-slot:default="{ active, toggle }"
            >
              <v-card
                class="date__card ma-2"
                :class="{ active: active }"
                height="70"
                width="50"
                @click="toggle"
                @click.native="setInfo(item)"
              >
                <v-row class="fill-height" align="center" justify="center">
                  <v-scale-transition>
                    <div>
                      <p class="date__Mon my-2">
                        {{ item.date | setMomentMonth }}
                      </p>
                      <p class="date__day mb-0">{{ item.date.substr(8, 2) }}</p>
                    </div>
                  </v-scale-transition>
                </v-row>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-col>
      </v-row>
    </v-container>
    <!-- 쿼터 리스트 영역 -->
    <v-container class="quarter__container">
      <v-row class="mx-2">
        <v-col cols="12" class="quarter__list">
          <v-slide-group v-model="quarterIndex" show-arrows center-active>
            <v-slide-item
              v-for="item in quarterCount"
              class="my-2"
              :key="item"
              v-slot:default="{ active, toggle }"
            >
              <v-card
                class="quarter__card"
                :class="{ active: active }"
                height="30"
                width="50"
                @click="toggle"
                @click.native="setQuaterInfo(item)"
              >
                <v-scale-transition>
                  <p class="quarter__text">{{ item }}</p>
                </v-scale-transition>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-col>
      </v-row>
    </v-container>
    <!-- 경기 기록 이벤트 타입 설정 부분 -->
    <v-container>
      <v-row>
        <v-col cols="12" class="mx-2 py-1">
          <v-switch
            class="mt-0"
            v-model="isGoal"
            hide-details
            :label="`Status: ${setStatus}`"
          ></v-switch>
        </v-col>
      </v-row>
      <!-- 경기에 참여한 선수 그려주는 화면 -->
      <!-- <v-row class="position__field" justify="center">
        <v-col cols="12" lg="4" sm="12" xs="12">
          <v-row>
            <v-col
              class="position__box position__box-home text-center px-0 pb-0"
              cols="4"
              align-self="center"
              v-for="item in positionHomeList"
              :key="item"
            >
              <span>{{ item }} </span>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row class="position__field" justify="center">
        <v-col cols="4">
          <v-row>
            <v-col
              class="position__box position__box-away text-center px-0 pb-0"
              cols="4"
              align-self="center"
              v-for="item in positionAwayList"
              :key="item"
            >
              <span>{{ item }} </span>
            </v-col>
          </v-row>
        </v-col>
      </v-row> -->

      <v-row>
        <v-container>
          <v-row>
            <!--필드 그림:: 선수 선택 페이지 -->
            <v-col cols="6">
              <v-row>
                <v-col cols="10">
                  <v-row class="position__field" justify="center">
                    <v-col
                      class="position__box position__box-home text-center px-0 pb-0"
                      cols="4"
                      align-self="center"
                      v-for="item in positionHomeList"
                      :key="item"
                    >
                      <span>{{ item }} </span>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="2" align-self="center">
                  <v-row class="position__bench" justify="center">
                    <v-col
                      class="position__box text-center px-0 pb-0"
                      cols="12"
                      align-self="center"
                      v-for="item in benchList"
                      :key="item"
                    >
                      <span>{{ item }} </span>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row class="pa-0" justify="end">
                <v-col class="pa-0" cols="2">
                  <v-btn> 어시 </v-btn>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="10">
                  <v-row class="position__field" justify="center">
                    <v-col
                      class="position__box position__box-away text-center px-0 pb-0"
                      cols="4"
                      align-self="center"
                      v-for="item in positionAwayList"
                      :key="item"
                    >
                      <span>{{ item }} </span>
                    </v-col>
                  </v-row>
                </v-col>
                <v-col cols="2" align-self="center">
                  <v-row class="position__bench" justify="center">
                    <v-col
                      class="position__box text-center px-0 pb-0"
                      cols="12"
                      align-self="center"
                      v-for="item in benchList"
                      :key="item"
                    >
                      <span>{{ item }} </span>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-col>
            <!-- 경기 기록 페이지 -->
            <v-col cols="6">
              <v-card class="match__report" color="grey lighten-2">
                <v-card-text class="headline py-1">게임 기록</v-card-text>
                <v-card-text>
                  <v-timeline>
                    <v-timeline-item
                      small
                      fill-dot
                      left
                      color="white"
                      icon="fas fa-futbol"
                      icon-color="black"
                      >백주희 이화인
                    </v-timeline-item>
                    <v-timeline-item
                      small
                      fill-dot
                      right
                      color="white"
                      icon-color="black"
                      icon="fas fa-exchange-alt fa-rotate-90"
                      >류새아라 이종은</v-timeline-item
                    >
                    <v-timeline-item
                      small
                      fill-dot
                      right
                      color="white"
                      icon-color="black"
                      icon="fas fa-futbol"
                      >이종은 김나경</v-timeline-item
                    >
                  </v-timeline>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import moment from "moment";
import dummyData from "../../../assets/value/dummy.json";
import Position from "../../../assets/value/Postion.json";

export default {
  filters: {
    setMomentMonth: function(val) {
      return moment(val).format("MMM");
    },
  },
  data: () => ({
    // 스케쥴 리스트 영역
    scheduleList: [],
    scheduleIndex: null,
    setYear: moment().format("YYYY"),
    setMonth: moment().format("MMMM"),
    setDay: moment().format("DD"),
    // 쿼터 리스트 영역
    quarterIndex: null,
    quarterCount: null,
    // 이벤트 기록 영역
    isGoal: true,
    eventType: "Goal",
    benchList: Position.benchList,
    positionHomeList: Position.homeList,
    positionAwayList: Position.awayList,
    position: Position.basicPostion,
  }),
  computed: {
    setStatus() {
      if (this.isGoal) {
        this.eventType = "Goal";
        return "Goal/Assign";
      } else {
        this.eventType = "Change";
        return "Change Player";
      }
    },
  },
  watch: {
    scheduleIndex: async function(val) {
      if (val) {
        let selected_schedule = this.scheduleList[this.scheduleIndex];
        this.setDateString(selected_schedule);
        // this.$emit("changeDate", selected_schedule);
      }
    },
    quarterCount: function() {
      this.quarterIndex =
        this.scheduleList[this.scheduleIndex]["quarterCount"] - 1;
    },
  },
  async created() {
    await this.setScheduleList();
    console.log(this.positionList);
    console.log(this.position);
  },
  methods: {
    setDateString(selected_schedule) {
      this.setYear = moment(selected_schedule.date).format("YYYY");
      this.setMonth = moment(selected_schedule.date).format("MMMM");
      this.setDay = moment(selected_schedule.date).format("DD");
    },
    setInfo(item) {
      console.log("스케줄 정보 가져오기", item);
      this.quarterCount = item.quarterCount;
      // this.$emit("changeDate", item);
    },
    setScheduleList() {
      this.scheduleList = dummyData.MatchInput_scheduleList;
      // 스케쥴 초기 세팅
      this.scheduleIndex = this.scheduleList.length - 1;
      // 쿼터 초기 세팅
      this.quarterCount = this.scheduleList[this.scheduleIndex]["quarterCount"];
    },

    setQuaterInfo(item) {
      console.log("quarterInfo 가져오기", item);
    },
  },
};
</script>

<style lang="scss">
.schedule__container {
  padding: 0;
  .date__content {
    text-align: left;
    font-size: 20px;
    font-weight: 200;

    .date__year {
      font-size: 20px;
      font-weight: 400;
    }
    .date__month {
      font-size: 24px;
      font-weight: 500;
    }
  }
  .schedule__list {
    .date__card {
      background-color: #fafafa;
      .date__Mon {
        color: #666;
        font-weight: 500;
      }
      .date__day {
        font-size: 20px;
        font-weight: 600;
        color: #34558b;
      }
      &.active {
        background-color: #34558b;
        .date__Mon {
          color: #ddd;
        }
        .date__day {
          font-size: 20px;
          font-weight: 600;
          color: white;
        }
      }
    }
  }
}

.quarter__container {
  padding: 0;
  .quarter__list {
    .quarter__card {
      margin: 0px 5px;
      padding: 5px 0;
      background-color: #fafafa;
      .quarter__text {
        font-size: 14px;
        color: #666;
        font-weight: 500;
        margin-bottom: 0;
      }
      &.active {
        background-color: #34558b;
        .quarter__text {
          color: #ddd;
        }
      }
    }
  }
}

.position__box {
  border: solid 1px forestgreen;
  height: 50px;
}

.position__field {
  background: #a5d6a7;
}
.position__bench {
  background: #f1cd74;
  overflow-y: scroll;
  height: 200px;
}

.match__report {
  height: 450px;
}
</style>
