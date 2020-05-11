import axios from "axios";

// const baseUrl = 'http://	52.78.180.164:3000';
const devUrl = "http://localhost:3000";


async function getinfoMemberSquad(id) {
    try {
        const response = await axios.get(`${devUrl}/api/memberSquad/getinfo/${id}`);
        return response;
    } catch (e) {
        console.log(e);
    }
}
async function createMemberSquad(form) {
    try {
        const response = await axios.post(
            `${devUrl}/api/memberSquad/create`,
            form
        );
        return response;
    } catch (e) {
        console.log(e);
    }
}
async function createMultipleMemberSquad(form) {
    try {
        const response = await axios.post(
            `${devUrl}/api/memberSquad/createMultiple`,
            form
        );
        return response;
    } catch (e) {
        console.log(e);
    }
}

async function deleteMemberSquad(form) {
    try {
        const response = await axios.delete(
            `${devUrl}/api/memberSquad/delete`, {
                data: form
            }
        );
        return response;
    } catch (e) {
        console.log(e);
    }
}

async function getMemberSquadList() {
    try {
        const response = await axios.get(`${devUrl}/api/memberSquad/list`);
        return response;
    } catch (e) {
        console.log(e);
    }
}

export {
    getinfoMemberSquad,
    createMemberSquad,
    deleteMemberSquad,
    getMemberSquadList,
    createMultipleMemberSquad,
};