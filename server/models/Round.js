import mongoose from "mongoose";
import Phase1 from "./Phase1";
import Phase2 from "./Phase2";
const Schema = mongoose.Schema;

const identitySchema = new Schema(
  {
    identityName: { type: String },
    voteCountTotal: { type: Number },
  }
)

const Round = new Schema(
  {
    roundNumber: { type: Number },
    currentPhaseNumber: { type: Number },
    phase1Data: { type: Phase1 },
    phase2Data: { type: Phase2 },
    phase3Data: { type: Phase3 },
    identitiesList: [identitySchema],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Round;