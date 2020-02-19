import {
  set
} from "../../utils/index";
import {
  addEvent,
  selectEvent
} from "../../api/schedule.js";

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
    let event_dict = {}; // dict로 넣어주는게 편하다
    let event_list = [];
    let id_list = [];
    for (var index in payload) {
      let item = payload[index];
      if (item["id"] in event_dict) {
        // id가 있는 경우 member만 push 해준다
        let existing_item = event_dict[item["id"]];
        existing_item["member_id_list"].push(item["member_id"]);
        existing_item["memeber_name_list"].push(item["member_name"]);
        existing_item["attendCount"]++;
        event_dict[item["id"]] = existing_item;
      } else {
        // id가 없는 경우 전부 추가 (member id와 name는 list형태로 집어넣는다)
        item["member_id_list"] = [item["member_id"]];
        item["memeber_name_list"] = [item["member_name"]];
        // name이 없는 경우, 임의로 만들어서 넣어준다
        if (item["name"] == null) {
          // item["name"] = [경기] 잠실 n 구장
          item["name"] = `[${item["type"]}] ${item["stadium_name"]}`;
        }
        //attendCount 필요함
        item["attendCount"] = 1;
        // place에 stadium_name
        item["place"] = item["stadium_name"];
        // start랑 end가 없고 start_time end_time이 있음
        let date = moment(item["date"]);
        if (item["start_time"] == null) {
          item["start"] = date.format("YYYY-MM-DD HH:mm");
          item["end"] = date.format("YYYY-MM-DD HH:mm");
        } else {
          item["start"] = item["start_time"];
          item["end"] = item["end_time"];
        }
        item["date"] = moment(item["date"]).format("YYYY-MM-DD");

        item["color"] = "grape"; // 적당한 색으로 넣어준다
        //open은 default false로 설정해준다
        item["open"] = false;
        //넣어주기
        event_dict[item["id"]] = item;
      }
    }
    console.log("mutation SET_EVENT_LIST");
    for (var key in event_dict) {
      event_list.push(event_dict[key]);
    }
    console.log(event_list);
    state.eventList = event_list;
  }
};

const actions = {
  async add_event(context, form) {
    try {
      console.log(context);
      console.log(form);
      const response = await addEvent(form);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async select_event(context) {
    try {
      console.log("Action select_event");
      const response = await selectEvent();
      console.log("Action select_event", response);
      context.commit("SET_EVENT_LIST", response.data);
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