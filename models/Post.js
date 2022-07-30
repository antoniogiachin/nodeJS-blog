import mongoose from "mongoose";
const { Schema } = mongoose;
const postSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 2,
      maxLength: 100,
      required: true,
    },
    category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    content: { type: String, minLength: 2, required: true },
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
