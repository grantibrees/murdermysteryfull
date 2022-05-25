import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class GameService {
  
  async getRoundData(roundNumber) {
    let data = await dbContext.Session.find({ sessionCode: sessionCode });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }
}

export const gameService = new GameService();
