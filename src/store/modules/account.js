const state = {
  userInfo: {}
};

const getters = {
  userInfo(state) {
    if (state.userInfo) {
      return state.userInfo;
    } else {
      return null;
    }
  },
};

const mutations = {
  SET_INFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  LOGOUT(state) {
    state.userInfo = null;
  },
};

const actions = {
  async setInfo({ commit }, userInfo) {
    commit("SET_INFO", userInfo);
  },
  async logout({ commit }) {
    commit("LOGOUT");
  }
};


export default {
  state,
  getters,
  mutations,
  actions
};