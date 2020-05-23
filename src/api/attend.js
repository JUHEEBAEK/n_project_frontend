import { generalReq } from "./index.js";

export const attendList = async(id) => {
    try {
        const response = await generalReq("get", "/api/attend/getAttendList/" + id);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const createAttend = async(form) => {
    return await generalReq("post", "/api/attend/create", form);
};

export const deleteAttend = async(form) => {
    return await generalReq("delete", "/api/attend/delete", form);
};

export const getScheduleList = async() => {
    return await generalReq("get", "/api/schedule/list");
};

export const countThreeMonths = async(form) => {
    return await generalReq("post", "/api/attend/count/threeMonths", form);
};
