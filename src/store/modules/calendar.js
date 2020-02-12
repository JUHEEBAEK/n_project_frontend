import { set } from "../../utils/index";
import * as constants from "../constants";
const state = {
  // navigation 의 상태 (들어가 있는지 나와있는지)
  newEventBox: false,
  fullEventDialog: false,
};

const mutations = {
  [constants.setNewEventModal]: set("newEventBox"),
  [constants.setFullEventModal]: set("fullEventDialog")
};

const actions = {};

export default {
  state,
  mutations,
  actions
};
