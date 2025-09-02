import { Router } from "express";
import { adminModel, courseModel } from "../db.js";
import jwt from "jsonwebtoken";
import { JWT_ADMIN_PASSWORD } from "../config.js";
import { adminMiddleware } from "../midleware.js";

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

adminRouter.post("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;

  const { title, description, imageUrl, price } = req.body;

  const course = await courseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    creatorId: adminId,
  });

  res.json({
    message: "Course created",
    courseId:course._id,
  });
});

adminRouter.put("/course", adminMiddleware, async (req, res) => {
  const adminId = req.userId;
  const { title, description, imageUrl, price, courseId } = req.body;

  const result = await courseModel.findOneAndUpdate(
    { _id: courseId, creatorId: adminId },
    { title, description, imageUrl, price }
  );

  if (result.matchedCount === 0) {
    return res.status(403).json({
      message: "Course not found or you are not authorized to update it",
    });
  }

  res.json({
    message: "Course Updated",
    courseId,
  });
});


adminRouter.get("/course/bulk", adminMiddleware, async (req, res) => {
  const adminId = req.userId;

  const courses = await courseModel.find({
    creatorId: adminId,
  });

  if (courses.length === 0) {
    return res.status(403).json({
      message:"No courses found"
    });
  }

  res.json({
    message: "Course found",
    courses:courses
  });
});
