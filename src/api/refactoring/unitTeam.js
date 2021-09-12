export async function createUnitTeam(form) {
  return await this.post("/api/unitTeam/create", form);
}

export async function getUnitTeamList() {
  return await this.get("/api/unitTeam/list");
}

export async function getUnitTeamInfo(idfTeam) {
  return await this.get(`/api/unitTeam/${idfTeam}`);
}

export async function updateUnitTeam(formData) {
  return await this.put("/api/unitTeam/update", formData);
}

export async function deleteUnitTeam(idfTeam) {
  return await this.delete("/api/unitTeam/delete", idfTeam);
}
