export async function getinfoSquad(id) {
  return await this.get(`/api/squad/getinfo/${id}`);
}

export async function createSquad(form) {
  return await this.post("/api/squad/create", form);
}

export async function deleteSquad(form) {
  return await this.delete("/api/squad/delete", { data: form });
}
export async function getSquadList() {
  return await this.get(`/api/squado/list`);
}
