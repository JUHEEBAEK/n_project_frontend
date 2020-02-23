import axios from "axios";

// const baseUrl = 'http://15.164.138.118:3000';
const devUrl = "http://localhost:3000";

async function countAttendance() {
  try {
    const response = await axios.get(`${devUrl}/api/attendance/count`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

async function countAllSchedule() {
  try {
    const response = await axios.get(`${devUrl}/api/attendance/allCount`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
async function selectSchedule() {
  try {
    const response = await axios.get(`${devUrl}/api/schedule/list`);
    console.log(response);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export {
  countAttendance,
  countAllSchedule,
  selectSchedule
};