import { generalReq } from "./index.js";

export const getGoalRanking = async() => {
    try {
        const response = await generalReq("post", "/api/ranking/goalRanking/");
        return response;
    } catch (e) {
        console.log(e);
    }
};

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