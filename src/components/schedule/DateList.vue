<template>
  <v-container class="schedule__container">
    <v-row dense>
      <v-col cols="12" xl="3" lg="4" md="6" sm="6" xs="12" class="date__content">
        <span>SELECTED DATE</span> -
        <span class="date__month pr-2">{{ setMonth }}</span>
        <span class="date__year">{{ setYear }}</span>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" class="schedule__list">
        <v-slide-group v-model="slide_index" show-arrows center-active>
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
              @click.native="setScheduleInfo(item)"
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
</template>

<script>
import moment from "moment";
import { createNamespacedHelpers } from "vuex";
const {
  mapState: calendarMapState,
  mapMutations: calendarMapMutations,
    mapActions: calendarMapActions
} = createNamespacedHelpers("calendar");

export default {
  filters: {
    setMomentMonth: function(val) {
      return moment(val).format("MMM");
    }
  },
  data: () => ({
    month: null,
    slide_index: null,
    setMonth: moment().format("MMMM"),
    setYear: moment().format("YYYY"),
    setDay: moment().format("DD"),
  }),
  computed: {
    ...calendarMapState(["scheduleIndex", "scheduleList"]),    
  },  
  watch: {
    scheduleIndex: function(val) {
      this.slide_index = this.scheduleIndex;
      console.log("Slide Index Changed", this.slide_index);
    },
    slide_index: async function(val) {
      if (val) {
        console.log("slide_index", val);
        let selected_schedule = this.scheduleList[this.slide_index];
        this.setDateString(selected_schedule)
        this.$emit("changeDate", selected_schedule);
      }
    }
  },
  async created() {
    await this.select_schedule();
    // 가장 최신걸 선택
    this.SET_SCHEDULE_INDEX(this.scheduleList.length - 1);
    // 연동 필수
    this.slide_index = this.scheduleIndex
  },  
  methods: {
    ...calendarMapMutations(["SET_SCHEDULE_INDEX"]),
    ...calendarMapActions(["select_schedule", "load_member"]),
    setScheduleInfo(item) {
      this.$emit("changeDate", item);
    },
    setDateString(selected_schedule){
      this.setYear = moment(selected_schedule.date).format("YYYY");
      this.setMonth = moment(selected_schedule.date).format("MMMM");
      this.setDay = moment(selected_schedule.date).format("DD");
    },

  }
};
</script>

<style lang="scss">
.schedule__container {
  padding: 0;
  .date__content {
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
</style>
