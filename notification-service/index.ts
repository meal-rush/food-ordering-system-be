import express, { Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import notificationRoutes from "./routes/notificationRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config();

const app: Application = express();
const PORT: number = parseInt(process.env.PORT || "3004", 10);

app.use(bodyParser.json());

// Use modular routes
app.use("/notifications", notificationRoutes);
app.use("/payments", paymentRoutes);
app.use("/orders", orderRoutes);

app.listen(PORT, () => {
  console.log(`Notification service running on http://localhost:${PORT}`);
});
