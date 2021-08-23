export async function createTeam(form) {
  return await this.post("/api/team/create", form);
}

export async function getAllTeam() {
  return await this.get("/api/team/list");
}

export async function getUnitTeamList() {
  return await this.get("/api/unitTeam/list");
}

export async function getTeamInfo(idfTeam) {
  return await this.get(`/api/team/${idfTeam}`);
}

export async function deleteTeam(idfTeam) {
  return await this.delete("/api/team/delete", idfTeam);
}

export async function updateTeam(formData) {
  return await this.put("/api/team/update", formData);
}
