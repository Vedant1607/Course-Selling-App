import { Router, Request, Response } from "express";
import { userMiddleware } from "../midleware.js";
import { courseModel, purchaseModel } from "../db.js";

export const courseRouter = Router();

// Extend Express Request to include userId added by middleware
interface AuthenticatedRequest extends Request {
  userId?: string;
}

courseRouter.post("/purchase", userMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;
  const courseId = req.body.courseId as string;

  if (!userId || !courseId) {
    return res.status(400).json({ message: "Missing userId or courseId" });
  }

  await purchaseModel.create({
    userId,
    courseId,
  });

  res.json({
    message: "You have successfully bought the course",
  });
});

courseRouter.get("/preview", async (_req: Request, res: Response) => {
  const courses = await courseModel.find({});

  res.json({
    message: "courses",
    courses,
  });
});
