import jwt_decode from "jwt-decode";
import VueCookies from "vue-cookies";

// cookie 상에 저장되어 있는 토큰이 있는지 확인
export const getToken = () => {
  if (VueCookies.get("user_token")) {
    return VueCookies.get("user_token");
  } else {
    return false;
  }
};

// 토큰의 payload 를 보려는 경우
export const getTokenPayload = token => {
  try {
    const payload = jwt_decode(token);
    console.log(payload);
    return payload;
  } catch (err) {
    return err;
  }
};

// 백엔드 쪽에서 받은 토큰을 cookie 에 굽는 경우 ( 로그인 )
export const saveToken = token => {
  window.$cookies.config("7d");
  window.$cookies.set("user_token", token);
};

// 토큰을 삭제하는 경우 ( 로그아웃, 토큰 기간 만료 등 )
export const deleteToken = () => {
  window.$cookies.remove("user_token");
};
