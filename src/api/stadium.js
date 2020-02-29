import axios from "axios";

// const baseUrl = 'http://15.164.138.118:3000';
const devUrl = "http://localhost:3000";

async function getStadiumList() {
  try {
    const response = await axios.get(`${devUrl}/api/stadium/list`);
;    return response.data;
  } catch (e) {
    console.log(e);
  }
}

export {
  getStadiumList
};