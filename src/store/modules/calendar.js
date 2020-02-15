import { set } from "../../utils/index";
import { addEvent } from "../../api/schedule.js";

import * as constants from "../constants";
const state = {
  // navigation 의 상태 (들어가 있는지 나와있는지)
  newEventBox: false,
  fullEventDialog: false,
  scheduleList: [],
};

const mutations = {
  [constants.setNewEventModal]: set("newEventBox"),
  [constants.setFullEventModal]: set("fullEventDialog")
};

const actions = {
  async add_event(context, form) {
    try {
      console.log(context);
      console.log(form);
      const response = await addEvent(form);
      return response.data;
    }catch(e) {
      console.log(e);
    }
  }

};

export default {
  state,
  mutations,
  actions
};
