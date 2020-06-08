import { generalReq } from "./index.js";

export const createEvent = async(form) => {
    return await generalReq("post", "/api/gameReport/create", form);
};

export const getEventList = async(data) => {
    return await generalReq("get", "/api/gameReport/getinfo/" + data);
};