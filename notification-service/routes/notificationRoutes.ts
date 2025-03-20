import express, { Request, Response } from "express";

const router = express.Router();

router.post("/send", (req: Request, res: Response) => {
  const { type, recipient, message }: { type: string; recipient: string; message: string } = req.body;

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

export default router;
