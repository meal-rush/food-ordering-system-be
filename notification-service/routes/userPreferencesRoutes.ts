import express, { Request, Response } from "express";

const router = express.Router();

// In-memory storage for user preferences (replace with a database in production)
const userPreferences: Record<string, { email: boolean; sms: boolean; push: boolean }> = {};

// Endpoint to get user preferences
router.get("/:userId/preferences", (req: Request, res: Response) => {
  const { userId } = req.params;

  if (!userPreferences[userId]) {
    return res.status(404).json({ error: "User preferences not found" });
  }

  res.status(200).json({ success: true, preferences: userPreferences[userId] });
});

// Endpoint to update user preferences
router.put("/:userId/preferences", (req: Request, res: Response) => {
  const { userId } = req.params;
  const { email, sms, push }: { email?: boolean; sms?: boolean; push?: boolean } = req.body;

  if (email === undefined && sms === undefined && push === undefined) {
    return res.status(400).json({ error: "At least one preference (email, sms, push) must be provided" });
  }

  userPreferences[userId] = {
    email: email ?? userPreferences[userId]?.email ?? true,
    sms: sms ?? userPreferences[userId]?.sms ?? true,
    push: push ?? userPreferences[userId]?.push ?? true,
  };

  res.status(200).json({ success: true, preferences: userPreferences[userId] });
});

export default router;
