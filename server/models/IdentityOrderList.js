import mongoose from "mongoose";
const Schema = mongoose.Schema;

const IdentityOrderListSchema = new Schema(
    {
        identityName: { type: String },
        identityOrder: { type: Number },
        totalVoteCount: { type: Number }
    }
)

export default IdentityOrderListSchema;
