import mongoose from "mongoose";
const Schema = mongoose.Schema;

//Phase1: open trivia db questions
//AKA "Data Mining"

// Here is an example of the response we get back from OpenTriviaDB:
//     {
//         "response_code": 0,
//         "results": [
//           {
//             "category": "Entertainment: Video Games",
//             "type": "multiple",
//             "difficulty": "easy",
//             "question": "In which series of games do you collect souls to empower you and buy weaponry and armor with?",
//             "correct_answer": "Souls ",
//             "incorrect_answers": [
//               "Final Fantasy ",
//               "Monster Hunter",
//               "The Legend of Zelda"
//             ]
//           },

const triviaQuestionSchema = new Schema(
    {
      category: { type: String },
      type: { type: String },
      difficulty: { type: String },
      question: { type: String },
      correct_answer: { type: String },
      incorrect_answers: [],
    }
)

const Phase1 = new Schema(
  {
    timer: { type: Number },
    questions: [triviaQuestionSchema],
    
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Phase1;