import express, { Request, Response } from "express";

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

export default router;
