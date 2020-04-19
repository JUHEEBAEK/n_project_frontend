<template>
  <div>
    <core-Toolbar />
    <core-Navigation />
    <v-row class="match__container" justify="center">
      <v-col cols="12" lg="8" md="9" sm="12" xs="12">
        <v-contatner fluid>
          <v-form ref="form">
            <schedule-date-list 
            @changeDate="setScheduleData"></schedule-date-list>
            <squad-quarter></squad-quarter>
            <squad-team-list></squad-team-list>
            <squad-input-position></squad-input-position>
            <v-row>
              <v-col>
                <v-btn @click="save" color="primary">저장</v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-contatner>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const {
  mapState: calendarMapState,
  mapGetters: calendarMapGetters,
  mapMutations: calendarMapMutations,
  mapActions: calendarMapActions
} = createNamespacedHelpers("calendar");
const {
  mapState: squadState,
  mapActions: squadActions
} = createNamespacedHelpers("squad");

const {
  mapState: prepareMatchState,
  mapGetters: prepareMatchGetters,
  mapActions: prepareMatchActions
} = createNamespacedHelpers("prepareMatch");

export default {
  computed: {
    ...prepareMatchState(["selectedSplitedTeam", "homeTeam", "awayTeam"]),
    ...prepareMatchGetters(["currentQuarter"]),
    ...calendarMapGetters(["current_schedule_id"])
  },
  methods: {
    ...squadActions(['getSplitTeamListWithSchedule']),
    ...calendarMapActions(["load_member"]),
    ...prepareMatchActions(["setSplitTeamList","setSummarySplitTeamList","checkGameAlreadyExist",
                            "createSquad"]),
    async save() {
      // 확인해야하는 것
      // 1. this.homeTeam과 away팀이 있어야됨
      // 2. 각 선수가 모두 포지션이 있어야됨
      // 둘다 채워야하나??
      if (!this.homeTeam || !this.awayTeam) {
        console.log('home팀 away팀 둘다 채워주세요')
        return;
      }

      console.log("SAVE");
      console.log(this.homeTeam)
      console.log(this.awayTeam)      
      

      // 스케쥴 id와 쿼터를 찍기 state
      console.log("GET_CURRENT_SCHEDULE_ID", this.current_schedule_id)
      console.log("currentQuarter", this.currentQuarter)
      let formSearchGame = {};
      formSearchGame["schedule_id"] = this.current_schedule_id;
      formSearchGame["quarter"] = this.currentQuarter;
      let checkGameAlreadyExist =  await this.checkGameAlreadyExist(formSearchGame)
      // 해당 스케쥴, 쿼터에 해당하는 게임이 있는지 확인 Action
      if (checkGameAlreadyExist){
        console.log("game Exist")
        // 게임이 있다면
      // 0. 스쿼드 id가져오기
      // 1. 기존 스쿼드 멤버들을 없애기
      // 2. 스쿼드멤버를 다시 넣기
      }else{
        console.log("game Not Exist")
        // 게임이 없다면
        // 1. 스쿼드를 만들기
        // 스쿼드 만들려면 스케쥴 id랑 팀 넘버 필요함
        // this.current_schedule_id, this.homeTeam["teamNumber"], this.awayTeam["teamNumber"]
        let formHomeSquad = {}
        formHomeSquad["schedule_id"] = this.current_schedule_id
        formHomeSquad["team_number"] = this.homeTeam["teamNumber"]
        let formAwaySquad = {}
        formAwaySquad["schedule_id"] = this.current_schedule_id
        formAwaySquad["team_number"] = this.awayTeam["teamNumber"]
        await this.createSquad(formHomeSquad)
        await this.createSquad(formAwaySquad)
        // 2. 스쿼드멤버 추가하기
        // 3. 게임을 만들기 
        //    등록할 때 0대0 무승부로 등록해두기 
      }

      

      

      if (this.$refs.form.validate()) {
        //home과 away를 return 할 것
      }
    },
    async setScheduleData(selected_schedule) {
      if (this.scheduleIndex == -1) return;
      
      // db에서 불러오는 부분
      await this.getSplitTeamListWithSchedule(selected_schedule.id);
      await this.load_member(selected_schedule.id);
      // prepareMatch store에서 값 세팅
      await this.setSplitTeamList();
      await this.setSummarySplitTeamList();

    },

  },
};
</script>

<style></style>
