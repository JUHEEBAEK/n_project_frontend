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
    console.log(userInfo);
    state.userInfo = userInfo;
  }
};

const actions = {

};


export default {
  state,
  getters,
  mutations,
  actions
};