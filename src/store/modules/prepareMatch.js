import {
  set
} from "../../utils/index";
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
  getinfoWithSquadId,
} from "../../api/memberSquad.js";

const state = {
  date: moment().format("YYYY-MM-DD"),
  quarterList: ["Q1", "Q2", "Q3", "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10"],
  quarterIndex: 0,
  isHome: true,
  selectType: "Home",
  homeTeam: {
    members: [{
      id: null,
      name: null
    }]
  },
  awayTeam: {
    members: [{
      id: null,
      name: null
    }]
  },
  splitTeamList: {},
  summarySplitTeamList: [{
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

  homeMembers: [],
  awayMembers: [],
};

const getters = {
  currentQuarterString(state) {
    return state.quarterList[state.quarterIndex]
  },
  currentQuarterNumber(state) {
    return state.quarterIndex + 1
  }
};

const mutations = {
  [constants.setDate]: set("date"),
  [constants.setHomeTeam]: set("homeTeam"),
  [constants.setAwayTeam]: set("awayTeam"),
  [constants.setIsHome]: set("isHome"),
  [constants.setType]: set("selectType"),
  [constants.quarterIndex]: set("quarterIndex"),
  SET_SPLIT_TEAM_LIST(state, splitTeam) {
    state.splitTeamList = {}
    for (let team_split_index in splitTeam) {
      state.splitTeamList[team_split_index] = {}
      let member_dict = splitTeam[team_split_index]
      for (var member_id in member_dict) {
        let member = member_dict[member_id]
        let team_number = member["team_number"]
        if (!state.splitTeamList[team_split_index][team_number]) {
          state.splitTeamList[team_split_index][team_number] = {};
        }
        state.splitTeamList[team_split_index][team_number][member_id] = member;
      }
    }
  },
  SET_SUMMARY_SPLIT_TEAM_LIST(state) {
    state.summarySplitTeamList = []
    for (let team_split_index in state.splitTeamList) {
      let summarySplitTeam = {}
      let team_dict = state.splitTeamList[team_split_index]
      let first_team_dict = team_dict[1]
      let member_name_list = []
      for (let member_id in first_team_dict) {
        let member = first_team_dict[member_id]
        member_name_list.push(member.name)
        if (member_name_list.length == 3) {
          // 요약이므로 3명까지만 이름 보여주기 
          break
        }
      }
      let isJocker = Object.keys(team_dict)[0] == "0"

      summarySplitTeam["splitTeamIndex"] = Number(team_split_index)
      summarySplitTeam["numberOfTeam"] = Object.keys(team_dict).length
      summarySplitTeam["memberNameList"] = member_name_list
      if (isJocker) {
        for (var i in team_dict[0]) {
          let jockerName = team_dict[0][i].name
          summarySplitTeam["jockerName"] = jockerName
        }
      } else {
        summarySplitTeam["jockerName"] = "-"
      }

      state.summarySplitTeamList.push(summarySplitTeam)
    }
  },
  SET_SELECTED_SPLIT_TEAM(state, payload) {
    state.selectedSplitedTeam = payload
  },
  PARSE_SELECTED_SPLIT_TEAM(state, {
    splitTeam,
    selected_index
  }) {
    state.selectedSplitedTeam = {}

    let selected_team_member_dict = splitTeam[selected_index]

    for (var member_id in selected_team_member_dict) {
      let member = selected_team_member_dict[member_id]
      member["position"] = null

      let team_number = member["team_number"]
      if (!state.selectedSplitedTeam[team_number]) {
        state.selectedSplitedTeam[team_number] = {
          "teamNumber": team_number,
          "members": []
        };
      }

      state.selectedSplitedTeam[team_number]["members"].push(member)
    }
  },
  SET_HOME_MEMBERS(state, homeMembers) {
    state.homeMembers = homeMembers
    state.homeTeam = {
      members: []
    }
    for (var i in homeMembers) {
      let member = homeMembers[i]
      state.homeTeam.members.push({
        member_id: member.member_id,
        name: member.name,
        position: member.position
      })
    }
  },
  SET_AWAY_MEMBERS(state, awayMembers) {
    state.awayMembers = awayMembers
    state.awayTeam = {
      members: []
    }
    for (var i in awayMembers) {
      let member = awayMembers[i]
      state.awayTeam.members.push({
        member_id: member.member_id,
        name: member.name,
        position: member.position
      })
    }
  },
};

const actions = {
  setSplitTeamList(context) {
    let splitTeam = context.rootState.squad.splitTeam
    context.commit("SET_SPLIT_TEAM_LIST", splitTeam)
  },
  setSummarySplitTeamList(context) {
    let splitTeam = context.rootState.squad.splitTeam
    context.commit("SET_SUMMARY_SPLIT_TEAM_LIST", splitTeam)


  },
  setSelectedSplitedTeam(context, selected_index) {
    let splitTeam = context.rootState.squad.splitTeam
    let payload = {
      splitTeam: splitTeam,
      selected_index: selected_index,
    }

    context.commit("PARSE_SELECTED_SPLIT_TEAM", payload)
  },
  async checkGameAlreadyExist(context, form) {
    try {
      const response = await searchWithScheduleIdAndQuarter(form);
      if (response.data) {
        return response.data[0]
      } else {
        return false
      }
    } catch (e) {
      console.log(e);
    }
  },
  async createSquad(context, form) {
    try {
      const response = await createSquad(form);
      if (response.data) {
        return response.data.insertId
      } else {
        return false
      }
    } catch (e) {
      console.log(e);
    }
  },
  async createMultipleMemberSquad(context, {
    squad_id,
    memberData
  }) {
    try {

      let memberSquadformArray = []
      for (let i in memberData.members) {
        let member = memberData.members[i]
        memberSquadformArray.push([squad_id, member.member_id, member.position])
      }
      const response = await createMultipleMemberSquad(memberSquadformArray);
      return true
    } catch (e) {
      console.log(e);
    }
  },
  async createGame(context, gameForm) {
    try {
      const response = await createGame(gameForm);
      return true
    } catch (e) {
      console.log(e);
    }
  },
  async updateGame(context, gameUpdateForm) {
    try {
      const response = await updateGame(gameUpdateForm);
      return true
    } catch (e) {
      console.log(e);
    }
  },
  async deleteMemberSquad(context, deleteMemberSquadForm) {
    try {
      const response = await deleteMemberSquad(deleteMemberSquadForm);
      return true
    } catch (e) {
      console.log(e);
    }
  },

  async getHomeAwayMember({
    commit
  }, scheduleAndQuarter) {
    try {
      const gameInfo = await searchWithScheduleIdAndQuarter(scheduleAndQuarter);

      let membersDict = {
        "homeMembers": [],
        "awayMembers": []
      }

      if (gameInfo.data.length != 0) {
        const homeMembers = await getinfoWithSquadId(gameInfo.data[0].home_squad_id)
        commit("SET_HOME_MEMBERS", homeMembers.data)
        membersDict["homeMembers"] = homeMembers.data
        if (gameInfo.data[0].away_squad_id) {
          const awayMembers = await getinfoWithSquadId(gameInfo.data[0].away_squad_id)
          commit("SET_AWAY_MEMBERS", awayMembers.data)
          membersDict["awayMembers"] = awayMembers.data
        } else {
          commit("SET_AWAY_MEMBERS", [])
        }
      } else {
        commit("SET_HOME_MEMBERS", [])
        commit("SET_AWAY_MEMBERS", [])
      }
      return membersDict
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