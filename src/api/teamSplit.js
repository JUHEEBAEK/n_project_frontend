import { generalReq } from "./index.js";

export const getTeamSplitList = async () => {
  try {
    const response = await generalReq("get", "/api/teamSplit/list");
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const createTeamSplit = async form => {
  try {
    const response = await generalReq("post", "/api/teamSplit/create", form);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getSplitTeamListWithSchedule = async scheduleId => {
  try {
    const response = await generalReq(
      "get",
      "/api/teamSplit/getSplitTeamListWithSchedule/" + scheduleId
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getInfo = async teamSplitId => {
  try {
    const response = await generalReq(
      "get",
      "/api/teamSplit/getInfo/" + teamSplitId
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const deleteTeamSplit = async teamSplit_id_form => {
  try {
    const response = await generalReq(
      "delete",
      "/api/teamSplit/delete",
      teamSplit_id_form
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const updateTeamSplit = async formData => {
  try {
    const response = await generalReq("put", "/api/teamSplit/update", formData);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const bulkCreateOrUpdate = async formData => {
  try {
    const response = await generalReq(
      "post",
      "/api/teamSplit/bulkCreateOrUpdate",
      formData
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};
