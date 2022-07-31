const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv").config();
const app = express();
app.use(express.json());

const { userSeeder } = require("./seeder/userSeeder");
const { categorySeeder } = require("./seeder/categorySeeder");

async function connection() {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    app.listen(8000);
    console.log("CONNECTED");
  } catch (e) {
    console.log(e);
  }
}

async function connectAndSeed() {
  try {
    await connection();
    await categorySeeder();
    await userSeeder();
  } catch (e) {
    console.log(e);
  }
}

connectAndSeed();

// CORS
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  preflightContinue: false,
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));

// AUTH ROUTES
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// ERROR HANDLER MIDDLEWARE
const { errorHandler } = require("./middlewares/errorHandler");
app.use(errorHandler);
