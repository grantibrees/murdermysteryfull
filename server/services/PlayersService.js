import { dbContext } from "../database/DbContext";
import { gameService } from "./GameService";

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
      console.log(list)
      for (let i in list) {
        console.log(list[i])
        await dbContext.Player.create(list[i])
      }
    } catch (error) {
      console.error(error)
    }
  }

  async setIdentities() {
    let noIdentPlayers = await this.getAllPlayerData()
    let addedBothIdentPlayers = []
    let identitiesList = [
      { identityName: "Redeye", identityOrder: 0, identUsedCount: 0 },
      { identityName: "Ironwire", identityOrder: 1, identUsedCount: 0 },
      { identityName: "Glassknife", identityOrder: 2, identUsedCount: 0 },
      { identityName: "Ghost", identityOrder: 3, identUsedCount: 0 },
      { identityName: "Cloak", identityOrder: 4, identUsedCount: 0 },
      { identityName: "Cyborg", identityOrder: 5, identUsedCount: 0 },
      { identityName: "Bugger", identityOrder: 6, identUsedCount: 0 },
      { identityName: "Netrunner", identityOrder: 7, identUsedCount: 0 }
    ]
    for (i in identitiesList){
      //index as long as the noIdentPlayers array
      let random1Index = Math.floor(Math.random() * noIdentPlayers.length) - 1

      // if player[index]'s identity1 is none, add the identity we are on
      if (noIdentPlayers[random1Index].identity1 == "none") {
        noIdentPlayers[i].identity1 = identitiesList[i].identityName

      // if player[index]'s identity2 is none, add the identity we are on
      } else if (noIdentPlayers[random1Index].identity1 == "none") {
        noIdentPlayers[i].identity2 = identitiesList[i].identityName
        // if identities are filled, add the random player to the new array, remove from old
      } else {
        addedBothIdentPlayers.push(noIdentPlayers[random1Index])
        noIdentPlayers.splice(random1Index, 1)
      }

      //increment count, remove if used up
      identitiesList[i].identUsedCount++
      if (identitiesList[i].identUsedCount == 6) {
        identitiesList.splice(i, 1)
      }
    }

    console.log(addedBothIdentPlayers);
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
