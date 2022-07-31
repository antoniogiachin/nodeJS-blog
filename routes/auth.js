const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  login_controller,
  register_controller,
} = require("../controllers/authController");

// POST LOGIN
// route
router.post(
  "/login",
  body("email").isEmail().normalizeEmail().isLength({ min: 3 }),
  body("password")
    .isString()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1 }),
  login_controller
);

// POST REGISTER
// route
router.post(
  "/register",
  body("name").isString().isLength({ min: 2 }).not().isEmpty().trim().escape(),
  body("username")
    .isString()
    .isLength({ min: 2 })
    .not()
    .isEmpty()
    .trim()
    .escape(),
  body("gender").isString().trim(),
  body("birthDate").toDate(),
  body("email").isEmail().normalizeEmail().isLength({ min: 3 }),
  body("password")
    .isString()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1 }),
  register_controller
);

module.exports = router;
