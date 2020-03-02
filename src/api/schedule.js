import axios from "axios";

// const baseUrl = 'http://15.164.138.118:3000';
const devUrl = "http://localhost:3000";

async function addSchedule(form) {
  try {
    const response = await axios.post(`${devUrl}/api/schedule/create`, form);
    return response;
  } catch (e) {
    console.log(e);
  }
}

async function getScheduleList() {
  try {
    const response = await axios.get(`${devUrl}/api/schedule/list`);
    return response;
  } catch (e) {
    console.log(e);
  }
}

async function getInfo(schduleId) {
  try {
    const response = await axios.get(`${devUrl}/api/schedule/getInfo/${schduleId}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

async function deleteSchedule(schedule_id_form) {
  try {
    const response = await axios.delete(`${devUrl}/api/schedule/delete`, {
      data: schedule_id_form
    });
    return response;
  } catch (e) {
    console.log(e);
  }
}

async function updateSchedule(formData) {
  try {
    const response = await axios.put(`${devUrl}/api/schedule/update`, formData)
    return response;
  } catch (e) {
    console.log(e);
  }
}

export {
  addSchedule,
  getScheduleList,
  getInfo,
  deleteSchedule,
  updateSchedule
};