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
        <v-slide-group v-model="scheduleIndex" show-arrows center-active>
          <v-slide-item
            v-for="item in scheduleList"
            :key="item.id"
            v-slot:default="{ active, toggle }"
          >
            <v-card
              class="date__card ma-2"
              :class="{ active: active}"
              height="70"
              width="50"
              @click="toggle"
              @click.native="setScheduleInfo(item)"
            >
              <v-row class="fill-height" align="center" justify="center">
                <v-scale-transition>
                  <div>
                    <p class="date__Mon my-2">{{ item.date | setMomentMonth }}</p>
                    <p class="date__day mb-0">{{ item.date.substr(8,2) }}</p>
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
const { mapActions: attendMapActions } = createNamespacedHelpers("attend");

export default {
  async created() {},
  data: () => ({
    month: null
  }),
  props: {
    scheduleList: {
      type: Array,
      default: null
    },
    scheduleIndex: {
      type: Number,
      default: 0
    },
    setYear: {
      type: Number,
      default: null
    },
    setMonth: {
      type: String,
      default: null
    }
  },
  filters: {
    setMomentMonth: function(val) {
      return moment(val).format("MMM");
    }
  },

  watch: {
    scheduleIndex: async function(val) {
      console.log("scheduleIndex", val);
      if (val) {
        this.$emit("setDate", this.scheduleList[this.scheduleIndex]);
        // 출석률 가져오기
        await this.get_attend_rate(this.scheduleList[this.scheduleIndex].date);
        // 그중에 출석한 사람들 업데이트 해주기
        await this.get_attend(this.scheduleList[this.scheduleIndex].id);
      }
    }
  },
  methods: {
    ...attendMapActions(["get_attend_rate", "get_attend"]),
    setScheduleInfo(item) {
      this.$emit("setDate", item);
    }
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