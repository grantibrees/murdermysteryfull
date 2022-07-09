import mongoose from "mongoose";
import GameSchema from "../models/Game";
import RoundSchema from "../models/Round";
import PhaseSchema from "../models/Phase";
import PlayerSchema from "../models/Player";
import IdentityOrderListSchema from "../models/IdentityOrderList";
import TriviaSchema from "../models/Trivia";



class DbContext {

  Game = mongoose.model("Game", GameSchema)
  Round = mongoose.model("Round", RoundSchema)
  Player = mongoose.model("Player", PlayerSchema)
  IdentityList = mongoose.model("IdentityList", IdentityOrderListSchema)
  Phase1 = mongoose.model("Phase1", PhaseSchema)
  Phase2 = mongoose.model("Phase2", PhaseSchema)
  TriviaQuestion = mongoose.model("TriviaQuestion", TriviaSchema)
  DeletedTriviaQ = mongoose.model("DeletedTriviaQ", TriviaSchema)

}

export const dbContext = new DbContext();
