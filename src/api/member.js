import { generalReq } from "./index.js";

export const createMember = async(form) => {
  try {
    const response = await generalReq("post", "/api/member/create", form);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getReqularMember = async() => {

  try {
    const response = await generalReq("get", "/api/member/list");
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getAllMember = async() => {
  const response = await generalReq("get", "/api/member/allMemberList");
  return response.data;
};

export const detailsMember = async(id) => {
  const response = await generalReq("get", "/api/member/" + id);
  return response;
};

export const deleteMember = async(member_id_form) => {
  try {
    const response = await generalReq("delete", "/api/member/delete", member_id_form);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const updateMember = async(formData) => {
  return await generalReq("put", "/api/member/update", formData);
};