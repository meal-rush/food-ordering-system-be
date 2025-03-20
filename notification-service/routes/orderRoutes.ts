import express, { Request, Response } from "express";
import { sendEmail, sendSMS, sendPushNotification } from "../services/notificationService";

const router = express.Router();

router.post("/create", (req: Request, res: Response) => {
  const { recipient, orderId, items }: { recipient: string; orderId: string; items: string[] } = req.body;

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

router.post("/status-update", async (req: Request, res: Response) => {
  const {
    recipient,
    orderId,
    status,
    notificationType,
    subscription,
  }: {
    recipient: string;
    orderId: string;
    status: string;
    notificationType: string;
    subscription?: any;
  } = req.body;

  if (!recipient || !orderId || !status || !notificationType) {
    return res
      .status(400)
      .json({ error: "Missing required fields: recipient, orderId, status, notificationType" });
  }

  const message = `Your order with ID ${orderId} is now ${status}.`;

  try {
    if (notificationType === "email") {
      await sendEmail(recipient, "Order Status Update", message);
    } else if (notificationType === "sms") {
      await sendSMS(recipient, message);
    } else if (notificationType === "push" && subscription) {
      await sendPushNotification(subscription, message);
    } else {
      return res
        .status(400)
        .json({ error: "Invalid notification type or missing subscription for push notification" });
    }

    res.status(200).json({ success: true, message: "Order status notification sent successfully" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
