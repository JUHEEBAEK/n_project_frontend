import axios from "axios";

// const baseUrl = 'http://15.164.138.118:3000';
const devUrl = "http://localhost:3000";

async function attendList(id) {
    try {
        const response = await axios.get(`${devUrl}/api/attend/getattendList/${id}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

async function addAttend(form) {
    try {
        const response = await axios.post(
            `${devUrl}/api/attend/create`,
            form
        );
        return response;
    } catch (e) {
        console.log(e);
    }
}

async function deleteAttend(form) {
    try {
        const response = await axios.delete(
            `${devUrl}/api/attend/delete`, {
                data: form
            }
        );
        return response;
    } catch (e) {
        console.log(e);
    }
}

async function countAttend() {
    try {
        const response = await axios.get(`${devUrl}/api/attend/count`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

async function countAllSchedule() {
    try {
        const response = await axios.get(`${devUrl}/api/attend/allCount`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}
async function getScheduleList() {
    try {
        const response = await axios.get(`${devUrl}/api/schedule/list`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

async function countThreeMonths(form) {
    try {
        const response = await axios.post(`${devUrl}/api/attend/count/threeMonths`, form);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export {
    attendList,
    addAttend,
    deleteAttend,
    countAttend,
    countAllSchedule,
    getScheduleList,
    countThreeMonths
};