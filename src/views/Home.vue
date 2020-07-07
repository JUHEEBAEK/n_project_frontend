<template>
  <div>
    <h2> 출석률 </h2>
    <chart-bar
      class="chart"
      :data-set="chartData"
      :margin-left="40"
      :margin-top="40"
      :tick-count="5"
      :bar-padding="0.5"
    />
    <chart-bar-inverse
      class="chart"
      :data-set="chartData2"
      :margin-left="80"
      :margin-top="40"
      :tick-count="5"
      :bar-padding="0.5"
    />
  </div>
</template>

<script>

import { createNamespacedHelpers } from "vuex";
const {
  mapState: attendMapState,
  mapActions: attendMapActions
} = createNamespacedHelpers("attend");

export default {
  data: () => ({
    chartData: [
        ["Bob", 33],
        ["Robin", 24],
        ["Mark", 22],
        ["Joe", 29],
        ["Eve", 38],
        ["Karen", 21],
        ["Kirsty", 25],
        ["Chris", 30]
      ],
    chartData2: [
        ["Bob", 33],
        ["Robin", 24],
        ["Mark", 22],
        ["Joe", 29],
        ["Eve", 38],
        ["Karen", 21],
        ["Kirsty", 25],
        ["Chris", 30]
      ],
  }),
  async mounted() {
    // 출석횟수 가져오기
    this.getAttendRate("2020")
  },
  methods: {
    ...attendMapActions(['countByYear']),
    async getAttendRate(selectedYear){
      let yeardata = await this.countByYear()
      console.log('yeardata', yeardata, selectedYear)
      this.chartData = []
      for (let i in yeardata){
        let year = yeardata[i].year
        if (year == selectedYear){
          let name = yeardata[i].name
          let count = Number(yeardata[i].count)
          this.chartData.push([name, count])
        }
      }
    }
  },
};
</script>

<style scoped></style>
