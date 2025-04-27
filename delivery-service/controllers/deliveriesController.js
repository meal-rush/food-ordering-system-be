const { Delivery, deliveryStatus } = require("../models/deliveriesModel");
const Customer = require("../models/customerModel");
const Order = require("../models/orderModel");
const asyncHandler = require("express-async-handler");
const axios = require("axios");

// Helper function to generate unique orderId
const generateUniqueOrderId = async () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  const orderId = `${timestamp}${random}`;
  
  // Check if orderId exists
  const existingDelivery = await Delivery.findOne({ orderId });
  if (existingDelivery) {
    return generateUniqueOrderId(); // Recursively try again if exists
  }
  return orderId;
};

// create a delivery according to order id
const createDelivery = asyncHandler(async (req, res) => {
  const {
    order,
    customer,
    customerName,
    customerEmail,
    customerPhone,
    deliveryServiceName,
    deliveryServiceEmail,
    deliveryServicePhone,
    status,
  } = req.body;

  const orders = await Order.findById(order);
  const orderId = await generateUniqueOrderId();

  if (!order || !customer || !customerName || !customerEmail || !customerPhone 
      || !deliveryServiceName || !deliveryServiceEmail || !deliveryServicePhone || !status) {
    res.status(400);
    throw new Error("Please Fill all the fields");
  } else {
    const delivery = new Delivery({
      order,
      customer,
      orderId,
      customerName,
      customerEmail,
      customerPhone,
      deliveryServiceName,
      deliveryServiceEmail,
      deliveryServicePhone,
      status: deliveryStatus.ORDER_CREATED,
    });

    const createDelivery = await delivery.save();
    res.status(201).json(createDelivery);
  }
});

// get delivery for each single customer
const getDeliveriesForEachCustomer = asyncHandler(async (req, res) => {
	const customer = await Customer.findById(req.params.id);
	const deliveries = await Delivery.find({ customer: customer._id });
	res.json(deliveries);
});

// get all of deliveries
const getDeliveries = asyncHandler(async (req, res) => {
	const deliveries = await Delivery.find();
	res.json(deliveries);
});

// get deliveries according to their id
const getDeliveryById = asyncHandler(async (req, res) => {
	const delivery = await Delivery.findById(req.params.id);
	if (delivery) {
		res.json(delivery);
	} else {
		res.status(404).json({ message: "Delivery not found" });
	}
});

// update delivery status
const updateDelivery = asyncHandler(async (req, res) => {
	const { status } = req.body;

	const delivery = await Delivery.findById(req.params.id);
	if (delivery) {
		delivery.status = status;

		const updatedDelivery = await delivery.save();
		res.json(updatedDelivery);
	} else {
		res.status(404);
		throw new Error("Delivery not found");
	}
});

// assign driver to delivery
const assignDriver = asyncHandler(async (req, res) => {
	const { driverId } = req.body;

	try {
		// Get driver details from driver service
		const driverResponse = await axios.get(
			`${process.env.DRIVER_SERVICE_URL}/driver/${driverId}`,
			{
				headers: {
					Authorization: req.headers.authorization,
				},
			}
		);

		const driverData = driverResponse.data;
		const delivery = await Delivery.findById(req.params.id);

		if (delivery) {
			delivery.driver = driverId;
			delivery.driverName = driverData.name;
			delivery.driverPhone = driverData.phone;
			delivery.status = "Driver Assigned";
			delivery.locationUpdates.push({
				timestamp: new Date(),
				location: "Restaurant",
				status: "Driver Assigned",
			});

			const updatedDelivery = await delivery.save();

			// Update driver status in driver service
			await axios.put(
				`${process.env.DRIVER_SERVICE_URL}/driver/status/${driverId}`,
				{
					isAvailable: false,
					currentDelivery: delivery._id,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: req.headers.authorization,
					},
				}
			);

			res.json(updatedDelivery);
		} else {
			res.status(404);
			throw new Error("Delivery not found");
		}
	} catch (error) {
		res.status(error.response?.status || 500);
		throw new Error(error.response?.data?.message || "Error assigning driver");
	}
});

// update delivery location
const updateLocation = asyncHandler(async (req, res) => {
	const { location, status } = req.body;
	const delivery = await Delivery.findById(req.params.id);

	if (delivery) {
		delivery.locationUpdates.push({
			timestamp: new Date(),
			location,
			status,
		});
		delivery.status = status;

		const updatedDelivery = await delivery.save();
		res.json(updatedDelivery);
	} else {
		res.status(404);
		throw new Error("Delivery not found");
	}
});

module.exports = {
	createDelivery,
	getDeliveriesForEachCustomer,
	getDeliveries,
	getDeliveryById,
	updateDelivery,
	assignDriver,
	updateLocation,
};
