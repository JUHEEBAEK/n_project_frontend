export async function getMyAssisterById(payload) {
  if (payload.year) {
    return await this.get(`/api/ranking/myAssister/${payload.id}/${payload.year}`);
  } else {
    return await this.get(`/api/ranking/myAssister/${payload.id}`);
  }
}

export async function getMyGoalerById(payload) {
  if (payload.year) {
    return await this.get(`/api/ranking/myGoaler/${payload.id}/${payload.year}`);
  } else {
    return await this.get(`/api/ranking/myGoaler/${payload.id}`);
  }
}

export async function getNumberOfGoal(payload) {
  if (payload.year) {
    return await this.get(`/api/ranking/goalCount/${payload.id}/${payload.year}`);
  } else {
    return await this.get(`/api/ranking/goalCount/${payload.id}`);
  }
}
export async function getNumberOfAssist(payload) {
  if (payload.year) {
    return await this.get(`/api/ranking/assistCount/${payload.id}/${payload.year}`);
  } else {
    return await this.get(`/api/ranking/assistCount/${payload.id}`);
  }
}
export async function getNumberOfAttend(payload) {
  if (payload.year) {
    return await this.get(`/api/ranking/scheduleCount/${payload.id}/${payload.year}`);
  } else {
    return await this.get(`/api/ranking/scheduleCount/${payload.id}`);
  }
}
export async function getNumberOfPlayedMatch(payload) {
  if (payload.year) {
    return await this.get(`/api/ranking/gameCount/${payload.id}/${payload.year}`);
  } else {
    return await this.get(`/api/ranking/gameCount/${payload.id}`);
  }
}
