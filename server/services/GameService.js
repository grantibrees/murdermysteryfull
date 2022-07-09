import { dbContext } from "../database/DbContext";
import { gameStartup } from "../utilities/GameStartup";
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
    console.log("game created");
    await this.createMole()
    await this.setIdentities()
    await dbContext.Game.findOneAndUpdate(game)
    return game
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
      // return updatedMole
    }else{
      console.log("something wrong with mole");
      return "something wrong with mole"
    }
  }
  async getGameData(){
    let game = await dbContext.Game.findOne({ _id: "62917cae3921a45ae316a97f" })
    return game;
  }

  async setIdentities() {
    let players = await this.getAllPlayerData()
    let playerCount = players.length
    await gameStartup.setIdentityList(playerCount)
    // await this.updateAllPlayersData(players, uniqueIdentCombos)
    
  }


  // async getIdentitiesList(){
  //   let filter = {}
  //   let identitiesList = await dbContext.IdentityList.find(filter);
  //   return identitiesList;
  // }

  async uploadIdentities(data) {
    try {
      let list = data.identitiesList
      // console.log(list)
      for (let i in list) {
        // console.log(list[i])
        await dbContext.IdentityList.create(list[i])
      }
    } catch (error) {
      console.error(error)
    }
  }

  async uploadTrivia(data) {
    try {
      let list = data.trivia
      // console.log(list)
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
