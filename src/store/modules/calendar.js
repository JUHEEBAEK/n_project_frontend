import {
  set
} from "../../utils/index";
import {
  createSchedule,
  getScheduleList,
  deleteSchedule,
  updateSchedule,
  getInfo
} from "../../api/schedule.js";
import {
  attendList
} from "../../api/attend.js";

import moment from "moment";
import * as constants from "../constants";
const state = {
  newScheduleBox: false,
  fullScheduleDialog: false,
  scheduleList: [],
  scheduleInfo: {},
  attendMember: [],
  scheduleIndex: null,
};

const mutations = {
  [constants.setNewScheduleModal]: set("newScheduleBox"),
  [constants.setFullScheduleModal]: set("fullScheduleDialog"),
  SET_SCHEDULE_LIST(state, payload) {
    let schedule_list = [];
    for (var index in payload) {
      let item = payload[index];

      // id가 없는 경우 전부 추가 (member id와 name는 list형태로 집어넣는다)
      item["member_id_list"] = [];
      item["memeber_name_list"] = [];

      // name이 없는 경우, 임의로 만들어서 넣어준다
      if (item["name"] == null) {
        // ex) item["name"] = [경기] 잠실 n 구장
        item["name"] = `[${item["type"]}] ${item["stadium_name"]}`;
      }
      //attendCount 필요함
      item["attendCount"] = 0;

      //open은 default false로 설정해준다
      item["open"] = false;

      let type_list = {
        'T': 0,
        'P': 1,
        'L': 2,
        'M': 3,
        'C': 4
      }
      item["type_index"] = type_list[item["type"]]

      //넣어주기
      schedule_list.push(item);
    }
    state.scheduleList = schedule_list;
  },
  ADD_MEMBER_LIST(state, memberList) {
    if (memberList.length == 0) {
      return false;
    }
    let memeber_name_list = [];
    let member_id_list = [];
    let member_count = memberList.length;
    for (let i in memberList) {
      member_id_list.push(memberList[i]["member_id"]);
      memeber_name_list.push(memberList[i]["name"]);
    }

    let schedule_id = memberList[0]["schedule_id"];
    // scheduleList에서 id가 일치하는 list를 찾은 다음에 가져오기
    let index = -1;
    for (let i in state.scheduleList) {
      let id_check = state.scheduleList[i]["id"];
      if (id_check == schedule_id) {
        index = i;
        break;
      }
    }
    if (index == -1) {
      console.log("ADD_MEMBER_LIST, can not find Schedule");
      return;
    }
    let item = state.scheduleList[index];
    item["attendCount"] = member_count;
    item["member_id_list"] = member_id_list;
    item["memeber_name_list"] = memeber_name_list;

    state.scheduleList[index] = item;
  },
  [constants.get_schedule_info](state, scheduleInfo) {
    state.scheduleInfo = scheduleInfo;
  },
  SET_ATTEND_MEMBER(state, attendMember){
    console.log("SET_ATTEND_MEMBER", attendMember)
    state.attendMember = attendMember;
  },
  CHANGED_TEAM_OF_ATTEND_MEMEBER(state, team_division){
    // colorIndex를 common에서 가져오는게 좋다
    let colorIndex = ["#000","#ccda11", "#da8c11", "#118eda", "#da1175", "#11da76", "#8f11da"]
    let search_index = {}
    for (let i in state.attendMember){
      search_index[state.attendMember[i].id] = Number(i)
    }
    for (let i in team_division.teams){
      let new_team_number = Number(i) + 1
      for (let j in team_division.teams[i]){
        let member_id = team_division.teams[i][j]
        let member_index = search_index[member_id]
        console.log(member_id, member_index, new_team_number)
        state.attendMember[member_index].teamNumber = new_team_number
        state.attendMember[member_index].color = colorIndex[new_team_number]
      }
    }
    if (team_division.jocker_player){
      let new_team_number = 0
      let member_id = team_division.jocker_player
      let member_index = search_index[member_id]
      state.attendMember[member_index].teamNumber = new_team_number
      state.attendMember[member_index].color = colorIndex[new_team_number]
    }
  },
  INITIALIZE_ATTEND_MEMBER(state){
    for (let i in state.attendMember){
      state.attendMember[i].color = "grey"
      state.attendMember[i].teamNumber = null
    }
  },
  SET_SCHEDULE_INDEX(state, index){
    state.scheduleIndex = index
  },
  FILL_TEAM_NUMBER(state){
     // null 인 teamnumber을 -1로 바꿈
     // 더 좋은 함수명이 있으면 고쳐야됨 
    for (let i in state.attendMember){
      let member = state.attendMember[i]
      if (member["teamNumber"] == null){
        state.attendMember[i] = -1
      }
    }
  },
  
};

const actions = {
  async add_schedule(context, form) {
    try {
      const response = await createSchedule(form);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async select_schedule(context) {
    try {
      const response = await getScheduleList();
      context.commit("SET_SCHEDULE_LIST", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async get_schedule_info(context, id) {
    try {
      const response = await getInfo(id);
      context.commit("GET_SCHEDULE_INFO", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async load_member(context, id) {
    const response = await attendList(id);
    context.commit("ADD_MEMBER_LIST", response.data);
  },
  async delete_schedule({
    dispatch
  }, schedule_id_form) {
    try {
      const response = await deleteSchedule(schedule_id_form);
      dispatch("select_schedule");
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async update_schedule({
    commit,
    dispatch
  }, update_form) {
    try {
      const reponse = await updateSchedule(update_form);
      dispatch("select_schedule");
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
};

export default {
  state,
  mutations,
  actions
};