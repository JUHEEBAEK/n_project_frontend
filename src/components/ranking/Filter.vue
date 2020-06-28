<template>
    <v-container>
      <v-row>
        <v-col>
          <div class="selectHeader">
            <b>경기 종류</b>
          </div>
        </v-col>
        <v-col>
        <div class="selectHeader">
            <b>연도별</b>
          </div>
        </v-col>
        <v-col>
        <div class="selectHeader">
            <b>월별</b>
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <div class="selectBody">
            <v-radio-group v-model="selectedContest">
              <v-radio
                v-for="(contest, index) in contests"
                :key="`contest-${index}`"
                :label="contest"
                :value="contest"
              ></v-radio>
            </v-radio-group>
          </div>
        </v-col>
        <v-col>
          <div class="selectBody">
            <v-radio-group v-model="selectedYear">
              <v-radio
                v-for="(year, index) in years"
                :key="`year-${index}`"
                :label="year"
                :value="year"
              ></v-radio>
            </v-radio-group>
          </div>
        </v-col>
        <v-col> 
          <div class="selectBody">
            <v-radio-group v-model="selectedMonth">
              <v-radio
                v-for="(month, index) in months"
                :key="`month-${index}`"
                :label="month"
                :value="month"
              ></v-radio>
            </v-radio-group>
          </div>
        </v-col>
      </v-row>
    </v-container>
</template>


<script>
export default {
    props: {
        tableData: {
            type: Array,
            default: null
        },
    },
    data () {
      return {
        contests: ["대회", "친선"],
        years: ["전체", 2018, 2019, 2020],
        months: ["전체", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],

        selectedContest: "대회",
        selectedYear: "전체",
        selectedMonth: "전체"
      }
    },
    mounted() {
    },
}
</script>


<style scoped>

.selectBody{
  overflow-y: auto;
  height: 200px;
  border-right: 1px solid #d5d8d8;
  border-left: 1px solid #d5d8d8;
  padding: 2px 8px;
}
.selectHeader{
  padding: 8px 0;
  border-bottom: 1px solid #d5d8d8;
  text-align: left;
  font-weight: normal;
  text-indent: 20px;
  font-size: 20px;
}
</style>

