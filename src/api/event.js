import { generalReq } from "./index.js";

export const createEvent = async(form) => {
    return await generalReq("post", "/api/gameReport/create", form);
};