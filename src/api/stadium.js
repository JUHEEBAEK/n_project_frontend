import axios from "axios";

// const baseUrl = 'http://	52.78.180.164:3000';
const devUrl = "http://localhost:3000";

async function getStadiumList() {
  try {
    const response = await axios.get(`${devUrl}/api/stadium/list`);;
    return response;
  } catch (e) {
    console.log(e);
  }
}

export {
  getStadiumList
};