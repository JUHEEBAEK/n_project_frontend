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
  mapMutations: squadMutations,
  mapActions: squadActions
} = createNamespacedHelpers("squad");

const {
  mapState: prepareMatchState,
  mapGetters: prepareMatchGetters,
  mapMutations: prepareMatchMutations,
  mapActions: prepareMatchActions
} = createNamespacedHelpers("prepareMatch");

export default {
  data: () => ({
  }),
  computed: {
    ...prepareMatchState(["selectedSplitedTeam", "homeTeam", "awayTeam"]),
    ...prepareMatchGetters(["currentQuarter"]),
    ...calendarMapGetters(["current_schedule_id"])
  },
  async created() {
    await this.select_schedule();
    let params = this.$route.params
    if (Object.keys(params).length){
      this.SET_SCHEDULE_INDEX(params["scheduleIndex"])
      //  params["team_split_index"] <-- 이거를 잘 넘겨야됨
    }else{
      this.CHOOSE_LATEST_SCHEDULE()
    }
  },
  methods: {
    ...squadActions(['getSplitTeamListWithSchedule']),
    ...calendarMapActions(["select_schedule", "load_member"]),    
    ...calendarMapMutations(["CHOOSE_LATEST_SCHEDULE", "SET_SCHEDULE_INDEX"]),
    ...prepareMatchActions(["setSplitTeamList","setSummarySplitTeamList","checkGameAlreadyExist",
                            "createSquad", "createMultipleMemberSquad", "createGame", "deleteMemberSquad",
                            "updateGame"]),
    async save() {
      // 확인해야하는 것
      // 1. this.homeTeam과 away팀이 있어야됨
      // 2. 각 선수가 모두 포지션이 있어야됨
      // 둘다 채워야하나??
      if (!this.homeTeam ) {
        console.log('home팀 채워주세요')
        return;
        if (this.$refs.form.validate()) {
          //home과 away를 return 할 것
          // 여긴 뭐지??
        }
      }
      if (this.awayTeam.members){
        var awayExist = true
      }else{
        var awayExist = false
      }

      console.log("SAVE");
      console.log('Home', this.homeTeam)
      console.log('Away', this.awayTeam)      
      
      // 스케쥴 id와 쿼터를 찍기 state
      console.log("GET_CURRENT_SCHEDULE_ID", this.current_schedule_id)
      console.log("currentQuarter", this.currentQuarter)
      let formSearchGame = {};
      formSearchGame["schedule_id"] = this.current_schedule_id;
      formSearchGame["quarter"] = this.currentQuarter;
      let searchedGame =  await this.checkGameAlreadyExist(formSearchGame)
      // 해당 스케쥴, 쿼터에 해당하는 게임이 있는지 확인 Action
      if (searchedGame){

        // 게임이 있다면
        // 0. 스쿼드 id가져오기
        let homeSquadId = searchedGame["home_squad_id"]
        let awaySquadId = searchedGame["away_sqaud_id"]
        
        // 1. 기존 스쿼드 멤버들을 없애기
        let deleteMemberSquadForm = {}
        deleteMemberSquadForm["squad_id"] = homeSquadId
        await this.deleteMemberSquad(deleteMemberSquadForm)
        if (awaySquadId){ // 기존 away가 존재할 경우
          deleteMemberSquadForm["squad_id"] = awaySquadId
          await this.deleteMemberSquad(deleteMemberSquadForm)
        }
        // 2. 스쿼드멤버를 넣기
        await this.createMultipleMemberSquad({"squad_id": homeSquadId, "memberData": this.homeTeam})
        if (awayExist){
          if (awaySquadId){
            await this.createMultipleMemberSquad({"squad_id": awaySquadId, "memberData": this.awayTeam})
          }else{
            // awaySqaud 만들기
            let formAwaySquad = {}
            formAwaySquad["schedule_id"] = this.current_schedule_id
            formAwaySquad["team_number"] = this.awayTeam["teamNumber"]
            awaySquadId = await this.createSquad(formAwaySquad)
            
            // member 추가하기
            await this.createMultipleMemberSquad({"squad_id": awaySquadId, "memberData": this.awayTeam})

            // game에 away_squad_id update하기
            let gameUpdateForm = {
              "game_id": searchedGame["id"],
              "game": {"away_squad_id": awaySquadId}
            }
            this.updateGame(gameUpdateForm);
          }
        }
      }else{      
        console.log("game Not Exist")
        // 게임이 없다면
        // 1. 스쿼드를 만들기
        // 스쿼드 만들려면 스케쥴 id랑 팀 넘버 필요함
        let formHomeSquad = {}
        formHomeSquad["schedule_id"] = this.current_schedule_id
        formHomeSquad["team_number"] = this.homeTeam["teamNumber"]
        
        let formAwaySquad = {}
        if (awayExist){
          formAwaySquad["schedule_id"] = this.current_schedule_id
          formAwaySquad["team_number"] = this.awayTeam["teamNumber"]
        }

        // 만들어진 스쿼드 id를 가져오기
        let homeSquadId = await this.createSquad(formHomeSquad)
        let awaySquadId = null
        if (awayExist){
          awaySquadId = await this.createSquad(formAwaySquad) 
        }
        // 2. 스쿼드멤버를 넣기
        await this.createMultipleMemberSquad({"squad_id": homeSquadId, "memberData": this.homeTeam})
        if (awayExist){
          await this.createMultipleMemberSquad({"squad_id": awaySquadId, "memberData": this.awayTeam})
        }
        // 3. 게임을 만들기 
        //    등록할 때 0대0 무승부로 등록해두기 
        // schedule_id, quarter, home_squad_id, away_squad_id, homescore, awayscore, result
        let gameForm = {}
        gameForm["schedule_id"] = this.current_schedule_id
        gameForm["quarter"] = this.currentQuarter
        gameForm["home_squad_id"] = homeSquadId
        gameForm["away_squad_id"] = awaySquadId
        gameForm["home_score"] = 0
        gameForm["away_score"] = 0 
        gameForm["result"] = 'D'
        await this.createGame(gameForm)
        console.log("저장 끝")
        this.$router.push({
          name: "matchInput",
          params: { "schedule_id": this.current_schedule_id, "quarter": this.currentQuarter }
        });
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
