import { generalReq } from "./index.js";

export const getAllTeam = async() => {
  const response = await generalReq("get", "/api/team/list");
  return response.data;
};
