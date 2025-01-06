const multer = require("multer");

const express = require("express");
const throwValidatorError = require("../middleware/throwValidatorError");
const kycController = require("../controllers/kyc");
const { body } = require("express-validator");
const authorize = require("../middleware/authorize");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("file");

router.post(
  "/",
  [
    authorize(["user", "admin"]),
    upload,
    body("documentType")
      .isString()
      .withMessage("ID must be a string")
      .notEmpty()
      .withMessage("ID is required"),
    throwValidatorError,
  ],

  kycController.postUpdateKYC
);

router.get("/status", authorize(["user", "admin"]), kycController.getKYCStatus);

module.exports = router;
