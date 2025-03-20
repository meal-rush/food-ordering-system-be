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

router.post("/send-preference", async (req: Request, res: Response) => {
  const {
    recipient,
    message,
    preferences,
    subscription,
  }: {
    recipient: string;
    message: string;
    preferences: { email: boolean; sms: boolean; push: boolean };
    subscription?: any;
  } = req.body;

  if (!recipient || !message || !preferences) {
    return res
      .status(400)
      .json({ error: "Missing required fields: recipient, message, preferences" });
  }

  try {
    if (preferences.email) {
      await sendEmail(recipient, "Notification", message);
    }
    if (preferences.sms) {
      await sendSMS(recipient, message);
    }
    if (preferences.push && subscription) {
      await sendPushNotification(subscription, message);
    }

    res.status(200).json({ success: true, message: "Notifications sent based on user preferences" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
