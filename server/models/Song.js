import mongoose from "mongoose";
const Schema = mongoose.Schema;

const Session = new Schema(
  {
    uri: { type: String, required: true },
    title: { type: String, required: true },
    artists: [],
    album: { type: String, required: true },
    albumCover: { type: String, required: true },
    trackLength: { type: Number, required: true },
    explicit: { type: Boolean, required: true },
    popularity: { type: Number, required: true },
    score: { type: Number, required: true },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Session;