import mongoose from "mongoose";
import RoundSchema from "./Round";
import PlayerSchema from "./Player";
import IdentityOrderListSchema from "./IdentityOrderList";
const Schema = mongoose.Schema;

const GameSchema = new Schema(
  {
    gameName: { type: String },
    // gameCode: { unique: true },
    roundData: [RoundSchema],
    players: [PlayerSchema],
    identitiesList: [IdentityOrderListSchema],
  },
  // { timestamps: true, toJSON: { virtuals: true } }
);

export default GameSchema;