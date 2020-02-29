import axios from "axios";

// const baseUrl = 'http://15.164.138.118:3000';
const devUrl = "http://localhost:3000";

async function attendanceList(id) {
    try {
        const response = await axios.get(`${devUrl}/api/attendance/getAttendanceList/${id}`);
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

async function addAttend(form) {
    try {
        const response = await axios.post(
            `${devUrl}/api/attendance/create`,
            form
        );
        return response;
    } catch (e) {
        console.log(e);
    }
}

async function deleteAttend(form) {
    try {
        const response = await axios.delete(
            `${devUrl}/api/attendance/delete`, {
                data: form
            }
        );
        return response;
    } catch (e) {
        console.log(e);
    }
}


export {
    attendanceList,
    addAttend,
    deleteAttend,
};