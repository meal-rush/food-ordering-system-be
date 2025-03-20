const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 9003;

app.use(express.json());

// Supported payment methods
const supportedMethods = ["credit_card", "paypal", "bank_transfer"];

// Utility function to log transactions
function logTransaction(transaction) {
  const logEntry = `${new Date().toISOString()} - ${JSON.stringify(
    transaction
  )}\n`;
  fs.appendFileSync("payment-logs.txt", logEntry, "utf8");
}

app.post("/process-payment", (req, res) => {
  const { amount, method } = req.body;

  // Validate request body
  if (!amount || !method) {
    return res.status(400).json({ error: "Invalid payment details" });
  }

  // Validate payment method
  if (!supportedMethods.includes(method)) {
    return res.status(400).json({ error: "Unsupported payment method" });
  }

  // Simulate payment processing
  try {
    const transaction = { amount, method, status: "success" };
    logTransaction(transaction);
    res
      .status(200)
      .json({ message: "Payment processed successfully", transaction });
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Payment service running on port ${port}`);
});
