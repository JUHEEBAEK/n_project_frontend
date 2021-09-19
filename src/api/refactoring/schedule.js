export async function getScheduleList() {
  return await this.get("/api/schedule/list");
}

export async function createEvent(form) {
  return await this.post("/api/schedule/create", form);
}

export async function getInfo(schduleId) {
  return await this.get("/api/schedule/getInfo/" + schduleId);
}

export async function getMemberSquadInfo(year, month) {
  return await this.get("/api/schedule/getAttendList/" + year + "/" + month);
}

export async function deleteSchedule(schedule_id_form) {
  return await this.delete("/api/schedule/delete", { data: schedule_id_form });
}

export async function updateSchedule(form) {
  return await this.put("/api/schedule/update", form);
}
