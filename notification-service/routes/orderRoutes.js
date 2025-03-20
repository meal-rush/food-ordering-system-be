const express = require("express");
const router = express.Router();

router.post("/create", (req, res) => {
  const { recipient, orderId, items } = req.body;

  if (!recipient || !orderId || !items || !Array.isArray(items)) {
    return res
      .status(400)
      .json({ error: "Missing required fields: recipient, orderId, items" });
  }

  // Simulate sending create order notification
  console.log(
    `Sending create order notification to ${recipient}: Order ID - ${orderId}, Items - ${items.join(
      ", "
    )}`
  );
  res.status(200).json({
    success: true,
    message: "Create order notification sent successfully",
  });
});

module.exports = router;
