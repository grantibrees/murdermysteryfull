import mongoose from "mongoose";
import GameSchema from "../models/Game";
import RoundSchema from "../models/Round";
import Phase1 from "../models/Phase1";
import Phase2 from "../models/Phase2";
import Phase3 from "../models/Phase3";
import PlayerSchema from "../models/Player";
import PlayerDisplayListSchema from "../models/PlayerDisplayList";
import IdentityOrderListSchema from "../models/IdentityOrderList";
import HermesTextSchema from "../models/HermesText";



class DbContext {

  Game = mongoose.model("Game", GameSchema)
  Round = mongoose.model("Round", RoundSchema)
  Players = mongoose.model("Players", PlayerSchema)
  PlayerList = mongoose.model("PlayerList", PlayerDisplayListSchema)
  IdentityList = mongoose.model("IdentityList", IdentityOrderListSchema)
  Phase1 = mongoose.model("Phase1", Phase1)
  Phase2 = mongoose.model("Phase2", Phase2)
  Phase3 = mongoose.model("Phase3", Phase3)
  Hermes = mongoose.model("Hermes", HermesTextSchema)

}

export const dbContext = new DbContext();
