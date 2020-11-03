import { generalReq } from "./index.js";

export const createUserHistoty = async(form) => {
  try {
    const response = await generalReq("post", "/api/userHistory/create", form);
    return response;
  } catch (e) {
    console.log(e);
  }
};
