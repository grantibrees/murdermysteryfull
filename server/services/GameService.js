import { dbContext } from "../database/DbContext";
import { BadRequest } from "../utilities/Errors";

class GameService {

  async createGameAndRound(){
    let game = {
      gameName: "murdermystery",
      roundData: [],
      currentRoundNumber: 0,
      currentPhaseNumber: 0,
      playersList: [],
      identitiesList: [],
    }
    await dbContext.Game.create(game)
    console.log("game created");
  }

  async createMole(){
    let pCount = await dbContext.Player.countDocuments();
    let random = Math.floor(Math.random() * pCount)
    // let possibleMoles = []
    let mole = await dbContext.Player.findOne({ isAPossibleMole: true }).skip(random)
    let updatedMole = await dbContext.Player.findOneAndUpdate(
      { hackerName: mole.hackerName },
      { mole: false }
    )
    updatedMole.mole = true
    // console.log(updatedMole)
    return updatedMole
  }
  
  async uploadIdentities(data){
    try {
        let list = data.identitiesList
        console.log(list)
        for (let i in list){
          console.log(list[i])
          await dbContext.TriviaQuestion.create(list[i])
        }
    } catch (error) {
      console.error(error)
    }
  }


  async getGameData(roundNumber) {
    let data = await dbContext.Game.find({ sessionCode: sessionCode });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }
}

export const gameService = new GameService();
