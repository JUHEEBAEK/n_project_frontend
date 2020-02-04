import { set } from "../../utils/index";
import * as constants from "../constants";
const state = {
  // navigation 의 상태 (들어가 있는지 나와있는지)
  addMenu: false
};

const mutations = {
  [constants.setAddCalendrModal]: set("addMenu")
};

const actions = {};

export default {
  state,
  mutations,
  actions
};
