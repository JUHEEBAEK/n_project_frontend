export async function getGoalRanking() {
  return await this.get("/api/ranking/goalRanking");
}

export async function getGoalRankingFilter(condition) {
  const added_url = `/${condition.contest}/${condition.year}/${condition.month}`;
  return await this.get("/api/ranking/goalRankingFilter" + added_url);
}

export async function getAssistRanking() {
  return await this.get("/api/ranking/assistRanking");
}

export async function getAssistRankingFilter(condition) {
  const added_url = `/${condition.contest}/${condition.year}/${condition.month}`;
  return await this.get("/api/ranking/assistRankingFilter" + added_url);
}

export async function getCleanSheetRanking() {
  return await this.get("/api/ranking/cleanSheetRanking");
}

export async function getCleanSheetRankingFilter(condition) {
  const added_url = `/${condition.contest}/${condition.year}/${condition.month}`;
  return await this.get("/api/ranking/cleanSheetRankingFilter" + added_url);
}

// 리그 팀 랭킹
export async function getLeagueRanking(year) {
  return await this.get("/api/ranking/leagueRanking/" + year);
}
export async function getRelativePerformance(year) {
  return await this.get("/api/ranking/leagueRecord/" + year);
}

export async function getAttendRankingFilter(condition) {
  const added_url = `/${condition.contest}/${condition.year}/${condition.month}`;
  return await this.get("/api/ranking/attendRankingFilter" + added_url);
}
