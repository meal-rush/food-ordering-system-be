const Driver = require("../models/driverModel");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const axios = require("axios");

const registerDriver = asyncHandler(async (req, res) => {
  const { name, email, password, phone, vehicleNumber } = req.body;
  
  const driverExists = await Driver.findOne({ email });
  if (driverExists) {
    res.status(400);
    throw new Error("Driver already exists");
  }

  const driver = await Driver.create({
    name,
    email,
    password,
    phone,
    vehicleNumber,
  });

  if (driver) {
    res.status(201).json({
      _id: driver._id,
      name: driver.name,
      email: driver.email,
      phone: driver.phone,
      vehicleNumber: driver.vehicleNumber,
    });
  }
});

const loginDriver = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const driver = await Driver.findOne({ email });

  if (driver && (await driver.matchPassword(password))) {
    res.json({
      _id: driver._id,
      name: driver.name,
      email: driver.email,
      token: generateToken(driver._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const updateDriverStatus = asyncHandler(async (req, res) => {
  const { isAvailable, currentDelivery } = req.body;
  const driver = await Driver.findById(req.params.id);

  if (driver) {
    driver.isAvailable = isAvailable;
    driver.currentDelivery = currentDelivery;
    const updatedDriver = await driver.save();
    res.json(updatedDriver);
  } else {
    res.status(404);
    throw new Error("Driver not found");
  }
});

const updateDriverLocation = asyncHandler(async (req, res) => {
  const { location, status, deliveryId } = req.body;
  
  try {
    // Call delivery service to update location
    const response = await axios.put(
      `${process.env.DELIVERY_SERVICE_URL}/delivery/${deliveryId}/update-location`,
      { location, status },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500);
    throw new Error(error.response?.data?.message || "Failed to update location");
  }
});

const getAvailableDrivers = asyncHandler(async (req, res) => {
  const drivers = await Driver.find({ isAvailable: true });
  res.json(drivers);
});

module.exports = {
  registerDriver,
  loginDriver,
  updateDriverStatus,
  updateDriverLocation,
  getAvailableDrivers,
};
