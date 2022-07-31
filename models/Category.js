const mongoose = require("mongoose");
const { Schema } = mongoose;
const categories = [
  "Fast Food",
  "Healthy Dishes",
  "Beef",
  "Sea Food",
  "Mediterranean Cuisine",
  "Asian Cuisine",
  "French Cuisine",
  "Editorial",
];

const categorySchema = new Schema(
  {
    name: {
      type: String,
      enum: categories,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);
