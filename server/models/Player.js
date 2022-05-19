import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Player = new Schema(
  {
    //player info
    firstName: { type: String },
    lastName: { type: String },
    hackerName: { type: String, unique: true },
    phoneNum: { type: Number },
    id: { type: Number, unique: true },
    //game data
    identity1: { type: String },
    identity2: { type: String },
    isAPossibleMole: { type: Boolean },
    lyingAbilityWeight: { type: Number },
    mole: { type: Boolean },
    sympathist: { type: Boolean },
    funFact: { type: String },
    dataLeak: { type: String },
    //trivia question data
    roundQcount: { type: Number},
    roundQright: { type: Number},
    roundQwrong: { type: Number},
    gameQcount: { type: Number},
    gameQright: { type: Number},
    gameQwrong: { type: Number},
    // roundEarnedVotes: { type: Number},
    // roundsWithPasses: [],
    // roundsWithFails: []
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Player;
