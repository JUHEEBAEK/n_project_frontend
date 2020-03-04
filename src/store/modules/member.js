import * as constants from "../constants";
import {
  createMember,
  getMember,
  deleteMember,
  updateMember,
  detailsMember
} from "../../api/member.js";
import {
  set
} from "../../utils/index";

const state = {
  memberList: [],
  searchResult: [],
  profile: {},
  memberId: "",
  res: ""
};

const getters = {};
const mutations = {
  [constants.SELECT_MEMBER](state, memberList) {
    state.memberList = memberList;
    state.searchResult = memberList;
  },
  [constants.DELETE_MEMBER](state, memberId) {},
  [constants.DETAILS_MEMBER](state, memberProfile) {
    state.profile = memberProfile;
  },
  [constants.UPDATE_MEMBER](state, memberProfile) {
    state.res = memberProfile;
  },
  [constants.setSearchResult]: set("searchResult")
};

const actions = {
  async add_member(context, form) {
    try {
      const response = await createMember(form);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },
  async select_member({
    commit
  }) {
    try {
      const response = await getMember();
      commit("SELECT_MEMBER", response.data);
      return response;
    } catch (e) {
      console.log(e);
    }
  },

  async delete_member({
    commit
  }, payload) {
    try {
      const response = await deleteMember(payload);
      commit("DELETE_MEMBER", response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  async details_member({
    commit
  }, payload) {
    try {
      const response = await detailsMember(payload);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  },

  async update_member({
    commit
  }, payload) {
    try {
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