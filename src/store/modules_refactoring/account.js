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
  },
  async duplicateUserId({ dispatch, rootGetters }, userId) {
    const apiClient = rootGetters["global/apiClient"];

    const { success, response, error } = await apiClient.auth.duplicateUserId(userId);
    if (success) {
      const { data } = response;
      return data.length;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async join({ dispatch, rootGetters }, data) {
    const apiClient = rootGetters["global/apiClient"];
    const { success, error } = await apiClient.auth.join(data);
    if (success) {
      dispatch("apiSuccessHandler", { message: "축하합니다 회원가입이 완료되었습니다." }, { root: true });
      return true;
    } else {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
