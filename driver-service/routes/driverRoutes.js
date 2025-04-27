const express = require("express");
const {
  registerDriver,
  loginDriver,
  updateDriverStatus,
  getAvailableDrivers,
  updateDriverLocation
} = require("../controllers/driverController");
const { protectDriver } = require("../middleware/authDriverMiddleware");

const router = express.Router();

router.route("/register").post(registerDriver);
router.route("/login").post(loginDriver);
router.route("/status/:id").put(protectDriver, updateDriverStatus);
router.route("/available").get(getAvailableDrivers);
router.route("/location").put(protectDriver, updateDriverLocation);

module.exports = router;
