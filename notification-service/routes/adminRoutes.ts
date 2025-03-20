import express, { Request, Response } from "express";
import { sendEmail, sendSMS, sendPushNotification } from "../services/notificationService";

const router = express.Router();

// In-memory storage for notification statuses (replace with a database in production)
const notificationStatuses: Record<string, { type: string; recipient: string; status: string; message: string; subscription?: any }> = {};

// Endpoint to get all notification statuses
router.get("/notifications", (req: Request, res: Response) => {
  res.status(200).json({ success: true, notifications: notificationStatuses });
});

// Endpoint to resend a failed notification
router.post("/notifications/resend/:notificationId", async (req: Request, res: Response) => {
  const { notificationId } = req.params;

  const notification = notificationStatuses[notificationId];
  if (!notification) {
    return res.status(404).json({ error: "Notification not found" });
  }

  if (notification.status !== "failure") {
    return res.status(400).json({ error: "Only failed notifications can be resent" });
  }

  try {
    if (notification.type === "email") {
      await sendEmail(notification.recipient, "Resent Notification", notification.message);
    } else if (notification.type === "sms") {
      await sendSMS(notification.recipient, notification.message);
    } else if (notification.type === "push" && notification.subscription) {
      await sendPushNotification(notification.subscription, notification.message);
    } else {
      return res.status(400).json({ error: "Invalid notification type or missing subscription for push notification" });
    }

    notificationStatuses[notificationId].status = "success";
    res.status(200).json({ success: true, message: "Notification resent successfully" });
  } catch (error) {
    console.error("Error resending notification:", error);
    res.status(500).json({ error: "Failed to resend notification" });
  }
});

export default router;
