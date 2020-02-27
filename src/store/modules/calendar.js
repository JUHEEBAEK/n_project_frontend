import {
  set
} from "../../utils/index";
import {
  addEvent,
  selectEvent,
  deleteEvent,
  updateEvent
} from "../../api/schedule.js";
import {
  attendanceList
} from "../../api/attend.js";

import moment from "moment";
import * as constants from "../constants";
const state = {
  // navigation 의 상태 (들어가 있는지 나와있는지)
  newEventBox: false,
  fullEventDialog: false,
  scheduleList: [],
  eventList: []
};

const mutations = {
  [constants.setNewEventModal]: set("newEventBox"),
  [constants.setFullEventModal]: set("fullEventDialog"),
  SET_EVENT_LIST(state, payload) {
    let event_list = [];
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
      let date = moment(item["date"]);
      item["date"] = moment(item["date"]).format("YYYY-MM-DD");

      item["color"] = "grape"; // 적당한 색으로 넣어준다
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
      event_list.push(item);
    }
    state.eventList = event_list;
  },
  ADD_MEMBER_LIST(state, memberList) {
    if (memberList.length == 0) {
      return false;
    }
    let memeber_name_list = [];
    let memeber_id_list = [];
    let member_count = memberList.length;
    for (let i in memberList) {
      memeber_id_list.push(memberList[i]["member_id"]);
      memeber_name_list.push(memberList[i]["name"]);
    }

    let schedule_id = memberList[0]["schedule_id"];
    // eventList에서 id가 일치하는 list를 찾은 다음에 가져오기
    let index = -1;
    for (let i in state.eventList) {
      let id_check = state.eventList[i]["id"];
      if (id_check == schedule_id) {
        index = i;
        break;
      }
    }
    if (index == -1) {
      console.log("ADD_MEMBER_LIST, can not find Schedule");
      return;
    }
    let item = state.eventList[index];
    item["attendCount"] = member_count;
    item["memeber_id_list"] = memeber_id_list;
    item["memeber_name_list"] = memeber_name_list;

    state.eventList[index] = item;
  }
};

const actions = {
  async add_event(context, form) {
    try {
      const response = await addEvent(form);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async select_event(context) {
    try {
      const response = await selectEvent();
      context.commit("SET_EVENT_LIST", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async load_member(context, id) {
    const attend_list = await attendanceList(id);
    context.commit("ADD_MEMBER_LIST", attend_list["data"]);
  },
  async delete_event({
    dispatch
  }, schedule_id_form) {
    try {
      const response = await deleteEvent(schedule_id_form);
      dispatch("select_event");
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async update_event({
    commit,
    dispatch
  }, update_form) {
    try {
      const reponse = await updateEvent(update_form);
      dispatch("select_event");
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