import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class AuthHostService {

  async setHostTokens(data) {
    try {
      await dbContext.HostTokens.findOneAndUpdate(
        { creatorEmail: data.creatorEmail },
        data,
        { new: true, upsert: true })
    } catch (error) {
      console.error(error)
    }
  }
  async getHostTokens(email) {
    let value = await dbContext.HostTokens.findOne({ creatorEmail: email });
    if (!value) {
      throw new BadRequest("Invalid Id");
    }
    return value;
  }
}

export const authHostService = new AuthHostService();