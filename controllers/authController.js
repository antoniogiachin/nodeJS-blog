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
    foundUser = await User.findOne({ email: email });
  } catch (e) {
    const error = new Error("No user with given email found");
    error.statusCode = 422;
    error.data = e;
    throw error;
  }

  // CHECK PASSWORD
  try {
    await bcrypt.compare(password, foundUser.password);
  } catch (e) {
    const error = new Error("Wrong password given");
    error.statusCode = 422;
    error.data = e;
    throw error;
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
    console.log(validationErrors);
    res.statusCode = 422;
    throw new Error("Validation failed");
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
  const hashedPWD = await bcrypt.hash(password, 12);
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
