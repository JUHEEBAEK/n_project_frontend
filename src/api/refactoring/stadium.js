export async function createStadium(form) {
  return await this.post("/api/stadium/create", form);
}

export async function getStadiumList() {
  return await this.get("/api/stadium/list");
}
export async function detailsStadium(id) {
  return await this.get("/api/stadium/stadium/" + id);
}
export async function deleteStadium(stadium_id_dict) {
  return await this.delete("/api/stadium/delete", { data: stadium_id_dict });
}
export async function updateStadium(form) {
  return await this.put("/api/stadium/update", form);
}
