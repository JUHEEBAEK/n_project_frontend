import {
    createEvent,
    getEventList,
    deleteEvent
} from "../../api/gmaeReport.js";
import { set } from "../../utils/index";
import * as constants from "../constants";

const state = {
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
    ADD_HOME_SCORE(state, homeScore) {
        console.log(homeScore);
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
};


export default {
    state,
    getters,
    mutations,
    actions
};