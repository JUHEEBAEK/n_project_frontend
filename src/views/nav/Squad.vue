<template>
  <div>
    <core-Toolbar></core-Toolbar>
    <core-navigation></core-navigation>
    <div>
      <v-sheet elevation="8">
        <div>
          <v-row dense justify="center">
            <v-col cols="6" class="attandance__date">
              <span>SELECTED DATE</span> -
              <span class="date__month pr-2">{{ setMonth }}</span>
              <span class="date__year">{{ setYear }}</span>
            </v-col>
          </v-row>
        </div>
        <v-slide-group v-model="scheduleIndex" show-arrows center-active>
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
                  <span class="date__day">{{ item.date.substr(8, 2) }}</span>
                </v-scale-transition>
              </v-row>
            </v-card>
          </v-slide-item>
        </v-slide-group>
        <v-expand-transition>
          <v-sheet color="grey lighten-4" height="150" tile>
            <v-row class="fill-height" align="center" justify="center">
              <v-col cols="12" sm="12" md="4" lg="3">
                <v-card :loading="loading" class="mx-auto">
                  <v-card-title class="schedule__title py-0">{{ scheduleName }}</v-card-title>
                  <v-card-text class="py-0">
                    <v-row>
                      <v-col cols="6">
                        <div class="schedule__stadium">{{ scheduleStadium }}</div>
                      </v-col>
                      <v-col cols="6">
                        <div class="schedule__time">{{ scheduleStart }} - {{ scheduleEnd }}</div>
                      </v-col>
                    </v-row>
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="12" md="8" lg="9">
                <v-card class="py-2">
                  <v-card-text class="text-left">
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
          </v-sheet>
        </v-expand-transition>
      </v-sheet>
    </div>
    <div>
      <v-card outlined class="pa-3">
        <v-card-actions class="justify-end">
          <v-btn class="mx-3" dark>팀나누기</v-btn>
          <v-btn icon @click="showSetting">
            <v-icon large>fas fa-cog</v-icon>
          </v-btn>
        </v-card-actions>
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
            <v-btn class="ma-1" fab small color="blue-grey darken-1"></v-btn>
            <v-btn class="ma-1" fab small color="blue-grey lighten-3"></v-btn>
          </div>
          <div>6 Vs 6</div>
          <div>깍두기 없음</div>
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn icon @click="save">
            <v-icon large>fas fa-arrow-right</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <squad-setting></squad-setting>
  </div>
</template>

<script>
import moment from "moment";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("attend");
const { mapMutations: commonapMutaions } = createNamespacedHelpers("common");
export default {
  name: "Attendance.vue",
  async created() {
    this.scheduleList = await getEventList();
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
</style>
