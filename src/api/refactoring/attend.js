export async function attendList(id) {
  return await this.get(`/api/attend/getAttendList/${id}`);
}

export async function createAttend(form) {
  return await this.post("/api/attend/getAttendList", form);
}

export async function deleteAttend(form) {
  return await this.delete("/api/attend/getAttendList", { data: form });
}

export async function countThreeMonths(form) {
  return await this.post("/api/attend/count/threeMonths", form);
}

export async function countByYear(form) {
  return await this.post("/api/attend/countByYear", form);
}
