import { generalReq } from "./index.js";

<<<<<<< HEAD
// const baseUrl = 'http://	52.78.180.164:3000';
const devUrl = "http://localhost:3000";
=======
export const getinfoSquad = async(id) => {
  try {
    const response = await generalReq("get", "/api/squad/getinfo/" + id);
    return response;
  } catch (e) {
      console.log(e);
  }
};
>>>>>>> develop

export const createSquad = async(form) => {
  try {
    const response = await generalReq("post", "/api/squad/create", form);
    return response;
  } catch (e) {
      console.log(e);
  }
};

export const deleteSquad = async(form) => {
  try {
      let data = { data: form };
    const response = await generalReq("delete", "/api/squad/delete", data);
    return response;
  } catch (e) {
      console.log(e);
  }
};

export const getSquadList = async() => {
    try {
      const response = await generalReq("get", "/api/squad/list");
      return response;
    } catch (e) {
        console.log(e);
    }
};