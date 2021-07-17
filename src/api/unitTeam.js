import { generalReq } from "./index.js";

export const createUnitTeam = async form => {
  try {
    const response = await generalReq("post", "/api/unitTeam/create", form);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getSplitTeamWithUnitTeam = async (year, schedule_id) => {
  try {
    const response = await generalReq(
      "get",
      `/api/unitTeam/getSplitTeamWithUnitTeam/${year}/${schedule_id}`
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const updateUnitTeam = async unitTeamInfo => {
  try {
    const response = await generalReq(
      "put",
      "/api/unitTeam/update",
      unitTeamInfo
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const deleteUnitTeam = async unitTeamId => {
  try {
    const response = await generalReq(
      "delete",
      "/api/unitTeam/delete",
      unitTeamId
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
