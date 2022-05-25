import mongoose from "mongoose";
import Round from "./Round";
import PlayerDisplayList from "./PlayerDisplayList";
import IdentityOrderList from "./IdentityOrderList";
const Schema = mongoose.Schema;

// EXAMPLE OF PlayerDisplayList
// const PlayerDisplayListSchema = new Schema(
//   {
//       firstName: { type: String },
//       lastName: { type: String },
//       hackerName: { type: String, unique: true },
//       id: { type: Number, unique: true },
//       identity1: { type: String },
//       identity2: { type: String },
//       roundEarnedVotes: { type: Number},
//       roundsWithPasses: [],
//       roundsWithFails: []
//   }
// )

// EXAMPLE of IdentityOrderList
// const IdentityOrderListSchema = new Schema(
//   {
//       identityName: { type: String },
//       identityOrder: { type: Number },
//       totalVoteCount: { type: Number }
//   }
// )

const GameSchema = new Schema(
  {
    roundData: { type: Round},
    currentRoundNumber: { type: Number },
    currentPhaseNumber: { type: Number },
    playersList: [PlayerDisplayList],
    identitiesList: [IdentityOrderList],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Game;