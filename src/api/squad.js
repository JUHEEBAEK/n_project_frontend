import axios from "axios";

// const baseUrl = 'http://	52.78.180.164:3000';
const devUrl = "http://localhost:3000";


async function getinfoSquad(id) {
    try {
        const response = await axios.get(`${devUrl}/api/squad/getinfo/${id}`);
        return response;
    } catch (e) {
        console.log(e);
    }
}
async function createSquad(form) {
    try {
        const response = await axios.post(
            `${devUrl}/api/squad/create`,
            form
        );
        return response;
    } catch (e) {
        console.log(e);
    }
}

async function deleteSquad(form) {
    try {
        const response = await axios.delete(
            `${devUrl}/api/squad/delete`, {
                data: form
            }
        );
        return response;
    } catch (e) {
        console.log(e);
    }
}

async function getSquadList() {
    try {
        const response = await axios.get(`${devUrl}/api/squad/list`);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export {
    getinfoSquad,
    createSquad,
    deleteSquad,
    getSquadList,
};