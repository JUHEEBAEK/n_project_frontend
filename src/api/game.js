import axios from "axios";

// const baseUrl = 'http://	52.78.180.164:3000';
const devUrl = "http://localhost:3000";

async function getinfoGame(id) {
    try {
        const response = await axios.get(`${devUrl}/api/game/getinfo/${id}`);
        return response;
    } catch (e) {
        console.log(e);
    }
}
async function searchWithScheduleIdAndQuarter(form){
    try {
        const response = await axios.post(
            `${devUrl}/api/game/searchWithScheduleIdAndQuarter`,
            form
        );
        return response;
    } catch (e) {
        console.log(e);
    }
}

async function createGame(form) {
    try {
        const response = await axios.post(
            `${devUrl}/api/game/create`,
            form
        );
        return response;
    } catch (e) {
        console.log(e);
    }
}

async function deleteGame(form) {
    try {
        const response = await axios.delete(
            `${devUrl}/api/game/delete`, {
                data: form
            }
        );
        return response;
    } catch (e) {
        console.log(e);
    }
}

async function getGameList() {
    try {
        const response = await axios.get(`${devUrl}/api/game/list`);
        return response;
    } catch (e) {
        console.log(e);
    }
}

async function updateGame(formData) {
    try {
      const response = await axios.put(`${devUrl}/api/game/update`, formData);
      return response;
    } catch (e) {
      console.log(e);
    }
  }

export {
    getinfoGame,
    createGame,
    deleteGame,
    getGameList,
    searchWithScheduleIdAndQuarter,
    updateGame,
};