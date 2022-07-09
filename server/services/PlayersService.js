import { dbContext } from "../database/DbContext";
import { gameStartup } from "../utilities/GameStartup";

// Private Methods

class PlayersService {

  async getPlayerData(hackerName) {
    let playerData = await dbContext.Player.findOne({
      hackerName: hackerName
    });
    return playerData;
  }

  async getAllPlayerData() {
    let filter = {}
    let playerData = await dbContext.Player.find(filter);
    return playerData;
  }

  async uploadPlayers(data) {
    try {
      let list = data.players
      // console.log(list)
      for (let i in list) {
        // console.log(list[i])
        await dbContext.Player.create(list[i])
      }
    } catch (error) {
      console.error(error)
    }
  }

  // count players
  // each player gets 2 unique identities

  async setIdentities() {
    let players = await this.getAllPlayerData()
    let playerCount = players.length
    let identitiesList = []

    identitiesList = gameStartup.setIdentityList(playerCount)
    // await this.updateAllPlayersData(players, uniqueIdentCombos)
    return identitiesList
  }

  


  //takes in array of players with both identities
  async updateAllPlayersData(players, uniqueIdentCombos) {

    // await dbContext. (updatedPlayersList
  }

  async updatePlayerData(hackerName, body) {
    let player = await dbContext.Player.findOne(
      { hackerName: hackerName },
    );

    player.identity1 = body.identity1
    player.identity2 = body.identity2
    player.mole = body.mole
    player.sympathist = body.sympathist
    player.roundQcount = body.roundQcount
    player.roundQright = body.roundQright
    player.roundQwrong = body.roundQwrong
    player.gameQcount = body.gameQcount
    player.gameQright = body.gameQright
    player.gameQwrong = body.gameQwrong

    let data = await dbContext.Player.findOneAndUpdate(
      { hackerName: hackerName },
      player,
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid hackerName");
    }
    return data;
  }

}
export const playersService = new PlayersService();
