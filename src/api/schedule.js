import axios from "axios";

// const baseUrl = 'http://15.164.138.118:3000';
const devUrl = "http://localhost:3000";

async function addEvent(form) {
  try {
    console.log("api", form);
    const response = await axios.post(`${devUrl}/api/schedule/create`, form);
    return response;
  } catch (e) {
    console.log(e);
  }
}

async function selectEvent() {
  try {
    console.log("api selectEvent");
    const response = await axios.get(`${devUrl}/api/schedule/list`);
    return response;
  } catch (e) {
    console.log(e);
  }
}

async function deleteEvent(schedule_id_form) {
  try {
    console.log("api deleteEvent");
    const response = await axios.delete(
      `${devUrl}/api/schedule/delete`, {
        data: schedule_id_form
      }
    );
    console.log('deleteEvent response - ', response);
    return response
  } catch (e) {
    console.log(e);
  }
}

export {
  addEvent,
  selectEvent,
  deleteEvent
};