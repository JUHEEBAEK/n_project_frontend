export async function createTeam(form) {
  return await this.post("/api/team/create", form);
}

export async function getAllTeam() {
  return await this.get("/api/team/list");
}

export async function getTeamInfo(idfTeam) {
  return await this.get(`/api/team/${idfTeam}`);
}

export async function deleteTeam(idTeam) {
  const data = { team_id: idTeam };
  return await this.delete("/api/team/delete", { data });
}

export async function updateTeam(formData) {
  return await this.put("/api/team/update", formData);
}
