import store from "../store";
// import router from "../router";
// import { singIn } from "../api/auth.js";
import { getToken, getTokenPayload, saveToken, deleteToken } from "../common/token.js";
import { getUserInfo, saveUserInfo, deleteUserInfo } from "../common/user.js";
/* - 목적 : 인증되어(로그인 되어) 있는 사용자 인지 체크하는 로직  
   - 사용처 : App.vue & router/index.js */
export const isAuthorization = () => {
  try {
    // 토큰 및 사용자 정보가 localStorage 에 저장되어 있는지 체크
    if (getToken() && getUserInfo()) {
      // 저장되어 있다면, 토큰의 경우 유효한 토큰인지 체크
      if (!getTokenPayload(getToken())) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};

export const login = async (userId, password) => {
  try {
    let formData = new FormData();
    let body = {
      userId: userId,
      password: password
    };
    formData.append("userId", userId);
    formData.append("password", password);

    // const result = await singIn(body);
    /* - JWT 발급
       - LocalStorage 에 Token 지정
       - LocalStorage 에 유저 정보 저장 
       - result 는 response 의 body 값 */

    let result = "";
    if (result.response) {
      // err 일때
      return result.response;
    } else {
      let token = result.data.Authorization;
      if (token) {
        const { id, user_id, name, member_id, team_id, role, exp } = getTokenPayload(token);
        let user = { exp, id, user_id, member_id, name, team_id, role };
        saveToken(token);
        saveUserInfo(user);
        // Vuex 에 User 정보 셋업
        store.commit("account/SET_INFO", user);
        return 200;
      }
      return result.data;
    }
  } catch (error) {
    return error;
  }
};

// export const joinProcess = async (data) => {
//   try {
//     const result = await join(data);
//     return result;
//   }catch (error) {
//     console.error(error);
//     return error;
//   }
// };

export const logout = async () => {
  try {
    // localStorage 초기화
    deleteToken();
    deleteUserInfo();
    // Vuex 초기화
    store.commit("account/LOGOUT");
    // login page 로 redirect
    store.commit("common/SET_FULL_SCREEN", true);
    // router.push({ name: "login" });
  } catch (error) {
    console.error(error);
    return error;
  }
};
