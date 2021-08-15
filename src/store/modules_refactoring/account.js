export const state = () => ({
  info: null,
  userInfo: {}
});

export const getters = {
  info(state) {
    return state.info;
  },
  userInfo(state) {
    if (state.userInfo) {
      return state.userInfo;
    } else {
      return null;
    }
  }
};

const mutations = {
  SET_INFO(state, userInfo) {
    state.info = {
      ...state.info,
      ...userInfo
    };
  },
  SET_USER_INFO(state, userInfo) {
    state.info = {
      ...state.userInfo,
      ...userInfo
    };
  },
  LOGOUT(state) {
    state.userInfo = null;
  }
};

const actions = {
  setInfoByAccount: {
    root: true,
    handler({ commit, dispatch }, userInfo) {
      commit("SET_USER_INFO", userInfo);
      // TODO: 팀이 생길 때 추가하기
      // if (userInfo && userInfo.idfAccount) {
      //   dispatch("setTeamInfo", userInfo.idfAccount);
      // }
    }
  },
  async logout({ commit }) {
    commit("LOGOUT");
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
