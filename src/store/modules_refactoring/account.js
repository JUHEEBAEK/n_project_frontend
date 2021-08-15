import accountConst from "@/constants/account.js";

export const state = () => ({
  userInfo: {}
});

export const getters = {
  userInfo(state) {
    if (state.userInfo) {
      return state.userInfo;
    } else {
      return null;
    }
  },
  accountType({ userInfo }) {
    const type = (userInfo && userInfo.role) || "";
    if (type) {
      return accountConst.role;
    }
    return "";
  }
};

const mutations = {
  SET_USER_INFO(state, userInfo) {
    state.userInfo = {
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
    handler({ commit }, userInfo) {
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
