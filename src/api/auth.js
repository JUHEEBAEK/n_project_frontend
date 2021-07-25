import { generalReq } from "./index.js";

export const singIn = async data => {
  return await this.post(`/api/user/login`, data);
};

export async function verify(data) {
  return await this.get(`/auth/verify`, {
    headers: {
      common: {
        Authorization: data
      }
    }
  });
}

// join 기능
export const join = async data => {
  return await generalReq("post", "/api/user/register", data);
};

export const duplicateUserId = async userId => {
  return await generalReq("get", "/api/user/dupulicated/" + userId);
};
