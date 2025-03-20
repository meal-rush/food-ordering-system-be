const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3001;

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

app.listen(PORT, () => {
  console.log(`Notification service running on http://localhost:${PORT}`);
});
