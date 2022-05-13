import mongoose from "mongoose";
const Schema = mongoose.Schema;

const HostTokens = new Schema(
  {
    accessToken: { type: String, required: true } || null,
    refreshToken: { type: String, required: true } || null,
    expiresIn: { type: String, required: true },
    creatorEmail: { type: String, required: true, unique: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default HostTokens;