const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { validationResult } = require("express-validator");

// LOGIN
const login_controller = async (req, res) => {
  // ERRORI
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = validationErrors.array();
    throw error;
  }

  const { email, password } = req.body;
  // CHECK EMAIL
  let foundUser;
  try {
    foundUser = await User.find({ email });
  } catch (e) {
    res.statusCode(422);
    throw new Error(e);
  }
  // CHECK PASSWORD
  try {
    await bcrypt.compare(password, foundUser.password);
  } catch (e) {
    res.statusCode(422);
    throw new Error(e);
  }

  const token = await jwt.sign(
    { email: foundUser.email, id: foundUser._id },
    process.env.SECRET_KEY,
    { expiresIn: "24h" }
  );

  res.status(200).json({
    success: true,
    jtw: token,
  });
};
// REGISTER
const register_controller = async (req, res) => {
  // ERRORI
  const validationErrors = validationResult(req);
  if (!validationErrors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 422;
    error.data = validationErrors.array();
    throw error;
  }

  const {
    name,
    username,
    gender,
    birthDate,
    email,
    password,
    confirmPassword,
  } = req.body;

  // PASSWORD MATCHES
  if (password !== confirmPassword) {
    res.statusCode = 422;
    throw new Error("Different password given");
  }

  // HASH PASSWORD
  const hashedPWD = await bcrypt(password, 12);
  const newUser = new User({
    name,
    username,
    gender,
    birthDate,
    email,
    password: hashedPWD,
  });
  try {
    await newUser.save();
  } catch (e) {
    throw new Error(e);
  }

  res.status(200).json({
    message: "User successfully registered",
    success: true,
  });
};

module.exports = { login_controller, register_controller };
