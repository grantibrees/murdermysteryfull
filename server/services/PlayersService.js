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


  // async setIdentities() {
  //   let noIdentPlayers = await this.getAllPlayerData()
  //   let randomOrderArr = []
  //   let addedOneIdentPlayers = []
  //   let addedBothIdentPlayers = []
  //   let identitiesList = [
  //     { identityName: "Redeye", identityOrder: 0, identUsedCount: 0 },
  //     { identityName: "Ironwire", identityOrder: 1, identUsedCount: 0 },
  //     { identityName: "Glassknife", identityOrder: 2, identUsedCount: 0 },
  //     { identityName: "Ghost", identityOrder: 3, identUsedCount: 0 },
  //     { identityName: "Cloak", identityOrder: 4, identUsedCount: 0 },
  //     { identityName: "Cyborg", identityOrder: 5, identUsedCount: 0 },
  //     { identityName: "Netrunner", identityOrder: 6, identUsedCount: 0 }
  //   ]

  //   //add them all to array in random order
  //   for (let i = 0; i < noIdentPlayers.length; i++) {
  //     let random1Index = Math.floor(Math.random() * noIdentPlayers.length) - 1
  //     randomOrderArr.push(noIdentPlayers[random1Index])
  //     noIdentPlayers.splice(i, 1)
  //   }

  //   for (let i = 0; i < identitiesList.length; i++) {
  //     let currentIdentity1 = identitiesList[i].identityName

  //     for (let j = 0; j < randomOrderArr.length; i++)

  //     if (randomOrderArr[j].identity1 == "none"){
  //       randomOrderArr[j].identity1 = currentIdentity1
  //       identitiesList[i].identUsedCount++
  //       if (randomOrderArr[i].identUsedCount == 6){
  //         identitiesList.splice(i, 1)
  //       }
  //     }
  //     if (randomOrderArr[i].identity1 != "none") {
  //       randomOrderArr[i].identity2 = currentIdentity2
  //       currentIdentity2 = identitiesList[i+1].identityName
  //     }


  //   }



  //   // All this work for nothing... and i did it twice... why do i do this to myself

  //   let listIndex = 1
  //   for (let i = 0; i < identitiesList.length; i++) {
  //     //index as long as the noIdentPlayers array
  //     let random1Index = Math.floor(Math.random() * noIdentPlayers.length) - 1

  //     // if player[index]'s identity1 is none, 
  //     if (noIdentPlayers[random1Index].identity1 == "none") {
  //       // set their identity1 to the identity we are on [i]
  //       noIdentPlayers[i].identity1 = identitiesList[i].identityName
  //       //push that player to the OneIdent array
  //       addedOneIdentPlayers.push(noIdentPlayers[random1Index])
  //       //and increment the used count
  //       identitiesList[i].identUsedCount++

  //       // if the used count is 6
  //       if (identitiesList[i].identUsedCount == 6) {
  //         //make a new random index from the OneIdent array
  //         let random2Index = Math.floor(Math.random() * oneIdentPlayers.length) - 1
  //         //if one of THOSE players's identity2 is none,
  //         if (oneIdentPlayers[random2Index].identity2 == "none") {
  //           //set their identity2 to the next available identity
  //           oneIdentPlayers[random2Index].identity2 = identitiesList[i + listIndex].identityName
  //           //increment listIndex so no duplicates
  //           listIndex++
  //           //if listIndex >= identitiesList.length - 1, set it back to 1
  //           if (listIndex >= identitiesList.length - 1) {
  //             listIndex = 1
  //           }
  //           //increment the used count for that identity
  //           identitiesList[i + listIndex].identUsedCount++
  //           // move the player with both idents to the bothIdent array
  //           addedBothIdentPlayers.push(oneIdentPlayers[random2Index])
  //           // remove them from the OneIdent array
  //           identitiesList.splice(i, 1)
  //         }
  //       }
  //     }
  //   }

  //   console.log(addedBothIdentPlayers);
  // }

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
