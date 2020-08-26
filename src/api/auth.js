import { generalReq, authReq } from "./index.js";

// 1. 목적 : login 기능
// 2. 설명 : data 는 email 과 password 가 담겨져 있는 객체이다.
export const login = async (data) => {
  return await authReq("post", "/api/user/login", data);
};