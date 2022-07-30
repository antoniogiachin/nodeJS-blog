const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

const {
  login_controller,
  register_controller,
} = require("../controllers/authController");

// POST LOGIN
// validator
const loginValidator = [
  body("username")
    .isString()
    .isLength({ min: 2 })
    .not()
    .isEmpty()
    .trim()
    .escape(),
  ,
  body("password")
    .isString()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1 }),
  body("confirmPassword")
    .isString()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1 }),
];
// route
router.post("/login", loginValidator, login_controller);

// POST REGISTER
// validator
const registerValidator = [
  body("name").isString().isLength({ min: 2 }).not().isEmpty().trim().escape(),
  ,
  body("username")
    .isString()
    .isLength({ min: 2 })
    .not()
    .isEmpty()
    .trim()
    .escape(),
  ,
  body("gender").isString().trim(),
  body("birthDate")
    .isDate()
    .isISO8601()
    .toDate()
    .isAfter("01-01-1900")
    .isBefore("01-01-2100"),
  ,
  body("email").isEmail().normalizeEmail().isLength({ min: 3 }),
  body("password")
    .isString()
    .not()
    .isEmpty()
    .trim()
    .escape()
    .isStrongPassword({ minLength: 8, minUppercase: 1, minSymbols: 1 }),
];
// route
router.post("/register", registerValidator, register_controller);

module.exports = router;
