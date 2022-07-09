import mongoose from "mongoose";
import Phase from "./Phase";
const Schema = mongoose.Schema;

const RoundSchema = new Schema(
  {
    roundNumber: { type: Number },
    phase1Data: { type: Phase },
    phase2Data: { type: Phase },
  },
  // { timestamps: true, toJSON: { virtuals: true } }
);

export default RoundSchema;