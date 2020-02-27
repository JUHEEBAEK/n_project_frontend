import axios from "axios";

// const baseUrl = 'http://15.164.138.118:3000';
const devUrl = "http://localhost:3000";

async function addMember(form) {
  try {
    const response = await axios.post(`${devUrl}/api/member/create`, form);
    return response;
  } catch (e) {
    console.log(e);
  }
}

async function selectMember() {
  try {
    const response = await axios.get(`${devUrl}/api/member/list`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

async function detailsMember(id) {
  try {
    const response = await axios.get(`${devUrl}/api/member/${id}`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

async function deleteMember(member_id) {
  try {
    const response = await axios.delete(
      `${devUrl}/api/member/delete`,
      member_id
    );
    return response;
  } catch (e) {
    console.log(e);
  }
}

async function updateMember(formData) {
  try {
    const response = await axios.put(`${devUrl}/api/member/update`, formData);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export {
  addMember,
  selectMember,
  deleteMember,
  detailsMember,
  updateMember
};