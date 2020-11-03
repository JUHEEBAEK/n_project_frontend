import { generalReq } from "./index.js";

export const createUnitTeamMember = async(form) => {
  try {
    const response = await generalReq("post", "/api/unitMember/create", form);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getUnitTeamMember = async(unit_team_id) => {
  try {
      const response = await generalReq("get", `/api/unitMember/list/${unit_team_id}`);
      return response.data;
  } catch (e) {
      console.log(e);
      return e;
  }
};

export const getAllUnitMember = async() => {
  try {
      const response = await generalReq("get", "/api/unitMember/list");
      return response.data;
  } catch (e) {
      console.log(e);
  }
};

export const deleteUnitTeamMember = async(unitMemberId) => {
  try {
    const response = await generalReq("delete", "/api/unitMember/delete/" + unitMemberId);
    return response;
  } catch (e) {
    console.log(e);
  }
}