import { generalReq } from "./index.js";

<<<<<<< HEAD
// const baseUrl = 'http://	52.78.180.164:3000';
const devUrl = "http://localhost:3000";


async function getinfoMemberSquad(id) {
=======
export const getinfoMemberSquad = async(id) => {
>>>>>>> develop
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
        let data = { data: form}
        const response = await generalReq("delete", "/api/memberSquad/delete", data);
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