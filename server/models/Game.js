import mongoose from "mongoose";
const Schema = mongoose.Schema;

const GameSchema = new Schema(
  {
    gameName: { type: String },
    roundData: [],
    currentRoundNumber: { type: Number },
    currentPhaseNumber: { type: Number },
    playersList: [],
    identitiesList: [],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default GameSchema;