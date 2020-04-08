import axios from "axios";

// const baseUrl = 'http://15.164.138.118:3000';
const devUrl = "http://localhost:3000";

async function createTeamSplit(form) {
  try {
    const response = await axios.post(`${devUrl}/api/teamSplit/create`, form);
    return response;
  } catch (e) {
    console.log(e);
  }
}

async function getTeamSplitList() {
    try {
      const response = await axios.get(`${devUrl}/api/teamSplit/list`);
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  
  async function getInfo(schduleId) {
    try {
      const response = await axios.get(`${devUrl}/api/teamSplit/getInfo/${schduleId}`);
  
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  
  async function deleteTeamSplit(teamSplit_id_form) {
    try {
      const response = await axios.delete(`${devUrl}/api/teamSplit/delete`, {
        data: teamSplit_id_form
      });
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  
  async function updateTeamSplit(formData) {
    try {
      const response = await axios.put(`${devUrl}/api/teamSplit/update`, formData)
      return response;
    } catch (e) {
      console.log(e);
    }
  }

  async function bulkCreateOrUpdate(formData){
    try {
      const response = await axios.post(`${devUrl}/api/teamSplit/bulkCreateOrUpdate`, formData)
      return response;
    } catch (e) {
      console.log(e);
    }
  }
  
  export {
    createTeamSplit,
    getTeamSplitList,
    getInfo,
    deleteTeamSplit,
    updateTeamSplit,
    bulkCreateOrUpdate
  };