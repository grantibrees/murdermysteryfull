import mongoose from "mongoose";
import Phase1 from "./Phase1";
import Phase2 from "./Phase2";
import Phase3 from "./Phase3";
const Schema = mongoose.Schema;

const RoundSchema = new Schema(
  {
    roundNumber: { type: Number },
    currentPhaseNumber: { type: Number },
    phase1Data: { type: Phase1 },
    phase2Data: { type: Phase2 },
    phase3Data: { type: Phase3 },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default RoundSchema;