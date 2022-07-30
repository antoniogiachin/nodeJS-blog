import mongoose from "mongoose";
const { Schema } = mongoose;
const reviewSchema = new Schema(
  {
    title: {
      type: String,
      minLength: 2,
      maxLength: 100,
      required: true,
    },
    content: { type: String, minLength: 2, required: true },
    rating: { type: Number, min: 0, max: 5 },
    response: [
      {
        type: Map,
        of: new Schema(
          {
            title: String,
            content: String,
          },
          { timestamps: true }
        ),
      },
    ],
  },
  { timestamps: true }
);

// const user = await User.findOne().populate('socialMediaHandles.$*.oauth'); PER POPOLARE?
module.exports = mongoose.model("Review", reviewSchema);
