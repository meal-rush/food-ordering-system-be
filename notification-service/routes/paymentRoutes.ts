import express, { Request, Response } from "express";

const router = express.Router();

router.post("/send", (req: Request, res: Response) => {
  const { recipient, paymentId, status }: { recipient: string; paymentId: string; status: string } = req.body;

  if (!recipient || !paymentId || !status) {
    return res
      .status(400)
      .json({ error: "Missing required fields: recipient, paymentId, status" });
  }

  // Simulate sending payment notification
  console.log(
    `Sending payment notification to ${recipient}: Payment ID - ${paymentId}, Status - ${status}`
  );
  res
    .status(200)
    .json({ success: true, message: "Payment notification sent successfully" });
});

export default router;
