import { generalReq } from "./index.js";

export const getMyAssisterById = async(payload) => {
    try {
        let response = "";
        if(payload.year) {
            response = await generalReq("get", `/api/ranking/myAssister/${payload.id}/${payload.year}`);
        } else {
            response = await generalReq("get", `/api/ranking/myAssister/${payload.id}`);
        }
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getMyGoalerById = async(payload) => {
    try {
        let response = "";
        if(payload.year) {
            response = await generalReq("get", `/api/ranking/myGoaler/${payload.id}/${payload.year}`);
        } else {
            response = await generalReq("get", `/api/ranking/myGoaler/${payload.id}`);
        }
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const getNumberOfGoal = async(payload) => {
    try {
        let response = "";
        if(payload.year) {
            response = await generalReq("get", `/api/ranking/goalCount/${payload.id}/${payload.year}`);
        }else {
            response = await generalReq("get", `/api/ranking/goalCount/${payload.id}`);
        }
        return response.data[0];
    } catch (e) {
        console.log(e);
    }
};
export const getNumberOfAssist = async(payload) => {
    try {
        let response = "";
        if(payload.year) {
            response = await generalReq("get", `/api/ranking/assistCount/${payload.id}/${payload.year}`);
        }else {
            response = await generalReq("get", `/api/ranking/assistCount/${payload.id}`);
        }
        return response.data[0];
    } catch (e) {
        console.log(e);
    }
};
export const getNumberOfAttend = async(payload) => {
    try {
        let response = "";
        if(payload.year) {
            response = await generalReq("get", `/api/ranking/scheduleCount/${payload.id}/${payload.year}`);
        }else {
            response = await generalReq("get", `/api/ranking/scheduleCount/${payload.id}`);
        }
        return response.data[0];
    } catch (e) {
        console.log(e);
    }
};
export const getNumberOfPlayedMatch = async(payload) => {
    try {
        let response = "";
        if(payload.year) {
            response = await generalReq("get", `/api/ranking/gameCount/${payload.id}/${payload.year}`);
        }else {
            response = await generalReq("get", `/api/ranking/gameCount/${payload.id}`);
        }
        return response.data[0];
    } catch (e) {
        console.log(e);
    }
};
