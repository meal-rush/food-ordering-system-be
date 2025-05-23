const express = require("express");

const {
	createOrder,
	getCustomerOrders,
	getAdminOrders,
	updateOrderStatus,
	getVendorOrders,
	updateOrderStatusByVendor,
} = require("../controllers/orderController");
const { protectCustomer } = require("../middleware/authCustomerMiddleware");
const { protect } = require("../middleware/authAdminMiddleware");
const { protectVendor } = require("../middleware/authVendorMiddleware");
const router = express.Router();

// Routes for the order management service
router.route("/create").post(protectCustomer, createOrder);
router.route("/get-customer-orders/:id").get(protectCustomer, getCustomerOrders);
router.route("/get-admin-orders").get(protect, getAdminOrders);

router.route("/order-admin/:id").put(protect, updateOrderStatus);
router.route("/order-customer-status/:id").put(protectCustomer, updateOrderStatus);

router.route("/get-vendor-orders/:id").get(protectVendor, getVendorOrders);
router.route("/order-vendor/:id").put(protectVendor, updateOrderStatusByVendor);

module.exports = router;
