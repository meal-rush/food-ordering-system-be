/**
 * This model is implemented for
 * the Delivery management
 */
const mongoose = require("mongoose");

const deliveryStatus = {
	ORDER_CREATED: "Order Created",
	PREPARING: "Preparing Order",
	READY_TO_PICKUP: "Ready to Pickup",
	SEARCHING_DRIVER: "Searching for Driver",
	DRIVER_ASSIGNED: "Driver Assigned",
	WAITING_PICKUP: "Waiting for Driver Pickup",
	ON_THE_WAY: "On the Way",
	ARRIVED: "Arrived",
	COMPLETED: "Completed"
};

const deliverySchema = mongoose.Schema({
	order: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Order",
	},
	customer: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Customer",
	},
	orderId: {
		type: String,
		required: true,
		unique: true,
	},
	customerName: {
		type: String,
		required: true,
	},
	customerEmail: {
		type: String,
		required: true,
	},
	customerPhone: {
		type: String,
		required: true,
	},
	deliveryServiceName: {
		type: String,
		required: true,
	},

	deliveryServicePhone: {
		type: String,
		required: true,
	},

	status: {
		type: String,
		required: true,
		enum: Object.values(deliveryStatus),
		default: deliveryStatus.ORDER_CREATED
	},

	driver: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Driver",
	},
	driverName: {
		type: String,
	},
	driverPhone: {
		type: String,
	},
	locationUpdates: [{
		timestamp: Date,
		location: String,
		status: String
	}]
});

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = { Delivery, deliveryStatus };
