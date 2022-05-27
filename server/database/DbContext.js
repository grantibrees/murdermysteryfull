import mongoose from "mongoose";
import GameSchema from "../models/Game";
import RoundSchema from "../models/Round";
import Phase1Schema from "../models/Phase1";
import Phase2Schema from "../models/Phase2";
import Phase3Schema from "../models/Phase3";
import PlayerSchema from "../models/Player";
import PlayerDisplayListSchema from "../models/PlayerDisplayList";
import IdentityOrderListSchema from "../models/IdentityOrderList";
import TriviaSchema from "../models/Trivia";



class DbContext {

  Game = mongoose.model("Game", GameSchema)
  Round = mongoose.model("Round", RoundSchema)
  Players = mongoose.model("Players", PlayerSchema)
  PlayerList = mongoose.model("PlayerList", PlayerDisplayListSchema)
  IdentityList = mongoose.model("IdentityList", IdentityOrderListSchema)
  Phase1 = mongoose.model("Phase1", Phase1Schema)
  Phase2 = mongoose.model("Phase2", Phase2Schema)
  Phase3 = mongoose.model("Phase3", Phase3Schema)
  TriviaQuestion = mongoose.model("TriviaQuestion", TriviaSchema)
  DeletedTriviaQ = mongoose.model("DeletedTriviaQ", TriviaSchema)

}

export const dbContext = new DbContext();
