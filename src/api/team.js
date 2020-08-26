import { generalReq } from "./index.js";

export const createTeam = async(form) => {
  try {
    const response = await generalReq("post", "/api/team/create", form);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getTeamList = async() => {
  try {
    const response = await generalReq("get", "/api/team/list");
    return response;
  } catch (e) {
    console.log(e);
  }
};


export const detailsTeam = async(id) => {
  const response = await generalReq("get", "/api/team/" + id);
  return response;
};

export const deleteTeam = async(tean_id_form) => {
  try {
    const response = await generalReq("delete", "/api/team/delete", tean_id_form);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const updateTeam = async(formData) => {
  return await generalReq("put", "/api/team/update", formData);
};