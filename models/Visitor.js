import mongoose from "mongoose";
const { Schema } = mongoose;
const visitorSchema = new Schema(
  {
    review: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);
