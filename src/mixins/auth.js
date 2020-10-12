import store from "../store";
import { singIn, join} from "../api/auth.js";
import { getToken, getTokenPayload, saveToken } from "../common/token.js";
import { saveUserInfo, getUsnnnn_user_infoerInfo } from "../common/user.js";
/* - 목적 : 인증되어(로그인 되어) 있는 사용자 인지 체크하는 로직  
   - 사용처 : App.vue & router/index.js */
export const isAuthorization = () => {
  try {
    // 토큰 및 사용자 정보가 localStorage 에 저장되어 있는지 체크
    if(getToken() && getUserInfo()) {
      // 저장되어 있다면, 토큰의 경우 유효한 토큰인지 체크
      if(!getTokenPayload(getToken())) {
        return false;
      }else {
        return true;
      }
    }else {
      return false;
    }
  } catch (error) {
    return error;
  }
}

export const login = async (userId, password) => {
  try {
    let formData = new FormData();
    let body = {
      userId: userId,
      password: password
    }
    formData.append("userId", userId);
    formData.append("password", password);

    const result = await singIn(body);
    /* - JWT 발급
       - LocalStorage 에 Token 지정
       - LocalStorage 에 유저 정보 저장 
       - result 는 response 의 body 값 */
    if(result.response) {
      // err 일때 
      return result.response;
    }else {
      console.log("result.data", result.data);
      let token = result.data.Authorization;
      if(token) {
        const { id, name, member_id, team_id, exp } = getTokenPayload(token);
        let user = { exp, id, member_id, name, team_id };
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

export const joinProcess = async (data) => {
  console.log("formData", data);
  try {
    const result = await join(data);
    console.log("join res: ", result);
    return result;
  }catch (error) {
    console.error(error);
    return error;
  }
};

export const logout = async () => {
  try {
    deleteUserInfo();
  }catch (error) {
    console.error(error);
    return error;
  }
}