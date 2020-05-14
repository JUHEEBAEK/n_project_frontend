import { generalReq } from "./index.js";

export const getScheduleList = async() => {
  try {
    const response = await generalReq("get", "/api/schedule/list");
    return response;
  } catch (e) {
      console.log(e);
  }
};

export const createSchedule = async(form) => {
  try {
    const response = await generalReq("post", "/api/schedule/create", form);
    return response;
  } catch (e) {
      console.log(e);
  }
};

export const getInfo = async(schduleId) => {
  try {
    const response = await generalReq("get", "/api/schedule/getInfo", schduleId);
    return response;
  } catch (e) {
      console.log(e);
  }
};

export const deleteSchedule = async(schedule_id_form) => {
  try {
    let data = { data: schedule_id_form}
    const response = await generalReq("delete", "/api/schedule/delete", data);
    return response;
  } catch (e) {
      console.log(e);
  }
};

export const updateSchedule = async(formData) => {
  try {
    const response = await generalReq("put", "/api/schedule/update", formData);
    return response;
  } catch (e) {
      console.log(e);
  }
};