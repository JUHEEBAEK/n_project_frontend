import {
  set
} from "../../utils/index";
import * as constants from "../constants";
const state = {
  // navigation 의 상태 (들어가 있는지 나와있는지)
  drawer: false,
  setting: false,
  snackBar: false,
  alert: false,
  colorIndex: ["#000","#ccda11", "#da8c11", "#118eda", "#da1175", "#11da76", "#8f11da"],
   // 1. dialog : true ( Dialog 이 열린 상태 )
  // 2. dialog : null or false ( Dialog 이 닫힌 상태 )
  dialog: null,
  // dialog 종류 : Confirm.vue 인지 혹은 Manager.vue 인지
  type: null
};

const getters = {
  snackBar(state) {
    if (state.snackBar) {
      return state.snackBar;
    } else {
      return null;
    }
  },
  dialog(state) {
    if (state.dialog) {
      return state.dialog;
    } else {
      return null;
    }
  },
  type(state) {
    if (state.type) {
      return state.type;
    } else {
      return null;
    }
  }
};

const mutations = {
  [constants.setDrawer]: set("drawer"),
  [constants.setSetting]: set("setting"),
  [constants.setSnackBar]: set("snackBar"),
  [constants.setAlert]: set("alert"),
  setDialog(state, value) {
    state.dialog = value;
  },
  setType(state, value) {
    state.type = value;
  },
  // dialog 의 2가지 state 를 한 번에 변경하기 위한 함수
  // 여기서의 value 는 object  ex) { dialog:true, type:"manager" }
  setDialogAndType(state, value) {
    state.type = value.type;
    state.dialog = value.dialog;
  }
};

const actions = {
  async set_SnackBar({
    commit
  }, value) {
    commit("SET_SNACKBAR", value);
  },
  async setDialog({ commit }, value) {
    commit("setDialog", value);
  },
  async setType({ commit }, value) {
    commit("setType", value);
  },
  // dialog 의 2가지 state 를 한 번에 변경하기 위한 함수
  async setDialogAndType({ commit }, value) {
    commit("setDialogAndType", value);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};