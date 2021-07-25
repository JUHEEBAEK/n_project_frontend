import jwt_decode from "jwt-decode";

import ApiClient from "@/api/api-class";
import router from "@/router";
import { routesName } from "@/router/routes.js";
import snaceBarPurpose from "@/constants/snackbar";
import constNav from "@/constants/nav.json";

const baseURL = process.env.VUE_APP_API_ENDPOINT;
const timeOut = 6000;

const getToken = () => {
  return (
    (localStorage.getItem("access_token") &&
      JSON.parse(localStorage.getItem("access_token"))) ||
    null
  );
};

const deleteToken = () => {
  localStorage.removeItem("access_token");
};

const getTokenPayload = token => {
  try {
    const payload = jwt_decode(token);
    return payload;
  } catch (err) {
    console.error(err);
    return false;
  }
};

const saveToken = token => {
  try {
    localStorage.setItem("user_token", JSON.stringify(token));
  } catch (err) {
    return err;
  }
};

export const state = () => ({
  apiClient: new ApiClient({
    auth: {
      baseURL: baseURL,
      timeout: timeOut
    }
  }),
  appLoad: true,
  login: false,
  snackBar: {
    show: false,
    purpose: "",
    message: ""
  },
  currentMenu: "",
  leftMenus: constNav.navigationItems,
  leftSubMenus: [],
  footerMenus: constNav.footerItems
});

export const getters = {
  appLoad({ appLoad }) {
    return appLoad;
  },
  login({ login }) {
    return login;
  },
  snackBar({ snackBar }) {
    return snackBar;
  },
  currentMenu({ currentMenu }) {
    return currentMenu;
  },
  leftMenus({ leftMenus }) {
    return leftMenus;
  },
  footerMenus({ footerMenus }) {
    return footerMenus;
  }
};

const mutations = {
  SET_APP_LOAD(state, value) {
    state.appLoad = value;
  },
  SET_LOGIN(state, value) {
    state.login = value;
  },
  SET_SNACK_BAR(state, payload) {
    state.snackBar = {
      ...state.snackBar,
      ...payload
    };
  },
  SET_CURRENT_MENU(state, value) {
    state.currentMenu = value;
  },
  SET_LEFT_MENUS(state, value) {
    state.leftMenus = value;
  }
};

const actions = {
  async beforeStartApplication({ commit, dispatch, rootGetters }) {
    console.log(rootGetters);
    // const apiClient = rootGetters["global/apiClient"];

    // const token = getToken();
    // if (token) {
    //   const { success: successTokenVerify } = await apiClient.auth.verify(
    //     token
    //   );
    //   if (successTokenVerify) {
    //     await dispatch("setUser", token);
    //     dispatch("updateMenu", routesName.home, { root: true });
    //   }
    // }

    commit("SET_APP_LOAD", false);
  },
  async setUser({ dispatch, commit, rootGetters }, token) {
    // const apiClient = rootGetters["global/apiClient"];
    // apiClient.updateToken(token);
    // saveToken(token);
    // const { idfAccount } = getTokenPayload(token);
    // const {
    //   success: successGetAccount,
    //   response
    // } = await apiClient.account.getAccountInfo(idfAccount);
    // if (successGetAccount) {
    //   const userInfo = response.data;
    //   dispatch("setInfoByAccount", userInfo, { root: true });
    //   // fiter menus
    //   // dispatch("setSettingLeftSubMenus");
    //   commit("SET_LOGIN", true);
    //   return true;
    // } else {
    //   return false;
    // }
  },
  async signOut({ commit, dispatch }) {
    commit("SET_LOGIN", false);
    dispatch("setInfoByAccount", null, { root: true });
    deleteToken();
  },
  async signIn({ dispatch, rootGetters }, payload) {
    // const apiClient = rootGetters["global/apiClient"];
    // const { success, response, error } = await apiClient.auth.signIn(payload);
    // if (success) {
    //   const { Authorization } = response.data;
    //   const resultUserSuccess = await dispatch("setUser", Authorization);
    //   if (resultUserSuccess) {
    //     await router.push({ name: routesName.home }); // (TODO) 다른 라우트 가능
    //     return {
    //       success: true
    //     };
    //   }
    // } else {
    //   const { status } = error;
    //   let message = "";
    //   switch (status) {
    //     case 401:
    //       message = "Fail to sign in";
    //       break;
    //     case 500:
    //       message = "Server Error";
    //       break;
    //     default:
    //       message = "Not Valid Value";
    //   }
    //   dispatch("apiErrorHandler", { message }, { root: true });
    //   return {
    //     success: false
    //   };
    // }
  },
  updateSnackBar: {
    root: true,
    handler({ commit }, payload) {
      commit("SET_SNACK_BAR", payload);
    }
  },
  updateMenu: {
    root: true,
    async handler({ commit, rootState }, toMenu) {
      const { route } = rootState;
      const { name: currentMenu } = route;
      if (currentMenu !== toMenu) {
        const reuslt = await router.push({ name: toMenu });
        if (reuslt && reuslt.name === toMenu) {
          commit("SET_CURRENT_MENU", toMenu);
        }
      }
    }
  },
  apiSuccessHandler: {
    root: true,
    async handler({ dispatch }, { message }) {
      if (message) {
        dispatch(
          "updateSnackBar",
          {
            show: true,
            purpose: snaceBarPurpose.snackBarSuccess,
            message: message
          },
          { root: true }
        );
      }
    }
  },
  apiErrorHandler: {
    root: true,
    async handler({ dispatch, getters }, { message, error }) {
      if (message) {
        dispatch(
          "updateSnackBar",
          {
            show: true,
            purpose: snaceBarPurpose.snackBarFail,
            message: message
          },
          { root: true }
        );
      } else {
        const { status } = error;
        const message = status === 401 ? "session expire" : "server error";
        dispatch(
          "updateSnackBar",
          {
            show: true,
            purpose: snaceBarPurpose.snackBarFail,
            message: message
          },
          { root: true }
        );
      }
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
