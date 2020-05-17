import { generalReq } from "./index.js";

<<<<<<< HEAD
// const baseUrl = 'http://	52.78.180.164:3000';
const devUrl = "http://localhost:3000";

async function getStadiumList() {
=======
export const getStadiumList = async() => {
>>>>>>> develop
  try {
      const response = await generalReq("get", "/api/stadium/list");
      return response;
  } catch (e) {
      console.log(e);
  }
};