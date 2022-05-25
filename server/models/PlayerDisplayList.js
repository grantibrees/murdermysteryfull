import mongoose from "mongoose";
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

export default PlayerDisplayListSchema;