<template>
  <div>
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
      <v-slide-item v-for="item in scheduleList" :key="item.id" v-slot:default="{ active, toggle }">
        <v-card
          :color="active ? 'primary' : 'grey lighten-1'"
          class="ma-4"
          height="40"
          width="80"
          @click="toggle"
          @click.native="setInfo(item)"
        >
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <span class="date__day">{{ item.date.substr(8, 2) }}</span>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>
  </div>
</template>

<script>
import moment from "moment";

export default {
  created() {
    console.log("caedLIst created");
    this.scheduleIndex = this.initIndex;
  },
  props: {
    scheduleList: {
      type: Array,
      default: null
    },
    initIndex: {
      type: Number,
      default: 0
    }
  },
  data: () => ({
    scheduleIndex: null,
    scheduleLength: 0,
    setYear: moment().format("YYYY"),
    setMonth: moment().format("MMMM"),
    today: moment().format("YYYY-MM-DD"),
    setDay: null
  }),
  watch: {
    scheduleIndex: async function(val) {
      if (val) {
        this.$emit("setDate", this.scheduleList[this.initIndex]);
      }
    },
    setInfo: function(item) {
      console.log(item);
      this.$emit("setDate", item);
    }
  },

  methods: {}
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