import mongoose from "mongoose";
const Schema = mongoose.Schema;

const twilioParticipantSchema = new Schema(
  {
    //TODO
  }
)

const Player = new Schema(
  {
    //player info
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    hackerName: { type: String, required: true, unique: true },
    phoneNum: { type: Number, required: true, unique: true },
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
    roundEarnedVotes: { type: Number},
    roundQcount: { type: Number},
    roundQright: { type: Number},
    roundQwrong: { type: Number},
    gameQcount: { type: Number},
    gameQright: { type: Number},
    gameQwrong: { type: Number},
    //api data
    twilioParticipantData: { type: twilioParticipantSchema }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Player;
