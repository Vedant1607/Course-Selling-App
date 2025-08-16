import { Router } from 'express';
import { userModel } from '../db.js';

export const userRouter = Router();



userRouter.post("/signup", async (req, res) => {

  const { email, password, firstName, lastName } = req.body; // TODO: adding zod validation
  // TODO: hash the password so plaintext pw is not stored in the DB

  // TODO: Put inside a try catch block
  await userModel.create({
    email:email,
    password:password,
    firstName:firstName,
    lastName:lastName,
  })

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
