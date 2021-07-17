import { generalReq } from "./index.js";

export const getinfoSquad = async id => {
  try {
    const response = await generalReq("get", "/api/squad/getinfo/" + id);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const createSquad = async form => {
  try {
    const response = await generalReq("post", "/api/squad/create", form);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const deleteSquad = async form => {
  try {
    const response = await generalReq("delete", "/api/squad/delete", form);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getSquadList = async () => {
  try {
    const response = await generalReq("get", "/api/squad/list");
    return response;
  } catch (e) {
    console.log(e);
  }
};
