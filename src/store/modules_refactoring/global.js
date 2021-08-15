import jwt_decode from "jwt-decode";

import ApiClient from "@/api/refactoring/api-class";
import router, { resetRoutes } from "@/router/index_refactoring";
import routes from "@/router/routes.json";
import { generateRoutes, filterRoutesByAuth } from "@/router/path";

import snaceBarPurpose from "@/constants/snackbar";

const baseURL = process.env.VUE_APP_API_ENDPOINT;
const timeOut = 6000;

const getToken = () => {
  return (localStorage.getItem("access_token") && JSON.parse(localStorage.getItem("access_token"))) || null;
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
    localStorage.setItem("access_token", JSON.stringify(token));
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
  accessToken: null,
  snackBar: {
    show: false,
    purpose: "",
    message: ""
  },
  currentMenu: "",
  userRoutes: [],
  breadcrumbs: [],
  leftMenus: [],
  footerMenus: []
});

export const getters = {
  isAuthorized({ accessToken }) {
    return !!accessToken; // 로그인된 유저인지 판단하는 용도로 사용할 것
  },
  snackBar({ snackBar }) {
    return snackBar;
  },
  apiClient({ apiClient }) {
    return apiClient;
  },
  currentMenu({ currentMenu }) {
    // return breadcrumbs[0].name
    return currentMenu;
  },
  userRoutes({ userRoutes }) {
    return userRoutes;
  },
  breadcrumbs({ breadcrumbs }) {
    return breadcrumbs;
  },
  leftMenus({ leftMenus }) {
    return leftMenus;
  },
  settingSubMenus({ settingSubMenus }) {
    return settingSubMenus;
  },
  footerMenus({ footerMenus }) {
    return footerMenus;
  }
};

const mutations = {
  SET_ACCESS_TOKEN(state, value) {
    state.accessToken = value;
  },
  SET_SNACK_BAR(state, payload) {
    state.snackBar = {
      ...state.snackBar,
      ...payload
    };
  },
  SET_USER_ROUTES(state, value) {
    state.userRoutes = value;
  },
  SET_BREAD_CRUMBS(state, value) {
    state.breadcrumbs = value;
  },
  SET_CURRENT_MENU(state, value) {
    state.currentMenu = value; // FIXME breadcrumbs 첫번째 값이 항상 메뉴 값이라면 제거 가능
  },
  SET_LEFT_MENUS(state, value) {
    state.leftMenus = value;
  },
  SET_FOOTER_MENUS(state, value) {
    state.footerMenus = value;
  }
};

const actions = {
  async init({ getters, dispatch }) {
    const token = getToken();
    getters.apiClient.setDispatch(dispatch);

    if (token) {
      // TODO: verifyToken 이 토큰이 진짜 토큰인지 확인하는 API 만들기
      // const { success } = await dispatch("verifyToken", token);
      // success ? dispatch("setUser", token) : dispatch("signOut");
      dispatch("setUser", token);
    }
  },
  async setUser({ dispatch, rootGetters }, token) {
    const apiClient = rootGetters["global/apiClient"];
    apiClient.updateToken(token);
    await dispatch("updateToken", token);
    //TODO: 토큰으로 User 정보 가져오는 것 만드기
    const { success, userInfo } = await dispatch("getUser", token);

    const routerCurrentName = router.history.current.name;
    const toRotuer = routerCurrentName === "login" ? "home" : routerCurrentName;

    if (success) {
      await dispatch("setInfoByAccount", userInfo.payload, { root: true });
      await dispatch("setUserMenus", userInfo.payload.role);
      await dispatch("updateRouter", toRotuer, { root: true });
    } else {
      await dispatch("signOut");
    }
  },
  async getUser({ getters }, token) {
    // const apiClient = getters.apiClient;
    const user = getTokenPayload(token);
    // const { success, response } = await apiClient.account.getAccountInfo(
    //   idfAccount
    // );

    // return !success ? { success } : { success, userInfo: response.data };
    return { success: true, userInfo: user };
  },
  setUserMenus({ commit }, userInfoType) {
    const accessRoutes = filterRoutesByAuth(routes.routes, userInfoType);
    const recordRoutes = generateRoutes(accessRoutes);
    const leftMenus = accessRoutes.filter(route => routes.leftMenus.includes(route.name));
    const footerMenus = routes.footerMenus.map(footer => {
      return {
        name: footer,
        ...(accessRoutes.find(item => item.name === footer) || {})
      };
    });

    resetRoutes();
    recordRoutes.forEach(route => router.addRoute(route));

    commit("SET_USER_ROUTES", accessRoutes); // user all routes
    commit("SET_LEFT_MENUS", leftMenus); // user left menus
    commit("SET_FOOTER_MENUS", footerMenus); // user footer menus
  },
  async signIn({ getters, dispatch }, payload) {
    // TODO error 코드 기준으로 메세지 가져올 수 있도록 벼로 에러 코드별 const 작성 필요
    const { success, response, error } = await getters.apiClient.auth.signIn(payload);
    const errorMessage = {
      401: "Fail to sign in",
      500: "Server Error",
      default: "Not Valid Value"
    };

    if (success) {
      const { Authorization } = response.data;
      dispatch("setUser", Authorization);
    } else {
      //TODO: errCode 어떻게 할지 생각해보기 현재는 메세지를 넘기는걸로 함.
      const { status, message } = error;
      dispatch("apiErrorHandler", { message: message || errorMessage.default, status: status }, { root: true });
    }
  },
  signOut({ commit, dispatch }) {
    commit("SET_ACCESS_TOKEN", null);
    dispatch("setInfoByAccount", null, { root: true });
    dispatch("updateRouter", "login", { root: true });
    deleteToken();
  },
  // token actions
  verifyToken({ getters }, token) {
    return getters.apiClient.auth.verify(token);
  },
  updateToken({ getters, commit }, token) {
    getters.apiClient.updateToken(token);
    commit("SET_ACCESS_TOKEN", token);
    saveToken(token);
  },
  updateSnackBar: {
    root: true,
    handler({ commit }, payload) {
      commit("SET_SNACK_BAR", payload);
    }
  },
  updateRouter: {
    root: true,
    handler({ rootState }, routerItem) {
      const payload = typeof routerItem === "string" ? { name: routerItem } : routerItem;
      // console.log(routerItem, rootState.route.name, payload);
      if (routerItem !== rootState.route.name) router.push(payload);
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
    async handler({ dispatch }, { message, status }) {
      const failExpireSession = "Session is expired. Again login please.";
      const failBasic = "Error happened!";

      const snackbarPayload = {
        show: true,
        purpose: snaceBarPurpose.snackBarFail,
        message: message || (status === 401 ? failExpireSession : failBasic)
      };

      dispatch("updateSnackBar", snackbarPayload, { root: true });
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
