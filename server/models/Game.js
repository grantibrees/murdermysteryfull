import mongoose from "mongoose";
import Round from "./Round";
const Schema = mongoose.Schema;

const PlayerDisplayListSchema = new Schema(
    {
        firstName: { type: String },
        lastName: { type: String },
        hackerName: { type: String, unique: true },
        id: { type: Number, unique: true },
        identity1: { type: String },
        identity2: { type: String },
        roundEarnedVotes: { type: Number},
        roundsWithPasses: [],
        roundsWithFails: []
    }
)

const IdentityOrderListSchema = new Schema(
    {
        identityName: { type: String },
        identityOrder: { type: Number },
        totalVoteCount: { type: Number }
    }
)

const Game = new Schema(
  {
    roundData: { type: Round},
    currentRoundNumber: { type: Number },
    currentPhaseNumber: { type: Number },
    playersList: [PlayerDisplayListSchema],
    identitiesList: [IdentityOrderListSchema],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Game;