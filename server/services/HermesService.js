import { dbContext } from "../database/DbContext";

// Private Methods

class HermesService {
  /**
   * @param {any} user
   */
  async getPlayerData(user) {
    let profile = await dbContext.Profile.findOne({
      hackerName: player.hackerName
    });
    await mergeSubsIfNeeded(profile, user);
    return profile;
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
export const hermesService = new hermesService();
