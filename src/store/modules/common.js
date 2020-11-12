import { set } from "../../utils/index";
import * as constants from "../constants";
const state = {
  // navigation 의 상태 (들어가 있는지 나와있는지)
  alert: false,
  colorIndex: ["#000","#ccda11", "#da8c11", "#118eda", "#da1175", "#11da76", "#8f11da"],
  // 1. dialog : true ( Dialog 이 열린 상태 )
 // 2. dialog : null or false ( Dialog 이 닫힌 상태 )
 // dialog 종류 : Confirm.vue 인지 혹은 Manager.vue 인지
  dialog: null,
  drawer: false,
  /* 1. fullScreen : true ( AppBar 와 nav 가 없는 상태 )
  2. fullScreen : null or false */
  fullScreen: null,
  homeTitle: "",
  loading: false,
  setting: false,
  type: null,
  snackBar: false,
  snackBarPurpose: null,
  // 스낵바에 들어가는 내용
  snackBarMessage: null,

  searchResult: [],
};

const getters = {
  snackBar(state) {
    if (state.snackBar) {
      return state.snackBar;
    } else {
      return null;
    }
  },
  loading(state) {
    if (state.loading) {
      return state.loading;
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
  },
  fullScreen(state) {
    if (state.fullScreen) {
      return state.fullScreen;
    } else {
      return null;
    }
  }
};

const mutations = {
  [constants.setDrawer]: set("drawer"),
  [constants.setSetting]: set("setting"),
  [constants.setSnackBar]: set("snackBar"),
  [constants.setPurpose]: set("snackBarPurpose"),
  [constants.setMessage]: set("snackBarMessage"),
  [constants.setSearchResult]: set("searchResult"),
  [constants.setAlert]: set("alert"),
  SET_DIALOG(state, value) {
    state.dialog = value;
  },
  SET_FULL_SCREEN(state, value) {
    state.fullScreen = value;
  },
  SET_HOME_TITLE(state, value) {
    state.homeTitle = value;
  },
  SET_LOADING_BAR(state, value) {
    state.loading = value;
  },
  SET_TYPE(state, value) {
    state.type = value;
  },
  // dialog 의 2가지 state 를 한 번에 변경하기 위한 함수
  // 여기서의 value 는 object  ex) { dialog:true, type:"manager" }
  SET_DIALOG_AND_TYPE(state, value) {
    state.type = value.type;
    state.dialog = value.dialog;
  }
};

const actions = {
  async setDialog({ commit }, value) {
    commit("SET_DIALOG", value);
  },
  // dialog 의 2가지 state 를 한 번에 변경하기 위한 함수
  async setDialogAndType({ commit }, value) {
    commit("SET_DIALOG_AND_TYPE", value);
  },
  async setFullScreen({ commit }, value) {
    commit("SET_FULL_SCREEN", value);
  },
  async setLoading({ commit }, value) {
    commit("SET_LOADING_BAR", value);
  },
  async setSnackBar({
    commit
  }, value) {
    console.log("commit", commit);
    console.log("value", value);
    commit("SET_SNACK_BAR", value);
  },
  async setType({ commit }, value) {
    commit("SET_TYPE", value);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};