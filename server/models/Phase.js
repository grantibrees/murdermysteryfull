import mongoose from "mongoose";
const Schema = mongoose.Schema;

//Phase1: trivia questions
//AKA "Data Mining"

const Phase1Schema = new Schema(
  {
    timer: { type: Number },
    questions: [],
    // playersMission: []
  },
  // { timestamps: true, toJSON: { virtuals: true } }
);

export default Phase1Schema;