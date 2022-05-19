import { dbContext } from "../db/DbContext";

// Private Methods

class ProfileService {
  /**
   * Provided an array of user emails will return an array of user profiles with email picture and name
   * @param {String[]} hackerNames Array of email addresses to lookup users by
   */
  async getAllPlayers(emails = []) {
    let players = await dbContext.Profile.find({
      hackerName: { $in: hackerNames }
    }).select("email picture name");
    return players;
  }

  /**
   * Returns a user profile from the Auth0 user object
   *
   * Creates user if none exists
   *
   * Adds sub of Auth0 account to profile if not currently on profile
   * @param {any} user
   */
  async getPlayerData(user) {
    let profile = await dbContext.Profile.findOne({
      email: user.email
    });
    profile = await createProfileIfNeeded(profile, user);
    await mergeSubsIfNeeded(profile, user);
    return profile;
  }
  /**
​    * Updates profile with the request body, will only allow changes to editable fields
​    * @param {any} user Auth0 user object
​    * @param {any} body Updates to apply to user object
​    */
  async updateProfile(user, body) {
    let update = sanitizeBody(body);
    let profile = await dbContext.Profile.findOneAndUpdate(
      { email: user.email },
      { $set: update },
      { runValidators: true, setDefaultsOnInsert: true, new: true }
    );
    return profile;
  }
}
export const profilesService = new ProfileService();
