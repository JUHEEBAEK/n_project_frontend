export async function getinfoGame(id) {
  return await this.get("/api/game/getinfo/" + id);
}

export async function getMultiplexInfo(gameId) {
  return await this.get("/api/game/getMultiplexInfo/" + gameId);
}

export async function getHomeTeamInfoWithGameId(gameId) {
  return await this.get("/api/game/getHomeTeamInfoWithGameId/" + gameId);
}

export async function getAwayTeamInfoWithGameId(gameId) {
  return await this.get("/api/game/getAwayTeamInfoWithGameId/" + gameId);
}

export async function searchWithScheduleIdAndQuarter(form) {
  return await this.post("/api/game/searchWithScheduleIdAndQuarter", form);
}
export async function searchWithScheduleId(scheduleId) {
  return await this.get("/api/game/searchWithScheduleId/" + scheduleId);
}

export async function createGame(form) {
  return await this.post("/api/game/create", form);
}

export async function deleteGame(form) {
  return await this.delete("/api/game/delete", { data: form });
}

export async function selectGameList() {
  return await this.get("/api/game/list");
}

export async function updateGame(form) {
  return await this.put("/api/game/update", form);
}
