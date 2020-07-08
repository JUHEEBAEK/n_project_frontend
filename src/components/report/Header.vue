<template>
  <v-app-bar flat color="white">
    <v-row>
      <v-spacer></v-spacer>
      <v-col cols="2">
        <v-select v-model="selectedYear" :items="years" label="년도 선택" solo rounded />
      </v-col>
      <v-col cols="2">
        <v-select v-model="selectedMonth" :items="months" label="월 선택" solo rounded />
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({
    selectedYear: "2020",
    selectedMonth: "06",
    years: ["2018", "2019", "2020"],
    months: [
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
      "12"
    ]
  })
};
</script>

<style>
</style>