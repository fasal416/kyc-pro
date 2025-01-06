const express = require("express");
const authorize = require("../middleware/authorize");
const throwValidatorError = require("../middleware/throwValidatorError");

const userController = require("../controllers/user");

const router = express.Router();

router.get("/:id", authorize(["user", "admin"]), userController.getUser);

module.exports = router;
