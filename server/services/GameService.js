import { dbContext } from "../database/DbContext";
import { BadRequest } from "../utilities/Errors";

class GameService {
  
  async uploadIdentities(data){
    try {
        let list = data.identitiesList
        console.log(list)
        for (let i in list){
          console.log(list[i])
          await dbContext.IdentityList.create(list[i])
        }
        // identityName: { type: String },
        // identityOrder: { type: Number },
        // totalVoteCount: { type: Number }
      
    } catch (error) {
      console.error(error)
    }
  }

  async getGameData(roundNumber) {
    let data = await dbContext.Session.find({ sessionCode: sessionCode });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }
}

export const gameService = new GameService();
