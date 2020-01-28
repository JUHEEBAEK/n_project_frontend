import { set } from "../../utils/index";
import * as constants from "../constants";
const state = {
  // navigation 의 상태 (들어가 있는지 나와있는지)
  drawer: false,
  setting: false,
};

const getters = {};

const mutations = {
  [constants.setDrawer]: set("drawer"),
  [constants.setSetting]: set("setting"),
};

const actions = {
};

export default {
  state,
  getters,
  mutations,
  actions
};
