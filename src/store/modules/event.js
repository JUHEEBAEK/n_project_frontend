import {
    createEvent
} from "../../api/event.js";

const state = {
    eventList: []
};

const getters = {

};

const mutations = {
    ADD_EVENT(state, event) {
        state.eventList.push(event);
    },
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
};


export default {
    state,
    getters,
    mutations,
    actions
};