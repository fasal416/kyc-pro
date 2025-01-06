const multer = require("multer");

const express = require("express");
const throwValidatorError = require("../middleware/throwValidatorError");
const kycController = require("../controllers/kyc");
const { body, param } = require("express-validator");
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

router.patch(
  "/:kycId",
  [
    param("kycId")
      .notEmpty()
      .withMessage("User ID is required.")
      .isMongoId()
      .withMessage("Invalid User ID."),
    body("status")
      .notEmpty()
      .withMessage("Status is required.")
      .isIn(["approved", "rejected"])
      .withMessage('Status must be either "approved" or "rejected".')
      .escape(),
    body("remarks")
      .optional()
      .isString()
      .withMessage("Remarks must be a string.")
      .isLength({ max: 500 })
      .withMessage("Remarks must not exceed 500 characters.")
      .escape(),
  ],
  kycController.patchUpdateStatus
);

router.get("/status", authorize(["user", "admin"]), kycController.getKYCStatus);

module.exports = router;
