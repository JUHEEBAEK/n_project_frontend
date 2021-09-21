export async function createUnitTeamMember(form) {
  return await this.post("/api/unitMember/create", form);
}

export async function getAllUnitMember() {
  return await this.get("/api/unitMember/list");
}

export async function getUnitTeamMember(unit_team_id) {
  return await this.get(`/api/unitMember/list/${unit_team_id}`);
}

export async function deleteUnitTeamMember(id_unit_member) {
  const data = { id_unit_member: id_unit_member };
  return await this.delete("/api/unitMember/delete", { data });
}
