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
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

async function countThreeMonths(form) {
  try {
    const response = await axios.post(`${devUrl}/api/attendance/count/threeMonths`, form);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

function setJsonData(arr) {
  let res = {};
  arr.forEach(element => {
    let obj = JSON.parse(element.json);
    res[obj.id] = obj;
  });
  return res;
}


export { countAttendance, countAllSchedule, selectSchedule, countThreeMonths };
