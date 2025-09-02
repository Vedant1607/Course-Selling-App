import { Router } from "express";
import { adminModel, userModel } from "../db.js";
import z from "zod";
import bcrypt from "bcrypt";
import jwt, { type JwtPayload } from 'jsonwebtoken';
import { JWT_USER_PASSWORD } from "../config.js";

export const adminRouter = Router();

const signupSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Username must be at least 6 characters")
    .max(20, "Username must be under 10 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
  firstName: z
    .string()
    .min(3, "First Name must have minimum 3 characters")
    .max(10, "First name must be under 10 characters"),
  lastName: z
    .string()
    .min(3, "Last name must have minimum 3 characters")
    .max(10, "Last name must be under 10 characters")
    .optional(),
});

const singinSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Username must be at least 6 characters")
    .max(20, "Username must be under 10 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?=.*[0-9]).+$/,
      "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    ),
});

adminRouter.post("/signup", async (req, res) => {
  try {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return res
        .status(411)
        .json({ errors: result.error.issues.map((error) => error.message) });
    }

    const { email, password, firstName, lastName } = result.data;

    const existingUser = await adminModel.findOne({ email });
    if (existingUser) {
      return res
        .status(403)
        .json({ message: "Admin with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await adminModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    res.status(200).json({ message: "Signed Up" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

adminRouter.post("/signin", async (req, res) => {
  try {
    const result = singinSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(411).json({ message: result.error.issues.map(error => error.message )});
    }

    const { email, password } = result.data;
    
    const user = await adminModel.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(403).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_USER_PASSWORD, { expiresIn: "1h" });

    return res.status(200).json({ token })
  } catch (err) {
    console.error("Error signing in:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
