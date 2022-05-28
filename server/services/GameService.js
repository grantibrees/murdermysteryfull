import { dbContext } from "../database/DbContext";
import { BadRequest } from "../utilities/Errors";

class GameService {

  async createGame() {
    let game = {
      gameName: "murdermystery",
      roundData: [],
      currentRoundNumber: 0,
      currentPhaseNumber: 0,
      playersList: [],
      identitiesList: [],
    }
    // await dbContext.Game.create(game)
    await dbContext.Game.findOneAndUpdate(game)
    console.log("game created");
  }

  async createMole() {
    let pCount = await dbContext.Player.countDocuments();
    let randomIndex = Math.floor(Math.random() * pCount) - 1
    let possibleMolesArray = []
    possibleMolesArray = await dbContext.Player.find({ isAPossibleMole: true })
    // console.log(possibleMolesArray);
    let chosenMole = possibleMolesArray[randomIndex].hackerName
    console.log(chosenMole);
    //TODO CHANGE THIS BEFORE STARTING FOR REAL
    if(chosenMole){
      let updatedMole = await dbContext.Player.findOneAndUpdate(
        { hackerName: chosenMole },
        { mole: false }
      )
      updatedMole.mole = true
      // console.log(updatedMole)
      return updatedMole
    }else{
      console.log("something wrong with mole");
      return "something wrong with mole"
    }
  }

  async uploadIdentities(data) {
    try {
      let list = data.identitiesList
      console.log(list)
      for (let i in list) {
        console.log(list[i])
        await dbContext.IdentityList.create(list[i])
      }
    } catch (error) {
      console.error(error)
    }
  }

  async uploadTrivia(data) {
    try {
      let list = data.trivia
      console.log(list)
      for (let i in list) {
        // console.log(list[i])
        await dbContext.TriviaQuestion.create(list[i])
      }
      let qCount = await dbContext.TriviaQuestion.countDocuments({ type: 'multiple' });
      console.log(qCount + " questions in DB");

    } catch (error) {
      console.error(error)
    }
  }

}

export const gameService = new GameService();
