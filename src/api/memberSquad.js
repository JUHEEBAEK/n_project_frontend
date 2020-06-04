import { generalReq } from "./index.js";

export const getinfoMemberSquad = async(id) => {
    try {
        const response = await generalReq("get", "/api/memberSquad/getinfo/" + id);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const createMemberSquad = async(form) => {
    try {
        const response = await generalReq("post", "/api/memberSquad/create", form);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const createMultipleMemberSquad = async(form) => {
    try {
        const response = await generalReq("post", "/api/memberSquad/createMultiple", form);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const deleteMemberSquad = async(form) => {
    try {
        const response = await generalReq("delete", "/api/memberSquad/delete", form);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getMemberSquadList = async() => {
    try {
        const response = await generalReq("get", "/api/memberSquad/getinfo/list");
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getinfoWithSquadId = async(id) => {
    try {
        const response = await generalReq("get", "/api/memberSquad/getinfoWithSquadId/"+id);
        return response;
    } catch (e) {
        console.log(e);
    }
};
