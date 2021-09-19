export async function getinfoMemberSquad(id) {
  return await this.get(`/api/memberSquad/getinfo/${id}`);
}

export async function createMemberSquad(form) {
  return await this.post("/api/memberSquad/create", form);
}

export async function createMultipleMemberSquad(form) {
  return await this.post("/api/memberSquad/createMultiple", form);
}

export async function deleteMemberSquad(form) {
  return await this.delete("/api/memberSquad/delete", { data: form });
}

export async function getMemberSquadList() {
  return await this.get(`/api/memberSquad/getinfo/list`);
}

export async function getinfoWithSquadId(id) {
  return await this.get(`/api/memberSquad/getinfoWithSquadId/${id}`);
}
