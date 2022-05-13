import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class SessionsService {
  async create(rawData) {
    let data = await dbContext.Session.create(rawData);
  }
  async addToQueue(sessionCode, song) {
    let data = await dbContext.Session.findOneAndUpdate(
      { sessionCode: sessionCode },
      { $addToSet: { queue: song } },
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
    return data;
  }
  async removeFromQueue(sessionCode, songUri) {
    let data = await dbContext.Session.findOneAndUpdate(
      { sessionCode: sessionCode },
      { $pull: { queue: { uri: songUri } } },
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid URI");
    }
    return data;
  }
  async updateSong(sessionCode, body) {
    await dbContext.Session.findOneAndUpdate(
      { sessionCode: sessionCode },
      { $pull: { queue: { uri: body.uri } } },
      { new: true }
    );
    let data = await dbContext.Session.findOneAndUpdate(
      { sessionCode: sessionCode },
      { $addToSet: { queue: body } },
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
    return data;
  }

  async updateActiveSong(sessionCode, body) {
    await dbContext.Session.findOneAndUpdate(
      { sessionCode: sessionCode },
      { $pull: { activeSong: {} } },
      { new: true }
    );
    let data = await dbContext.Session.findOneAndUpdate(
      { sessionCode: sessionCode },
      { $addToSet: { activeSong: body } },
      { new: true }
    );
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
    return data;
  }

  async findActiveSong(sessionCode) {
    let data = await dbContext.Session.find({ sessionCode: sessionCode });
    if (!data) {
      throw new BadRequest("Invalid ID");
    }
    return data;
  }
  async getById(sessionCode) {
    let data = await dbContext.Session.find({ sessionCode: sessionCode });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }
}

export const sessionsService = new SessionsService();
