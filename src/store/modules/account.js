import router from "../../router";
import { login } from "../../api/auth.js";
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
      if(result.response) {
        // err 일때 
        return result.response;
      }else {
        // 정상 동작할 때
        if(result.data.token) {
          const { idfAdmin, email, name, authority, exp } = getTokenPayload(
            result.Authorization
          );
          let user = {};

          user = { idfAdmin, email, name, authority, exp, image: null };

          // 쿠키에 토큰 저장
          saveToken(result.data.Authorization);
          // LocalStorage 에 User 정보 저장
          saveUserInfo(user);
        }
        console.log("????????", response.data);
        commit("LOGIN", response.data);
        return result.data;
      }
     
    } catch (error) {
      console.log("err!!!!!!!!", error);
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