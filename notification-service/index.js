const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3004;

app.use(bodyParser.json());

// Route to send notifications
app.post("/send-notification", (req, res) => {
  const { type, recipient, message } = req.body;

  if (!type || !recipient || !message) {
    return res
      .status(400)
      .json({ error: "Missing required fields: type, recipient, message" });
  }

  // Simulate sending notification
  console.log(`Sending ${type} notification to ${recipient}: ${message}`);
  res
    .status(200)
    .json({ success: true, message: "Notification sent successfully" });
});

// Route to send payment notifications
app.post("/send-payment-notification", (req, res) => {
  const { recipient, paymentId, status } = req.body;

  if (!recipient || !paymentId || !status) {
    return res
      .status(400)
      .json({ error: "Missing required fields: recipient, paymentId, status" });
  }

  // Simulate sending payment notification
  console.log(
    `Sending payment notification to ${recipient}: Payment ID - ${paymentId}, Status - ${status}`
  );
  res
    .status(200)
    .json({ success: true, message: "Payment notification sent successfully" });
});

app.listen(PORT, () => {
  console.log(`Notification service running on http://localhost:${PORT}`);
});
