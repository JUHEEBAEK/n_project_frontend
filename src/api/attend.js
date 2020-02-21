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

export {
    attendanceList
};