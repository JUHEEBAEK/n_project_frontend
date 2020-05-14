import axios from "axios";

/* < 매개변수 설명 >
     1. method : get, post, put, delete
     2. url : ip 를 제외한 뒷부분만 기재 ex) http://123.32.4.2/admin --> /admin
     3. token : cookie 에 저장되어 있는 token 사용
     4. data : json 형태로 기재 ex) {"email":"sadf@asc.com","pwd":"123"} */

/* 1. 목적 : 로그인을 하지 않아도 접근 가능한 정보를 요청하는 경우에 사용하기 위한 목적
   2. 설명 : header 에 token 을 담지 않는다.
   3. 참고 : "get" 의 경우에는 data 를 " " 처럼 공백으로 보내고. url 에 해당 params 를 담아서 요청하면 된다. */
export async function generalReq(method, url, data) {
  console.log("==============================");
  console.log("NODE_ENV", process.env.NODE_ENV);
  // 개발 환경인지 프로덕션 환경인지 구분
  const DOMAIN =
    process.env.NODE_ENV === "development"
      ? "http://52.78.180.164:3000"
      : "http://52.78.180.164:3000";

  axios.defaults.baseURL = DOMAIN;
  try {
    const res = await axios({
      method,
      url,
      data
    });
    return res.data;
  } catch (err) {
    return err;
  }
}
