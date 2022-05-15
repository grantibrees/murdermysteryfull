import mongoose from "mongoose";
import Player from "./Player";
const Schema = mongoose.Schema;

//Phase 2: Identity voting
//Identities are handled in the Round struct
const playerSchema = new Schema(
  {
    playerList: [Player]
  }
)

const Phase3 = new Schema(
  {
    timer: { type: Number },
    playersMission: { playerList: playerSchema}
  },
  
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Phase3;