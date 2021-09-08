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
  },
  async getAllMemberList({ commit, dispatch, rootGetters }) {
    const apiClient = rootGetters["global/apiClient"];

    const { success, response, error } = await apiClient.member.getAllMember();
    if (success) {
      commit("SET_MEMBER_LIST", response.data);
    } else if (error) {
      dispatch("apiErrorHandler", { error }, { root: true });
    }
  },
  async createMember({ dispatch, rootGetters }, formData) {
    const apiClient = rootGetters["global/apiClient"];

    const { success, error } = await apiClient.member.createMember(formData);
    if (success) {
      dispatch("apiSuccessHandler", { message: "회원이 추가 되었습니다." }, { root: true });
      dispatch("getAllMemberList");
      return true;
    } else if (error) {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async updateMember({ dispatch, rootGetters }, formData) {
    const apiClient = rootGetters["global/apiClient"];

    const { success, error } = await apiClient.member.updateMember(formData);
    if (success) {
      dispatch("apiSuccessHandler", { message: "회원정보가 수정 되었습니다." }, { root: true });
      dispatch("getAllMemberList");
      return true;
    } else if (error) {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
    }
  },
  async removeMember({ dispatch, rootGetters }, formData) {
    const apiClient = rootGetters["global/apiClient"];

    const { success, response, error } = await apiClient.member.deleteMember(formData);
    console.log(response);
    if (success) {
      dispatch("apiSuccessHandler", { message: "회원이 삭제 되었습니다." }, { root: true });
      dispatch("getAllMemberList");
      return true;
    } else if (error) {
      dispatch("apiErrorHandler", { error }, { root: true });
      return false;
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
