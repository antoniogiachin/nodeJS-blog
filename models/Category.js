import mongoose from "mongoose";
const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    name: {
      type: [String],
      enum: [
        "Fast Food",
        "Healthy Dishes",
        "Beef",
        "Sea Food",
        "Mediterranean Cuisine",
        "Asian Cuisine",
        "French Cuisine",
        "Editorial",
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
