const express = require("express");
const router = express.Router();

router.post("/send", (req, res) => {
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

module.exports = router;
