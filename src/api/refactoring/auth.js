// import { generalReq } from "../index.js";

export async function signIn(data) {
  return await this.post(`/api/user/login`, data);
}

// TODO: 토큰이 쓸 수 있는 토큰인지 확인하는 API추가
// export async function verify(data) {
//   return await this.get(`/auth/verify`, {
//     headers: {
//       common: {
//         Authorization: data
//       }
//     }
//   });
// }

// join 기능
export async function join(data) {
  return await this.post(`/api/user/register`, data);
}

export async function duplicateUserId(userId) {
  return await this.get(`/api/user/dupulicated/${userId}`);
}
