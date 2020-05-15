import { generalReq } from "./index.js";

export const createMember = async(form) => {
  return await generalReq("post", "/api/member/create", form);
};

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