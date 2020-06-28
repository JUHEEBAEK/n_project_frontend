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
                :label="contest.label"
                :value="contest.value"
                @change="handleChangeEvent('contest', contest.value)"
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
                :label="year.label"
                :value="year.value"
                @change="handleChangeEvent('year', year.value)"
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
                :label="month.label"
                :value="month.value"
                @change="handleChangeEvent('month', month.value)"
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
        contests: [{label:"대회", value:'C'}, {label:"친선", value:'M'}, {label:"훈련", value:'T'}, {label:"리그 경기", value:'L'}],
        years: [{label:"전체", value: 0},
                {label:"2018", value: 2018},
                {label:"2019", value: 2019},
                {label:"2020", value: 2020}],
        months: [{label:"전체", value: "0"}, 
                 {label:"1", value: "01"},
                 {label:"2", value: "02"},
                 {label:"3", value: "03"},
                 {label:"4", value: "04"},
                 {label:"5", value: "05"},
                 {label:"6", value: "06"},
                 {label:"7", value: "07"},
                 {label:"8", value: "08"},
                 {label:"9", value: "09"},
                 {label:"10", value: "10"},
                 {label:"11", value: "11"},
                 {label:"12", value: "12"},
                 ],

        selectedContest: 'T',
        selectedYear: 2000,
        selectedMonth: 0,
        current_filters:{
          contest:'T',
          year:2000,
          month:0,
        }
      }
    },
    computed: {
    },
    mounted() {
      
    },
    methods: {
      handleChangeEvent(type, value){
        console.log("handleChangeEvent", type, value)
        this.current_filters[type] = value
        console.log(this.current_filters)
        this.$emit("filterChanged", this.current_filters)
      },
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

