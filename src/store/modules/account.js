import { login } from "../../api/auth.js" 

const state = {
  user: {}
};

const getters = {
  
};

const mutations = {
  LOGIN(state, userInfo) {
    state.user = userInfo;
  }
};

const actions = {
  async loginProcess({ commit }, formData) {
    console.log("commit", commit);
    console.log("uesrInfo", formData);
    let result = await login(formData);
    commit("LOGIN", formData);
    console.log("res:::::::", result);
    if (result) {
      return true
    } else {
      return false
    }
  }

};

export default {
  state,
  getters,
  mutations,
  actions
};