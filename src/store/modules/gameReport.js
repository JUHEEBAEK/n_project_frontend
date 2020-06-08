import {
    createEvent,
    getEventList,
    deleteEvent
} from "../../api/gmaeReport.js";

const state = {
    eventList: []
};

const getters = {

};

const mutations = {
    ADD_EVENT(state, event) {
        state.eventList.push(event);
    },
    GET_EVENT_LIST(state, eventList) {
        state.eventList = eventList;
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
    async getEventList({commit}, payload) {
        let response = await getEventList(payload);
        commit("GET_EVENT_LIST", response.data);
        if (response) {
            return response.data
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
};


export default {
    state,
    getters,
    mutations,
    actions
};