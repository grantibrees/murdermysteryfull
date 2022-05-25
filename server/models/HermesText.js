import mongoose from "mongoose";
const Schema = mongoose.Schema;

const HermesTextSchema = new Schema(
    {
      text: { type: String},
      id: { type: Number },
    },
    { timestamps: true, toJSON: { virtuals: true } }
  );

  export default HermesTextSchema;