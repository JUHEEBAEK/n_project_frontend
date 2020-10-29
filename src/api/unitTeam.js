import { generalReq } from "./index.js";

export const createUnitTeam = async(form) => {
  try {
    const response = await generalReq("post", "/api/unitTeam/create", form);
    return response;
  } catch (e) {
    console.log(e);
  }
};