import { dbContext } from "../database/DbContext";
import { BadRequest } from "../utilities/Errors";

class GameService {

  async start(){
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

  

  async addTriviaToPhase(){
    data = []
    for (let i = 0; i < 50; i++){
      let qCount = await dbContext.TriviaQuestion.count( {type: 'multiple'} );
      let random = Math.floor(Math.random() * qCount)
      let foundQuestion = await dbContext.TriviaQuestion.findOne().skip(random)
      data.push(foundQuestion)
    }
    
    // pick x numbers between 1 and qCount
    // for each i[x], pull it, add it to data, put it in the deleted DB, delete it from the triva db
    // 

    let data = await dbContext.Game.find({ sessionCode: sessionCode });
    return data;
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
