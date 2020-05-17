import { generalReq } from "./index.js";

<<<<<<< HEAD
// const baseUrl = 'http://	52.78.180.164:3000';
const devUrl = "http://localhost:3000";
=======
export const getGoalRanking = async() => {
    try {
        const response = await generalReq("post", "/api/ranking/goalRanking/");
        return response;
    } catch (e) {
        console.log(e);
    }
};
>>>>>>> develop

export const getAssistRanking = async() => {
    try {
        const response = await generalReq("post", "/api/ranking/assistRanking/");
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getCleanSheetRanking = async() => {
    try {
        const response = await generalReq("put", "/api/ranking/cleanSheetRanking/", formData);
        return response;
    } catch (e) {
        console.log(e);
    }
};