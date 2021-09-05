export async function getTeamSplitList() {
  return await this.get(`/api/teamSplit/list`);
}
export async function createTeamSplit(form) {
  return await this.post("/api/teamSplit/create", form);
}
export async function getSplitTeamListWithSchedule(id) {
  return await this.get(`/api/teamSplit/getSplitTeamListWithSchedule/${id}`);
}

export async function getInfo(id) {
  return await this.get(`/api/teamSplit/getInfo/${id}`);
}
export async function deleteTeamSplit(form) {
  return await this.delete("/api/teamSplit/delete", form);
}

export async function updateTeamSplit(formData) {
  return await this.put("/api/teamSplit/update", formData);
}
export async function bulkCreateOrUpdate(form) {
  return await this.post("/api/teamSplit/bulkCreateOrUpdate", form);
}
