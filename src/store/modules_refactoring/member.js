export const state = () => ({
  memberList: [],
  memberInfo: {}
});

export const getters = {
  memberList(state) {
    return state.memberList;
  },
  memberInfo(state) {
    return state.memberInfo;
  }
};

const mutations = {
  SET_MEMBER_LIST(state, list) {
    state.memberList = list;
  },
  SET_MEMBER_INFO(state, info) {
    state.memberInfo = info;
  }
};
const actions = {
  async getRegularMemberList({ commit, dispatch, rootGetters }) {
    const apiClient = rootGetters["global/apiClient"];

    const { success, response, error } = await apiClient.member.getReqularMember();
    if (success) {
      commit("SET_MEMBER_LIST", response.data);
    } else if (error) {
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
