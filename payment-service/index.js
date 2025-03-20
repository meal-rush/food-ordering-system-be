const express = require("express");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 9003;

app.use(express.json());

// Supported payment methods
const supportedMethods = ["credit_card", "paypal", "bank_transfer"];

// In-memory storage for transactions (for simplicity)
const transactions = [];

// Utility function to log transactions
function logTransaction(transaction) {
  const logEntry = `${new Date().toISOString()} - ${JSON.stringify(
    transaction
  )}\n`;
  fs.appendFileSync("payment-logs.txt", logEntry, "utf8");
}

// Utility function to log and store transactions
function logAndStoreTransaction(transaction) {
  logTransaction(transaction);
  transactions.push(transaction);
}

// Endpoint to process payment
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
    const transaction = { id: Date.now(), amount, method, status: "success" };
    logAndStoreTransaction(transaction);
    res
      .status(200)
      .json({ message: "Payment processed successfully", transaction });
  } catch (error) {
    console.error("Payment processing error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Endpoint to process refunds
app.post("/process-refund", (req, res) => {
  const { transactionId, amount } = req.body;

  if (!transactionId || !amount) {
    return res.status(400).json({ error: "Invalid refund details" });
  }

  const transaction = transactions.find((t) => t.id === transactionId);
  if (!transaction) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  if (transaction.amount < amount) {
    return res
      .status(400)
      .json({ error: "Refund amount exceeds transaction amount" });
  }

  const refund = { id: Date.now(), transactionId, amount, status: "refunded" };
  logAndStoreTransaction(refund);
  res.status(200).json({ message: "Refund processed successfully", refund });
});

// Endpoint to retrieve transaction history
app.get("/transactions", (req, res) => {
  res.status(200).json({ transactions });
});

// Endpoint to check payment status
app.get("/payment-status/:transactionId", (req, res) => {
  const { transactionId } = req.params;

  const transaction = transactions.find((t) => t.id == transactionId);
  if (!transaction) {
    return res.status(404).json({ error: "Transaction not found" });
  }

  res.status(200).json({ transaction });
});

app.listen(port, () => {
  console.log(`Payment service running on port ${port}`);
});
