import { generalReq } from "./index.js";

<<<<<<< HEAD
// const baseUrl = 'http://	52.78.180.164:3000';
const devUrl = "http://localhost:3000";
=======
export const createMember = async(form) => {
  return await generalReq("post", "/api/member/create", form);
};
>>>>>>> develop

export const getMember = async() => {
  return await generalReq("get", "/api/member/list");
};

export const detailsMember = async(id) => {
  return await generalReq("get", "/api/member/" + id);
};

export const deleteMember = async(member_id) => {
  return await generalReq("get", "/api/member/delete", member_id);
};

export const updateMember = async(formData) => {
  return await generalReq("get", "/api/member/update", formData);
};