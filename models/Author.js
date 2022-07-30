import mongoose from "mongoose";
const { Schema } = mongoose;
const authorSchema = new Schema(
  {
    role: {
      type: Schema.Types.ObjectId,
      ref: "Roles",
      default: 2,
    },
    isSponsored: { type: Boolean, default: false },
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Author", authorSchema);
