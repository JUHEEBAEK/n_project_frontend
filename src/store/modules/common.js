import {
  set
} from "../../utils/index";
import * as constants from "../constants";
const state = {
  // navigation 의 상태 (들어가 있는지 나와있는지)
  drawer: false,
  setting: false,
  snackBar: false,
  alert: false
};

const getters = {
  snackBar(state) {
    if (state.snackBar) {
      return state.snackBar;
    } else {
      return null;
    }
  }
};

const mutations = {
  [constants.setDrawer]: set("drawer"),
  [constants.setSetting]: set("setting"),
  [constants.setSnackBar]: set("snackBar"),
  [constants.setAlert]: set("alert")
};

const actions = {
  async set_SnackBar({
    commit
  }, value) {
    commit("SET_SNACKBAR", value);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};