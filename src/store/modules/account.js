import router from "../../router/index";
import { saveToken, deleteToken, getTokenPayload } from "../../common/token.js";

/* [ 참고 ] 
   원래 user 의 정보를 global 한 state 로 등록하던 아니면 현재 account.js 파일에 두고 로그인 로그아웃 기능 등은 auth.js 를 만들어서 빼려고 했다.
   그러나, rootState, rootGetter 는 mutation 에서는 사용할 수 없으며 또한 user 의 정보를 수정하는 일이 많지 않다. 
   때문에, 위의 작업은 복잡성만 늘린다고 판단 인증에 해당하는 기능도 account.js 에 담았다 */

// 로그인 한 사용자의 정보
const state = {
};

const mutations = {
  // < 로그인 성공했을 경우 > : state --> user 에 user email 지정
  login(state, userInfo) {
    state.user = userInfo;
  },
  // < 로그아웃 > : state --> user 를 초기화
  logout(state) {
    state.user = null;
  },
};

const actions = {
  async login({ commit }) {
    // 로그인 시도
    let result = await login();
    /*  < 로그인 성공했을 경우 >
       - JWT 발급
       - Cookie 에 Token 지정
     */
    if (result.Authorization) {
      // 토큰의 payload decode
      const { idfAdmin, email, name, authority, exp } = getTokenPayload(
        result.Authorization
      );
      // 쿠키에 토큰 저장
      saveToken(result.Authorization);
      router.push({ name: "/" });
    }
    // < 401 : 로그인 실패했을 경우  >
    else if (result.response.status === 401) {
      return 401;
    }
    // < 기타 상황 : 서버오류로 간주 >
    else {
      return "ServerError";
    }
  },
  /* < 로그아웃 >
     - Cookie 에 저장되어 있는 JWT 삭제
  */
  logout({ commit }) {
    commit("logout");
    deleteToken();
  },
};

export default {
  state,
  getters,
  mutations,
  actions
};
