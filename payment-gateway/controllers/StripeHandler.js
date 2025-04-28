// Load environment variables from .env file
const dotenv = require("dotenv");
const Stripe = require("stripe");
dotenv.config({ path: require("path").resolve(__dirname, "../.env") }); // Ensure correct .env path

const StripeKey = process.env.STRIPE_SECRET_KEY; // Use environment variable for the Stripe key

if (!StripeKey) {
	throw new Error("STRIPE_SECRET_KEY is not defined in the .env file"); // Add error handling
}

const stripe = new Stripe(StripeKey);

//create a payment in stripe payment gateway
const createPaymentIntent = async (req, res) => {
	let { amount, id } = req.body;
	try {
		console.log("Creating payment intent with:", { amount, id }); // Log request data
		const payment = await stripe.paymentIntents.create({
			amount,
			currency: "USD",
			description: "Meal Rush Pay",
			payment_method: id,
			confirm: true,
		});
		res.json({
			message: "Payment successful",
			success: true,
			payment,
		});
	} catch (error) {
		console.error("Error creating payment intent:", error); // Log error details
		res.status(400).json({
			message: "Payment failed",
			success: false,
			error: error.message, // Include error message in response
		});
	}
};

module.exports = {
	createPaymentIntent,
};
