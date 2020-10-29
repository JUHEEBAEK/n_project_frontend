import { generalReq } from "./index.js";

export const getSplitTeamWithUnitTeam = async(year,schedule_id) => {
  try {
      const response = await generalReq("get", `/api/unitTeam/getSplitTeamWithUnitTeam/${year}/${schedule_id}`);
      return response;
  } catch (e) {
      console.log(e);
  }
};
