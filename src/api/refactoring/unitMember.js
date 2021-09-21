export async function createUnitTeamMember(form) {
  return await this.post("/api/unitMember/create", form);
}

export async function getAllUnitMember() {
  return await this.get("/api/unitMember/list");
}

export async function getUnitTeamMember(unit_team_id) {
  return await this.get(`/api/unitMember/list/${unit_team_id}`);
}

export async function deleteUnitTeamMember(formData) {
  const { id_unit_member } = formData;
  return await this.delete("/api/member/delete", { data: { id_unit_member } });
}

export async function updateMember(formData) {
  return await this.put("/api/member/update", formData);
}
