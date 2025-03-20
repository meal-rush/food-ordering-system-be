import dotenv from "dotenv";
dotenv.config(); // Ensure this is at the very top

import express, { Application } from "express";
import bodyParser from "body-parser";

import notificationRoutes from "./routes/notificationRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import orderRoutes from "./routes/orderRoutes";
import webhookRoutes from "./routes/webhookRoutes"; // Import webhook routes

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3004", 10);

app.use(bodyParser.json());

// Use modular routes
app.use("/notifications", notificationRoutes);
app.use("/payments", paymentRoutes);
app.use("/orders", orderRoutes);
app.use("/webhooks", webhookRoutes); // Register webhook routes

app.listen(PORT, () => {
  console.log(`Notification service running on http://localhost:${PORT}`);
});
