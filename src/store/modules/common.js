import { set } from "../../utils/index";
import * as constants from "../constants";
const state = {
  // navigation 의 상태 (들어가 있는지 나와있는지)
  drawer: false,
  setting: false,
  alert: false,
};

const getters = {};

const mutations = {
  [constants.setDrawer]: set("drawer"),
  [constants.setSetting]: set("setting"),
  [constants.setAlert]: set("alert"),
};

const actions = {};

export default {
  state,
  getters,
  mutations,
  actions
};
