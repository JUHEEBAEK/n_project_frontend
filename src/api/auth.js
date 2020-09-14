import { generalReq } from "./index.js";

// 1. 목적 : login 기능
// 2. 설명 : data 는 email 과 password 가 담겨져 있는 객체이다.
export const login = async (data) => {
  return await generalReq("post", "/api/user/login", data);
};

// join 기능
export const join = async (data) => {
  return await generalReq("post", "api/user/register", data);
}
