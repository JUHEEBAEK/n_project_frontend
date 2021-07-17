import { generalReq } from "./index.js";

export const createStadium = async form => {
  try {
    const response = await generalReq("post", "/api/stadium/create", form);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getStadiumList = async () => {
  try {
    const response = await generalReq("get", "/api/stadium/list");
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const detailsStadium = async id => {
  const response = await generalReq("get", "/api/stadium/stadium/" + id);
  return response;
};

export const deleteStadium = async stadium_id_dict => {
  try {
    const response = await generalReq(
      "delete",
      "/api/stadium/delete",
      stadium_id_dict
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const updateStadium = async formData => {
  return await generalReq("put", "/api/stadium/update", formData);
};
