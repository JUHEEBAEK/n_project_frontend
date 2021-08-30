export async function createEvent(form) {
  return await this.post("/api/gameReport/create", form);
}
export async function getEventList(data) {
  return await this.get("/api/gameReport/getinfo/" + data);
}
export async function deleteEvent(form) {
  return await this.delete("/api/gameReport/delete" + form);
}
export async function getEventInfo(game_id) {
  return await this.get("/api/gameReport/getinfo/" + game_id);
}
export async function updateGameEvent(form) {
  return await this.put("/api/gameReport/update", form);
}
