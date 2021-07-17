import { generalReq } from "./index.js";

export const createEvent = async form => {
  return await generalReq("post", "/api/gameReport/create", form);
};
export const getEventList = async data => {
  return await generalReq("get", "/api/gameReport/getinfo/" + data);
};
export const deleteEvent = async form => {
  return await generalReq("delete", "/api/gameReport/delete", form);
};
export const getEventInfo = async report_id => {
  return await generalReq("get", "/api/gameReport/getinfo/" + game_id);
};
export const updateGameEvent = async form => {
  return await generalReq("put", "/api/gameReport/update", form);
};
