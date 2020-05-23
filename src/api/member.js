import { generalReq } from "./index.js";

export const createMember = async(form) => {
  try {
    const response = await generalReq("get", "/api/member/create", form);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getMember = async() => {
  const response = await generalReq("get", "/api/member/list");
  console.log("getMember", response);
  return response.data;
  
};

export const detailsMember = async(id) => {
  const response = await generalReq("get", "/api/member/" + id);
  console.log(response);
  return response;
};

export const deleteMember = async(member_id) => {
  return await generalReq("get", "/api/member/delete", member_id);
};

export const updateMember = async(formData) => {
  return await generalReq("get", "/api/member/update", formData);
};