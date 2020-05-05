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
                      <p class="date__Mon my-2">{{ item.date | setMomentMonth }}</p>
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
          <v-switch class="mt-0" v-model="isGoal" hide-details :label="`Status: ${setStatus}`"></v-switch>
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
      </v-row>-->

      <v-row>
        <v-container>
          <v-row>
            <!--필드 그림:: 선수 선택 페이지 -->
            <v-col cols="12" sm="6" xs="12">
              <v-row>
                <v-col cols="12" class="py-0">
                  <div class="text__box">HOME</div>
                  <v-card class="position__field" color="#81c784">
                    <v-row justify="center">
                      <v-col
                        v-for="player in homePlayerList"
                        :key="player"
                        class="position__box position__box-home"
                        cols="4"
                        align-self="center"
                      >
                        <v-btn
                          rounded
                          small
                          color="lime lighten-2"
                          @click="clickPlayer(player)"
                        >{{ player.name }}</v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" class="py-0">
                  <div class="text__box">AWAY</div>
                  <v-card class="position__field" color="#81c784">
                    <v-row justify="center">
                      <v-col
                        v-for="player in awayPlayerList"
                        :key="player"
                        class="position__box position__box-away"
                        cols="4"
                        align-self="center"
                      >
                        <v-btn
                          rounded
                          small
                          color="lime lighten-2"
                          @click="clickPlayer(player)"
                        >{{ player.name }}</v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-col>
              </v-row>
              <v-row class="pa-0" justify="end">
                <v-col cols="2" class="px-2">
                  <p>상태</p>
                  <span>{{ firstEventType }}</span>
                </v-col>
                <v-col cols="2" class="px-2">
                  <p>선수1</p>
                  <span>{{ firstPlayer }}</span>
                </v-col>
                <v-col cols="2" class="px-2">
                  <p>상태</p>
                  <span>{{ lastEventType }}</span>
                </v-col>
                <v-col cols="2" class="px-2">
                  <p>선수2</p>
                  <span>{{ lastPlayer }}</span>
                </v-col>
                <v-col class="pa-0 d-flex flex-column align-center" cols="4" align-self="center">
                  <v-btn class="my-1" x-small fab @click="init">
                    <v-icon dark>fas fa-eraser</v-icon>
                  </v-btn>
                  <v-btn class="my-1" x-small fab color="primary" @click="clickSaveButton">
                    <v-icon dark>fas fa-pencil-alt</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
            <!-- 경기 기록 페이지 -->
            <v-col cols="12" sm="6" xs="12" class="py-0">
              <v-card class="match__report" color="grey lighten-2">
                <v-card-text class="headline py-1">게임 기록</v-card-text>
                <v-card-text class="pa-0">
                  <v-timeline>
                    <v-timeline-item
                      v-for="event in eventList"
                      :key="event"
                      class
                      small
                      fill-dot
                      color="white"
                      :right="event.team_type === 'A' ? true : false"
                      :left="event.team_type === 'H' ? true : false"
                      :icon="
                        event.event_type === 'Goal'
                          ? 'fas fa-futbol'
                          : 'fas fa-exchange-alt'
                      "
                      icon-color="black"
                    >
                      <span class="firstEvent">{{ event.firstPlayer }}</span>
                      <span class="lastEvent ma-1">{{ event.lastPlayer }}</span>
                      <span class="ma-1">
                        <v-btn x-small icon @click="deleteButton(event)">
                          <v-icon dark>fas fa-times</v-icon>
                        </v-btn>
                      </span>
                    </v-timeline-item>
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
    }
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
    buttonClickState: null,
    // 이벤트 기록 영역
    isGoal: true,
    firstEventType: "Goal",
    lastEventType: "Assist",
    firstPlayer: null,
    lastPlayer: null,
    teamType: null,
    benchList: Position.benchList,
    positionHomeList: Position.homeList,
    positionAwayList: Position.awayList,
    position: Position.basicPostion,
    homePlayerList: [],
    awayPlayerList: [],
    eventList: []
  }),
  computed: {
    setStatus() {
      this.init();
      if (this.isGoal) {
        this.firstEventType = "Goal";
        this.lastEventType = "Assist";
        return "Goal/Assist";
      } else {
        this.firstEventType = "Out";
        this.lastEventType = "In";
        return "Change Player";
      }
    }
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
    }
  },
  async created() {
    await this.setScheduleList();
    this.getHomeTeamPlayerList();
    this.getAwayTeamPlayerList();
    this.getEventList();
  },
  methods: {
    init() {
      this.firstPlayer = null;
      this.lastPlayer = null;
      this.teamType = null;
    },
    clickSaveButton() {
      console.log(this.eventList);
      this.eventList.push({
        event_type: this.firstEventType,
        firstPlayer: this.firstPlayer,
        lastPlayer: this.lastPlayer,
        teamType: this.teamType
      });

      this.init();
    },
    clickPlayer(val) {
      console.log("clickPlayer", val);
      if (this.teamType !== null && this.teamType !== val.team) {
        alert("같은 팀을 선택해주세요.");
        this.init();
      } else if (this.firstPlayer !== null && this.firstPlayer === val.name) {
        alert("같은 사람을 선택할 수 없습니다.");
        this.init();
      } else {
        this.teamType = val.team;
        if (this.firstPlayer === null) {
          this.firstPlayer = val.name;
        } else {
          this.lastPlayer = val.name;
        }
      }
    },
    deleteButton: function(event) {
      this.eventList.forEach((item, idx) => {
        if (item.event_id === event.event_id) {
          this.eventList.splice(idx, 1);
        }
      });
    },
    getEventList: function() {
      // TODO: 경기 이벤트 리스트 가져오는 API 호출
      this.eventList = dummyData.gameEventList;
      // console.log(this.eventList);
    },
    getHomeTeamPlayerList: function() {
      // TODO: 홈팀 선수리스트 가져오는 API 호출
      this.homePlayerList = dummyData.homeTeamPlayers;
      // console.log(this.homePlayerList);
    },
    getAwayTeamPlayerList: function() {
      // TODO: 어웨이팀 선수리스트 가져오는 API 호출
      this.awayPlayerList = dummyData.awayTeamPlayers;
      // console.log(this.awayPlayerList);
    },
    setDateString(selected_schedule) {
      this.setYear = moment(selected_schedule.date).format("YYYY");
      this.setMonth = moment(selected_schedule.date).format("MMMM");
      this.setDay = moment(selected_schedule.date).format("DD");
    },
    setInfo(item) {
      // TODO: 스케쥴 정보 선택 API 호출
      this.quarterCount = item.quarterCount;
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
    }
  }
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
.text__box {
  position: absolute;
  display: contents;
}

.position__field {
  padding: 20px 0;
  //  background: #81c784;
  .position__box {
    // border: solid 1px #73b476;
    height: 50px;

    .position__content {
      font-size: 12px;
      font-weight: 800;
      background: #c0e2c2;
      width: 40px;
      height: 40px;
    }
  }
}
.position__bench {
  background: #f1cd74;
  overflow-y: scroll;
  height: 200px;

  .position__box {
    // border: solid 1px #73b476;
    height: 50px;

    .position__content {
      font-size: 12px;
      font-weight: 800;
      background: #c0e2c2;
    }
  }
}

.match__report {
  height: 450px;

  .firstEvent {
  }
}
</style>
