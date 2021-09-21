export async function createUnitTeam(form) {
  return await this.post("/api/unitTeam/create", form);
}

export async function getUnitTeamList() {
  return await this.get("/api/unitTeam/list");
}

export async function getSplitTeamWithUnitTeam(year, schedule_id) {
  return await this.get(`/api/unitTeam/getSplitTeamWithUnitTeam/${year}/${schedule_id}`);
}

export async function getUnitTeamInfo(idfTeam) {
  console.log("uniut team id", idfTeam);
  return await this.get(`/api/unitTeam/${idfTeam}`);
}

export async function updateUnitTeam(formData) {
  return await this.put("/api/unitTeam/update", formData);
}

export async function deleteUnitTeam(idfUnitTeam) {
  const data = { id_unit_team: idfUnitTeam };
  return await this.delete("/api/unitTeam/delete", { data });
}
