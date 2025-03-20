import express, { Request, Response } from "express";
import { sendEmail, sendSMS, sendPushNotification } from "../services/notificationService";

const router = express.Router();

router.post("/send", async (req: Request, res: Response) => {
  const { type, recipient, message, subscription }: { type: string; recipient: string; message: string; subscription?: any } =
    req.body;

  if (!type || !recipient || !message) {
    return res.status(400).json({ error: "Missing required fields: type, recipient, message" });
  }

  try {
    if (type === "email") {
      await sendEmail(recipient, "Order Update", message);
    } else if (type === "sms") {
      await sendSMS(recipient, message);
    } else if (type === "push" && subscription) {
      await sendPushNotification(subscription, message);
    } else {
      return res.status(400).json({ error: "Invalid notification type or missing subscription for push notification" });
    }

    res.status(200).json({ success: true, message: "Notification sent successfully" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
