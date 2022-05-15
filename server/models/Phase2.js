import mongoose from "mongoose";
const Schema = mongoose.Schema;

//Phase 2: Identity voting
//Identities are handled in the Round struct

const Phase2 = new Schema(
  {
    timer: { type: Number },    
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Phase2;