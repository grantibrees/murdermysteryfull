import mongoose from "mongoose";
import IdentityOrderListSchema from "./IdentityOrderList";
import PlayerDisplayListSchema from "./PlayerDisplayList";
import RoundSchema from "./Round";
const Schema = mongoose.Schema;

const GameSchema = new Schema(
  {
    gameName: { type: String },
    roundData: [RoundSchema],
    currentRoundNumber: { type: Number },
    currentPhaseNumber: { type: Number },
    playersList: [PlayerDisplayListSchema],
    identitiesList: [IdentityOrderListSchema],
  },
  // { timestamps: true, toJSON: { virtuals: true } }
);

export default GameSchema;