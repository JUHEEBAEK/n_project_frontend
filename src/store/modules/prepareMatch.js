import {set} from "../../utils/index";
import * as constants from "../constants";

import moment from "moment";

import {
  searchWithScheduleIdAndQuarter,
  createGame,
  updateGame,
} from "../../api/game.js";
import {
  createSquad,
} from "../../api/squad.js";
import {
  createMultipleMemberSquad,
  deleteMemberSquad,
} from "../../api/memberSquad.js";

const state = {
  date: moment().format("YYYY-MM-DD"),
  quarterList: [1,2,3,4,5,6],
  quarterIndex: 0,
  isHome: true,
  selectType: "Home",
  homeTeam: {},
  awayTeam: {}, 
  splitTeamList:{
  }, 
  
  headerOfSplitTeam:[{
      "text": "번호",
      "value": "splitTeamIndex"
    },
    {
      "text": "팀 수",
      "value": "numberOfTeam"
    },
    {
      "text": "첫 팀 선수",
      "value": "memberNameList"
    },
    {
      "text": "조커",
      "value": "jockerName"
    }
  ],
  summarySplitTeamList:[{
      "splitTeamIndex": 1, 
      "numberOfTeam": 2, 
      "memberNameList": ["주희", "화인", "종은"], 
      "jockerName": "나경"
    },
    {
      "splitTeamIndex": 2,
      "numberOfTeam": 3,
      "memberNameList": ["채민", "나경", "종은"],
      "jockerName": "-",
    }
  ],
  selectedSplitedTeam: null,
};

const getters = {
  currentQuarter(state){
    return state.quarterList[state.quarterIndex]
  }
};

const mutations = {
  [constants.setDate]: set("date"),
  [constants.setHomeTeam]: set("homeTeam"),
  [constants.setAwayTeam]: set("awayTeam"),
  [constants.setIsHome]: set("isHome"),
  [constants.setType]: set("selectType"),
  [constants.quarterIndex]: set("quarterIndex"),
  SET_SPLIT_TEAM_LIST(state, splitTeam){
    state.splitTeamList = {}

    for (let team_split_index in splitTeam){
      state.splitTeamList[team_split_index] = {}
      let member_dict = splitTeam[team_split_index]
      for (var member_id in member_dict){
        let member = member_dict[member_id]
        let team_number = member["team_number"]
        if (!state.splitTeamList[team_split_index][team_number]){
          state.splitTeamList[team_split_index][team_number] = {};
        }
        state.splitTeamList[team_split_index][team_number][member_id] = member;
      } 
    }
  },
  SET_SUMMARY_SPLIT_TEAM_LIST(state){
    state.summarySplitTeamList = []
    for (let team_split_index in state.splitTeamList){
      let summarySplitTeam = {}
      let team_dict = state.splitTeamList[team_split_index]
      let first_team_dict = team_dict[1]
      let member_name_list = []
      for (let member_id in first_team_dict){
        let member = first_team_dict[member_id]
        member_name_list.push(member.name)
        if (member_name_list.length == 3){
          break
        }
      }
      let isJocker =  Object.keys(team_dict)[0] == "0"
      
      summarySplitTeam["splitTeamIndex"] = Number(team_split_index)
      summarySplitTeam["numberOfTeam"] = Object.keys(team_dict).length
      summarySplitTeam["memberNameList"] = member_name_list
      if (isJocker){
        for (var i in team_dict[0]){
          let jockerName = team_dict[0][i].name
          summarySplitTeam["jockerName"] = jockerName
        }
      }else{
        summarySplitTeam["jockerName"] = "-"
      }
      
      state.summarySplitTeamList.push(summarySplitTeam)
    }
  },
  SET_SELECTED_SPLIT_TEAM(state, payload){
    state.selectedSplitedTeam = payload
  },
  PARSE_SELECTED_SPLIT_TEAM(state, {splitTeam, selected_index}){
    state.selectedSplitedTeam = {}
    
    let selected_team_member_dict = splitTeam[selected_index]
    
    for (var member_id in selected_team_member_dict){
      let member = selected_team_member_dict[member_id]
      member["position"] = null

      let team_number = member["team_number"]
      if (!state.selectedSplitedTeam[team_number]){
        state.selectedSplitedTeam[team_number] = {"teamNumber": team_number, "members":[]};
      }
      
      state.selectedSplitedTeam[team_number]["members"].push(member)
    }
  },
  
};

const actions = {
  setSplitTeamList(context){
    let splitTeam = context.rootState.squad.splitTeam
    context.commit("SET_SPLIT_TEAM_LIST", splitTeam)
  },
  setSummarySplitTeamList(context){
    let splitTeam = context.rootState.squad.splitTeam
    context.commit("SET_SUMMARY_SPLIT_TEAM_LIST", splitTeam)


  },
  setSelectedSplitedTeam(context, selected_index){
    let splitTeam = context.rootState.squad.splitTeam
    let payload = {
      splitTeam: splitTeam,
      selected_index: selected_index,
    }
    
    context.commit("PARSE_SELECTED_SPLIT_TEAM", payload)
  },
  async checkGameAlreadyExist(context, form){
    try {
      const response = await searchWithScheduleIdAndQuarter(form);
      console.log("checkGameAlreadyExist", response.data)
      if (response.data){
        return response.data[0]
      }else{
        return false
      }
    } catch (e) {
      console.log(e);
    }
  },
  async createSquad(context, form){
    try {
      const response = await createSquad(form);
      console.log("createSquad", response)
      if (response.data){
        return response.data.insertId
      }else{
        return false
      }
    } catch (e) {
      console.log(e);
    }
  },
  async createMultipleMemberSquad(context, {squad_id, memberData}){
    try {
      let memberSquadformArray = []
      for (let i in memberData.members){
        let member = memberData.members[i]
        memberSquadformArray.push([squad_id, member.member_id, member.position])
      }
      const response = await createMultipleMemberSquad(memberSquadformArray);
      console.log("createMemberSquad", response)
      return true
    } catch (e) {
      console.log(e);
    }
  },
  async createGame(context, gameForm){
    try {
      const response = await createGame(gameForm);
      console.log("createGame", response)
      return true
    } catch (e) {
      console.log(e);
    }
  },
  async updateGame(context, gameUpdateForm){
    try {
      const response = await updateGame(gameUpdateForm);
      console.log("updateGame", response)
      return true
    } catch (e) {
      console.log(e);
    }
  },
  async deleteMemberSquad(context, deleteMemberSquadForm){
    try {
      const response = await deleteMemberSquad(deleteMemberSquadForm);
      console.log("deleteMemberSquad", response)
      return true
    } catch (e) {
      console.log(e);
    }
  }
};


export default {
  state,
  getters,
  mutations,
  actions
};