<template></template>

<script>
import gameReportData from "../../assets/value/gameReport.json";

export default {
  props: {
    selectedYear: Number,
    selectedMonth: String
  },
  // watch: {
  //   selectedYear() {
  //     console.log("?????");
  //   }
  // },
  data: () => ({
    years: gameReportData.years,
    months: gameReportData.months
  })
};
</script>

<style></style>
