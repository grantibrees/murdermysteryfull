import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TriviaSchema = new Schema(
  {
    //player info
    category: { type: String },
    type: { type: String },
    difficulty: { type: String },
    question: { type: String },
    correct_answer: { type: String },
    incorrect_answers: [],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default TriviaSchema;
