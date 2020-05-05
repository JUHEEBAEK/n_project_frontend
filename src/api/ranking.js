import axios from "axios";

// const baseUrl = 'http://15.164.138.118:3000';
const devUrl = "http://localhost:3000";

async function getGoalRanking(form) {
  try {
    const response = await axios.post(`${devUrl}/api/ranking/goalRanking`, form);
    return response;
  } catch (e) {
    console.log(e);
  }
}

async function getAssistRanking() {
  try {
    const response = await axios.get(`${devUrl}/api/ranking/assistRanking`);
    return response;
  } catch (e) {
    console.log(e);
  }
}

async function getCleanSheetRanking(formData) {
  try {
    const response = await axios.put(`${devUrl}/api/ranking/cleanSheetRanking`, formData);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export {
    getGoalRanking,
    getAssistRanking,
    getCleanSheetRanking,
};