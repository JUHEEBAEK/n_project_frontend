// 로그인 하고 있는 사용자의 최신 정보를 저장
export const saveUserInfo = userInfo => {
  console.log(userInfo);
  try {
    localStorage.setItem("nnnn_user_info", JSON.stringify(userInfo));
  } catch (err) {
    return err;
  }
};

// 로그인 하고 있는 사용자의 최신 정보
// 이 정보를 참고해서 vuex에 로그인 한 사용자의 정보를 최신화 시킨다
export const getUserInfo = () => {
  try {
    return JSON.parse(localStorage.getItem("nnnn_user_info"));
  } catch (err) {
    return err;
  }
};

// 유저 정보를 삭제하는 경우 ( 로그아웃, 토큰 기간 만료 등 )
export const deleteUserInfo = () => {
  localStorage.removeItem("nnnn_user_info");
};
