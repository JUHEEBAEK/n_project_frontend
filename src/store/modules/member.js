import * as constants from "../constants";
import {
  addMember,
  selectMember,
  deleteMember,
  updateMember,
  detailsMember
} from "../../api/member.js";

const state = {
  memberList: [],
  profile: {},
  res: ""
};

const getters = {};
const mutations = {
  [constants.SELECT_MEMBER](state, memberList) {
    state.memberList = memberList;
  },
  [constants.DELETE_MEMBER](state, memberId) {
    console.log(memberId);
    // let index = state.memberList.findIndex(member => member.id == memberId)
    // state.memberList.splice(index, 1);
  },
  [constants.DETAILS_MEMBER](state, memberProfile) {
    console.log("mutations");
    console.log(memberProfile);
    state.profile = memberProfile;
  },
  [constants.UPDATE_MEMBER](state, memberProfile) {
    state.profile = memberProfile;
  }
};

const actions = {
  async add_member(context, form) {
    try {
      console.log("actions Add Member", form);
      const response = await addMember(form);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async select_member({ commit }) {
    try {
      const response = await selectMember();
      commit("SELECT_MEMBER", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  async delete_member({ commit }, payload) {
    try {
      const response = await deleteMember(payload);
      commit("DELETE_MEMBER", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  async details_member({ commit }, payload) {
    try {
      const response = await detailsMember(payload);
      commit("DETAILS_MEMBER", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  async update_member({ commit }, payload) {
    try {
      console.log("update_member payload:", payload);
      const response = await updateMember(payload);
      commit("UPDATE_MEMBER", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
