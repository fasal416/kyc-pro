const express = require("express");
const { body, validationResult, query } = require("express-validator");
const throwValidatorError = require("../middleware/throwValidatorError");

const authController = require("../controllers/auth");

const router = express.Router();

router.post(
  "/register",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2 })
      .withMessage("Name must be at least 2 characters long")
      .escape(),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address")
      .normalizeEmail(),

    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long")
      .matches(/\d/)
      .withMessage("Password must contain at least one number")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .escape(),
    throwValidatorError,
  ],
  authController.postRegister
);

router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address")
      .normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required").escape(),
    throwValidatorError,
  ],
  authController.postLogin
);

router.get("/state", authController.getAuthState);

module.exports = router;
