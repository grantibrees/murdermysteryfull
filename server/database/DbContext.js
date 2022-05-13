import mongoose from "mongoose";
import HostTokensSchema from "../models/HostTokens";
import SongSchema from "../models/Song";
import SessionSchema from "../models/Session"
import ProfileSchema from "../models/Profile"


class DbContext {


  Song = mongoose.model("Song", SongSchema)
  Session = mongoose.model("Session", SessionSchema)

  HostTokens = mongoose.model("HostTokens", HostTokensSchema)

  Profile = mongoose.model("Profile", ProfileSchema)

}

export const dbContext = new DbContext();
