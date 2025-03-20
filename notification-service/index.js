const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const notificationRoutes = require("./routes/notificationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = process.env.PORT || 3004;

app.use(bodyParser.json());

// Use modular routes
app.use("/notifications", notificationRoutes);
app.use("/payments", paymentRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Notification service running on http://localhost:${PORT}`);
});
