import {
    createEvent,
    getEventList,
    deleteEvent,
    getEventInfo,
    updateGameEvent
} from "../../api/gmaeReport.js";
import { set } from "../../utils/index";
import * as constants from "../constants";

const state = {
    gameReportEventInfo: {},
    eventList: [],
    awayScore: 0,
    homeScore: 0
};

const getters = {

};

const mutations = {
    [constants.setHomeScore]: set("homeScore"),
    [constants.setAwayScore]: set("awayScore"),
    ADD_EVENT(state, event) {
        state.eventList.push(event);
    },
    GET_EVENT_LIST(state, eventList) {
        state.eventList = eventList;
    },
    SET_EVENT_INFO(state, gameReportEventInfo) {
        state.gameReportEventInfo = gameReportEventInfo;
    },
    ADD_HOME_SCORE(state, homeScore) {
        console.log("homeScore", homeScore);
        state.homeScore += homeScore;
    },
    ADD_AWAY_SCORE(state, awayScore) {
        state.awayScore += awayScore;
    },
    SUBTRACT_HOME_SCORE(state, homeScore) {
        state.homeScore -= homeScore;
    },
    SUBTRACT_AWAY_SCORE(state, awayScore) {
        state.awayScore -= awayScore;
    }
};

const actions = {    
    async addGameEvent({commit}, payload) {
        let response = await createEvent(payload);
        commit("ADD_EVENT", payload);
        if (response) {
            return true
        } else {
            return false
        }
    },
    async updateGameEvent({commit}, payload) {
        let response = await updateGameEvent(payload);
        if (response) {
            return true
        } else {
            return false
        }
    },
    async deleteGameEvent({commit}, payload) {
        let response = await deleteEvent(payload);
        if (response) {
            return true
        } else {
            return false
        }
    },
    async getEventList({commit}, payload) {
        let response = await getEventList(payload);
        commit("GET_EVENT_LIST", response.data);
        if (response) {
            return response.data
        } else {
            return false
        }
    },
    async getEventInfo({commit}, payload) {
        let response = await getEventInfo(payload);
        commit("SET_EVENT_INFO", response.data);
        if (response) {
            return response.data
        } else {
            return false
        }
    }
};


export default {
    state,
    getters,
    mutations,
    actions
};