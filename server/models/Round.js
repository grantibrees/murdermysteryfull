import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Round = new Schema(
  {
    roundNumber: { type: Number, required: true },
    currentPhase: { type: Number, required: true },
    identitiesList: [],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Round;