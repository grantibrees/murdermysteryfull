import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Session = new Schema(
  {
    creatorEmail: { type: String, required: true },
    sessionName: { type: String, required: true },
    sessionCode: { type: String, required: true },
    queue: [],
    activeSong: {},
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Session.virtual("creator", {
  localField: "creatorEmail",
  ref: "Profile",
  foreignField: "email",
  justOne: true,
});

export default Session;
