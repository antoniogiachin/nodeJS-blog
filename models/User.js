const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      minLength: 2,
      required: true,
    },
    username: {
      type: String,
      minLength: 8,
      maxLength: 20,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Not declared"],
      required: false,
      default: "Not declared",
    },
    birthDate: { type: String, minLength: 2, required: true },
    email: {
      type: String,
      minLength: 5,
      required: true,
    },
    password: {
      type: String,
      minLength: 8,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      default: undefined,
    },
    visitor: {
      type: Schema.Types.ObjectId,
      ref: "Visitor",
      default: undefined,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
