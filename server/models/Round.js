import mongoose from "mongoose";
import Phase1 from "./Phase1";
import Phase2 from "./Phase2";
const Schema = mongoose.Schema;

const RoundSchema = new Schema(
  {
    roundNumber: { type: Number },
    phase1Data: {},
    phase2Data: {},
  },
  // { timestamps: true, toJSON: { virtuals: true } }
);

export default RoundSchema;