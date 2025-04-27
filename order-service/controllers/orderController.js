const Order = require("../models/orderModel");
const Cart = require("../models/cartModel");
const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// Get all orders of a particular customer
const getCustomerOrders = asyncHandler(async (req, res) => {
	const items = await Order.find({ customer: req.params.id });
	res.json(items);
});

// Get all the orders by admin
const getAdminOrders = asyncHandler(async (req, res) => {
	const items = await Order.find();
	res.json(items);
});

// Create a order
// const createOrder = asyncHandler(async (req, res) => {
// 	var status = "pending";
// 	var products = "";
// 	var i = 0;
// 	const { customer, total } = req.body;
// 	var orderID = Math.floor(Math.random() * 100000);

// 	if (!customer || !total) {
// 		res.status(400);
// 		throw new Error("Failed creating order");
// 	} else {
// 		const items = await Cart.find({
// 			customer: customer,
// 		});

// 		// Add the cart items to order
// 		while (i < items.length) {
// 			products = products + items[i].productName + " : " + items[i].quantity;
// 			if (i != items.length - 1) {
// 				products = products + " , ";
// 			}
// 			i++;
// 		}
// 		// Save the order
// 		const order = new Order({
// 			customer,
// 			products,
// 			orderID,
// 			total,
// 			status,
// 		});

// 		const createdOrder = await order.save();

// 		res.status(201).json(createdOrder);
// 	}
// });

// Update the createOrder function in orderController.js
const createOrder = asyncHandler(async (req, res) => {
	var status = "pending";
	var products = "";
	var i = 0;
	const { customer, total } = req.body;
	var orderID = Math.floor(Math.random() * 100000);
  
	if (!customer || !total) {
	  res.status(400);
	  throw new Error("Failed creating order");
	} else {
	  const items = await Cart.find({
		customer: customer,
	  });
  
	  // Add the cart items to order
	  while (i < items.length) {
		products = products + items[i].productName + " : " + items[i].quantity;
		
		// Find the vendor for this product
		if (i === 0) {
		  // We only need to get the vendor for the first product
		  // Fetch product details to get the vendor
		  const product = await Product.findOne({ productCode: items[i].productCode });
		  if (product && product.vendor) {
			vendorId = product.vendor;
		  }
		}
		
		if (i != items.length - 1) {
		  products = products + " , ";
		}
		i++;
	  }
	  
	  // Save the order
	  const order = new Order({
		customer,
		products,
		orderID,
		total,
		status,
		vendor: vendorId, // Add vendor ID to the order
	  });
  
	  const createdOrder = await order.save();
  
	  res.status(201).json(createdOrder);
	}
  });

// Update the order status
const updateOrderStatus = asyncHandler(async (req, res) => {
	const { status } = req.body;

	const order = await Order.findById(req.params.id);

	if (order) {
		order.status = status;

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

// Get all orders for a specific vendor
const getVendorOrders = asyncHandler(async (req, res) => {
	const items = await Order.find({ vendor: req.params.id });
	res.json(items);
  });
  
  // Update the order status by vendor
  const updateOrderStatusByVendor = asyncHandler(async (req, res) => {
	const { status } = req.body;
  
	const order = await Order.findById(req.params.id);
  
	if (order) {
	  // Check if the vendor owns this order
	  if (order.vendor && order.vendor.toString() === req.vendor._id.toString()) {
		order.status = status;
		const updatedOrder = await order.save();
		res.json(updatedOrder);
	  } else {
		res.status(401);
		throw new Error("Not authorized to update this order");
	  }
	} else {
	  res.status(404);
	  throw new Error("Order not found");
	}
  });

module.exports = {
	createOrder,
	getCustomerOrders,
	getAdminOrders,
	updateOrderStatus,
	getVendorOrders,
	updateOrderStatusByVendor
};
