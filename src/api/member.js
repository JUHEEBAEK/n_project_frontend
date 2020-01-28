import axios from "axios";

// const baseUrl = 'http://15.164.138.118:3000';
const devUrl = "http://localhost:3000";

async function addMember(form) {
  try {
    console.log(form);
    const response = await axios.post(`${devUrl}/api/member/create`, form);
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
  }
}

async function selectMember() {
  try {
    const response = await axios.get(`${devUrl}/api/member/members`);
    return response;
  } catch (e) {
    console.log(e);
  }
}

async function detailsMember(id) {
  try {
    const response = await axios.get(`${devUrl}/api/member/members${id}`);
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
    console.log("update api: ", formData);
    const response = await axios.put(`${devUrl}/api/member/update`, formData);
    return response;
  } catch (e) {
    console.log(e);
  }
}

export { addMember, selectMember, deleteMember, detailsMember, updateMember };
