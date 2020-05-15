import { generalReq } from "./index.js";

export const getStadiumList = async() => {
  try {
      const response = await generalReq("get", "/api/stadium/list");
      return response;
  } catch (e) {
      console.log(e);
  }
};