import router from "../../router";
import { login, join} from "../../api/auth.js";
import { saveToken, deleteToken, getTokenPayload } from "../../common/token.js";
import {
  saveUserInfo,
  getUserInfo,
  deleteUserInfo
} from "../../common/user.js";

const state = {
  user: {},
  // token: null
};

const getters = {
  user(state) {
    if (state.user) {
      return state.user;
    } else {
      return null;
    }
  }
};

const mutations = {
  LOGIN(state, userInfo) {
    state.user = userInfo;
  }
};

const actions = {
  async loginProcess({ commit }, formData) {
    try {
      const result = await login(formData);
      console.log("0. result", result);
      if(result.response) {
        // err 일때 
        return result.response;
      }else {
        console.log("1. ", result.data);
        commit("LOGIN", result.data);
        return result.data;
      }
     
    } catch (error) {
      console.log("err!!!!!!!!", error);
      return error;
    }
  },
  async join({commit}, data) {
    console.log("commit", commit);
    console.log("formData", data);
    try {
      const result = await join(data);
      console.log("join res: ", result);
      return result;
    }catch (error) {
      console.error(error);
      return error;
    }

  }

};

export default {
  state,
  getters,
  mutations,
  actions
};