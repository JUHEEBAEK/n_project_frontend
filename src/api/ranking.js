import { generalReq } from "./index.js";

export const getGoalRanking = async() => {
    try {
        const response = await generalReq("get", "/api/ranking/goalRanking");
        return response;
    } catch (e) {
        console.log(e);
    }
};
export const getGoalRankingFilter = async(condition) => {
    try {
        const added_url = `/${condition.contest}/${condition.year}/${condition.month}`
        const response = await generalReq("get", "/api/ranking/goalRankingFilter" + added_url);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getAssistRanking = async() => {
    try {
        const response = await generalReq("get", "/api/ranking/assistRanking");
        return response;
    } catch (e) {
        console.log(e);
    }
};
export const getAssistRankingFilter = async(condition) => {
    try {
        const added_url = `/${condition.contest}/${condition.year}/${condition.month}`
        const response = await generalReq("get", "/api/ranking/assistRankingFilter" + added_url);
        return response;
    } catch (e) {
        console.log(e);
    }
};


export const getCleanSheetRanking = async() => {
    try {
        const response = await generalReq("get", "/api/ranking/cleanSheetRanking");
        return response;
    } catch (e) {
        console.log(e);
    }
};
export const getCleanSheetRankingFilter = async(condition) => {
    try {
        const added_url = `/${condition.contest}/${condition.year}/${condition.month}`
        const response = await generalReq("get", "/api/ranking/cleanSheetRankingFilter" + added_url);
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getAttendRankingFilter = async(condition) => {
    try {
        const added_url = `/${condition.contest}/${condition.year}/${condition.month}`
        const response = await generalReq("get", "/api/ranking/attendRankingFilter" + added_url);
        return response;
    } catch (e) {
        console.log(e);
    }
};
