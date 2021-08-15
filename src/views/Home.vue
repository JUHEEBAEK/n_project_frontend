<template>
  <v-container>
    <v-row>
      <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6">
        {{ userInfo }}
      </v-col>
      <v-col cols="12" sm="6" md="6" lg="6" xl="6">
        <!-- <widget-basic :header-title="title" :is-loading="isLoading">
          <chart-bar-inverse
            class="chart"
            :data-set="chartData"
            :margin-left="40"
            :margin-top="0"
            :tick-count="5"
            :bar-padding="0.3"
          />
        </widget-basic> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    chartData: [],
    title: "2020 출석횟수",
    isLoading: false
  }),
  computed: {
    ...accountMapGetters(["userInfo"])
  },
  async mounted() {
    // 출석횟수 가져오기
    // this.getAttendRate("2020");
  },
  methods: {
  }
};
</script>

<style scoped></style>
