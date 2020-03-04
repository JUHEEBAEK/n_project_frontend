<template>
  <v-container>
    <v-row>
      <v-col cols="6" class="attandance__date">
        <span>SELECTED DATE</span> -
        <span class="date__month pr-2">{{ setMonth }}</span>
        <span class="date__year">{{ setYear }}</span>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
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
              @click.native="setScheduleInfo(item)"
            >
              <v-row class="fill-height" align="center" justify="center">
                <v-scale-transition>
                  <span class="date__day">{{ item.date.substr(8, 2) }}</span>
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
  data: () => ({}),
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
  watch: {
    scheduleIndex: async function(val) {
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

<style>
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
</style>