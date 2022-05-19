import mongoose from "mongoose";
import HostTokensSchema from "../models/HostTokens";
import RoundSchema from "../models/Round";
import PlayerSchema from "../models/Player"


class DbContext {

  
  Player = mongoose.model("Player", PlayerSchema)
  
  Round = mongoose.model("Round", RoundSchema)
  
  HostTokens = mongoose.model("HostTokens", HostTokensSchema)


}

export const dbContext = new DbContext();
