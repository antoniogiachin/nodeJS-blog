const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const app = express();
app.use(express.json());

async function connection() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    app.listen(8000);
    console.log("CONNECTED");
  } catch (e) {
    console.log(e);
  }
}

connection();
