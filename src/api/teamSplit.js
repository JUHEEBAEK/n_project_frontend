import { generalReq } from "./index.js";

<<<<<<< HEAD
// const baseUrl = 'http://	52.78.180.164:3000';
const devUrl = "http://localhost:3000";

async function createTeamSplit(form) {
=======
export const getTeamSplitList = async() => {
>>>>>>> develop
  try {
      const response = await generalReq("get", "/api/teamSplit/list");
      return response;
  } catch (e) {
      console.log(e);
  }
};

export const createTeamSplit = async(form) => {
  try {
      const response = await generalReq("post", "/api/teamSplit/create", form);
      return response;
  } catch (e) {
      console.log(e);
  }
};

export const getSplitTeamListWithSchedule = async(scheduleId) => {
  try {
      const response = await generalReq("get", "/api/teamSplit/getSplitTeamListWithSchedule/" + scheduleId);
      return response;
  } catch (e) {
      console.log(e);
  }
};

export const getInfo = async(teamSplitId) => {
  try {
      const response = await generalReq("get", "/api/teamSplit/getInfo/" + teamSplitId);
      return response;
  } catch (e) {
      console.log(e);
  }
};

export const deleteTeamSplit = async(teamSplit_id_form) => {
  try {
    let data = { data: teamSplit_id_form }
    const response = await generalReq("delete", "/api/teamSplit/delete", data);
    return response;
  } catch (e) {
      console.log(e);
  }
};

export const updateTeamSplit = async(formData) => {
  try {
    const response = await generalReq("put", "/api/teamSplit/update", formData);
    return response;
  } catch (e) {
      console.log(e);
  }
};

export const bulkCreateOrUpdate = async(formData) => {
  try {
    const response = await generalReq("post", "/api/teamSplit/bulkCreateOrUpdate", formData);
    return response;
  } catch (e) {
      console.log(e);
  }
};