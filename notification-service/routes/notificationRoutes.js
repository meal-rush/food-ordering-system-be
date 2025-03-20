const express = require("express");
const router = express.Router();

router.post("/send", (req, res) => {
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

module.exports = router;
