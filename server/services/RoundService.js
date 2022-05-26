import { dbContext } from "../database/DbContext";
import { BadRequest } from "../utilities/Errors";

class RoundService {
  
  async getRoundData(roundNumber) {
    let data = await dbContext.Session.find({ sessionCode: sessionCode });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }
}

export const roundService = new RoundService();
