import { generalReq } from "./index.js";

export const getinfoGame = async id => {
  try {
    const response = await generalReq("get", "/api/game/getinfo/" + id);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getMultiplexInfo = async gameId => {
  try {
    const response = await generalReq(
      "get",
      "/api/game/getMultiplexInfo/" + gameId
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getHomeTeamInfoWithGameId = async gameId => {
  try {
    const response = await generalReq(
      "get",
      "/api/game/getHomeTeamInfoWithGameId/" + gameId
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const getAwayTeamInfoWithGameId = async gameId => {
  try {
    const response = await generalReq(
      "get",
      "/api/game/getAwayTeamInfoWithGameId/" + gameId
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const searchWithScheduleIdAndQuarter = async form => {
  try {
    const response = await generalReq(
      "post",
      "/api/game/searchWithScheduleIdAndQuarter",
      form
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const searchWithScheduleId = async scheduleId => {
  try {
    const response = await generalReq(
      "get",
      "/api/game/searchWithScheduleId/" + scheduleId
    );
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const createGame = async form => {
  try {
    const response = await generalReq("post", "/api/game/create", form);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const deleteGame = async form => {
  try {
    const response = await generalReq("delete", "/api/game/delete", form);
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const selectGameList = async () => {
  try {
    const response = await generalReq("get", "/api/game/list");
    return response;
  } catch (e) {
    console.log(e);
  }
};

export const updateGame = async formData => {
  try {
    const response = await generalReq("put", "/api/game/update", formData);
    return response;
  } catch (e) {
    console.log(e);
  }
};
