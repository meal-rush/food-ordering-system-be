const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const driverSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  currentDelivery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Delivery",
    default: null,
  }
});

// Add method to compare passwords
driverSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Middleware to hash password before saving
driverSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const Driver = mongoose.model("Driver", driverSchema);
module.exports = Driver;
