import mongoose from "mongoose";
const { Schema } = mongoose;
const roleSchema = new Schema(
  {
    name: {
      /*
       * 0 = CAPOREDATTORE
       * 1 = REDATTORE
       * 2 = REDATTORE JUNIOR
       * 99 = ADMIN
       * */
      type: [Number],
      enum: [0, 1, 2, 99],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Role", roleSchema);
