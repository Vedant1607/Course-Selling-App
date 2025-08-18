import { Router } from "express";
import dotenv from "dotenv";
import { adminModel } from "../db.js";
import jwt from "jsonwebtoken";

dotenv.config();

const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD;

export const adminRouter = Router();

adminRouter.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body; // TODO: adding zod validation
  // TODO: hash the password so plaintext pw is not stored in the DB

  // TODO: Put inside a try catch block
  await adminModel.create({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });

  res.send({
    message: "signup endpoint",
  });
});

adminRouter.post("/signin", async (req, res) => {
  // TODO: ideally password should be hashed, and hence you can't compare the user provided password and the database password
  const { email, password } = req.body;

  const admin = await adminModel.findOne({
    email: email,
    password: password,
  });

  if (admin) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD
    );

    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

adminRouter.post("/course", (req, res) => {
  res.json({
    message: "course endpoint",
  });
});

adminRouter.put("/course", (req, res) => {
  res.json({
    message: "course endpoint",
  });
});

adminRouter.get("/course/bulk", (req, res) => {
  res.json({
    message: "course bulk endpoint",
  });
});
