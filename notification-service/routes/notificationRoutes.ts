import express, { Request, Response } from "express";
import { sendToKafka } from "../kafka/producer";

const router = express.Router();

router.post("/send", async (req: Request, res: Response) => {
  const { type, recipient, message, subscription }: { type: string; recipient: string; message: string; subscription?: any } =
    req.body;

  if (!type || !recipient || !message) {
    return res.status(400).json({ error: "Missing required fields: type, recipient, message" });
  }

  try {
    await sendToKafka("notifications", { type, recipient, content: message, subscription });
    res.status(200).json({ success: true, message: "Notification queued successfully" });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: errorMessage });
  }
});

export default router;
