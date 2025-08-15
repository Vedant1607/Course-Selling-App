import { Router } from 'express';

export const userRouter = Router();

userRouter.post("/signup", (req, res) => {
  res.send({
    message: "signup endpoint",
  });
});

userRouter.post("/signin", (req, res) => {
  res.json({
    message: "signin endpoint",
  });
});

userRouter.get("/purchases", (req, res) => {
  res.json({
    message: "purchases endpoint",
  });
});
