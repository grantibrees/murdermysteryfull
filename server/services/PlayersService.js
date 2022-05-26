import { dbContext } from "../database/DbContext";

// Private Methods

class PlayersService {
  /**
   * @param {any} user
   */
  async getPlayerData(hackerName) {
    let playerData = await dbContext.Players.findOne({
      hackerName: hackerName
    });
    return playerData;
  }

  async uploadPlayers(data){
    try {
        let list = data.players
        console.log(list)
        for (let i in list){
          console.log(list[i])
          await dbContext.Players.create(list[i])
        }
    } catch (error) {
      console.error(error)
    }
  }

  async updatePlayerData(sessionCode, body) {
    await dbContext.player.findOneAndUpdate(
      { id: id },
      // { $pull: { player } },
      { new: true }
    );
    let data = await dbContext.Session.findOneAndUpdate(
      { id: id },
      // { $addToSet: { queue: body } },
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
    return data;
  }

}
export const playersService = new PlayersService();
