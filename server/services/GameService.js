import { dbContext } from "../database/DbContext";
import { gameStartup } from "../utilities/GameStartup";
import { BadRequest } from "../utilities/Errors";
import { playersService } from "./PlayersService";

class GameService {

  async createGame() {
    let game = {
      gameName: "murdermystery",
      roundData: [],
      players: [],
      identitiesList: [],
    }
    // await dbContext.Game.create(game)
    await this.createMole()
    console.log("mole function complete");
    game.identitiesList = await this.setIdentities();
    game.roundData = {
      roundNumber: 0,
      phase1Data:   {
        timer: 0,
        questions: [],
      },
      phase2Data:   {
        timer: 0,
        questions: [],
      },
    }
    console.log("game.identitiesList[0].identityName: " + game.identitiesList[0].identityName);

        await dbContext.Game.findByIdAndUpdate("62917cae3921a45ae316a97f", game)

    console.log("found and updated game [in GameService]");
    return game
  }

  async createMole() {
    let game = await dbContext.Game.findOne({ _id: "62917cae3921a45ae316a97f" })
    let players = game.players
    let pCount = game.players.length;
    let randomIndex = Math.floor(Math.random() * pCount) - 1
    let possibleMolesArray = []
    for (let i = 0; i < players.length; i++) {
       if (players[i].isAPossibleMole == true){
          possibleMolesArray.push(players[i]) 
        }
      }
    let chosenMole = possibleMolesArray[randomIndex].hackerName
    console.log("chosen mole: " + chosenMole);
    //TODO CHANGE THIS BEFORE STARTING FOR REAL
    if(chosenMole){
      for (let i = 0; i < game.players.length; i++) {
        if (game.players[i].hackerName == chosenMole){
          game.players[i].mole = true
        }
      }
      await dbContext.Game.findOneAndUpdate(
        { _id: "62917cae3921a45ae316a97f" },
        { players: game.players}
      )

    } else {
      console.log("something wrong with mole");
      return "something wrong with mole"
    }
  }
  async getGameData(){
    let game = await dbContext.Game.findOne({ _id: "62917cae3921a45ae316a97f" })
    return game;
  }

  async setIdentities() {
    let players = await playersService.getAllPlayerData()
    console.log("in setIdentities, players count: " + players.length);
    let playerCount = players.length
    let identityList = await gameStartup.makeIdentitiesList(playerCount)
    let newIdentityList = []
    //TODO refactor, add this next for loop funtion back into the makeIdentitiesList fn above
    for (let i = 0; i < identityList.length; i++) {
      newIdentityList.push(
        {
          identityName: identityList[i],
          identityOrder: i,
          totalVoteCount: 0,
          revealedStatus: true
      }
      )
    }
    console.log("newIdentityList.length: " + newIdentityList.length);
    return newIdentityList
    // await this.updateAllPlayersData(players, uniqueIdentCombos)
  } 


  // async getIdentitiesList(){
  //   let filter = {}
  //   let identitiesList = await dbContext.IdentityList.find(filter);
  //   return identitiesList;
  // }


  // ADMIN STUFF BELOW
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
