import { Router } from 'express';
import { courseModel, purchaseModel, userModel } from '../db.js';
import jwt from 'jsonwebtoken';
import { JWT_USER_PASSWORD } from '../config.js';
import { userMiddleware } from '../middleware/user.js';

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

userRouter.post("/signin", async (req, res) => {

  // TODO: ideally password should be hashed, and hence you can't compare the user provided password and the database password
  const { email, password } = req.body;

  const user = await userModel.findOne({
    email:email,
    password:password,
  });

  if (user) {
    const token = jwt.sign({
      id:user._id,
    }, JWT_USER_PASSWORD)

    res.json({
      token:token,
    })
  } else {
    res.status(403).json({
      message:"Incorrect credentials",
    })
  }
});

userRouter.get("/purchases", userMiddleware, async (req, res) => {
  const userId = req.userId;

  // check if user has purchases the course
  const purchases = await purchaseModel.find({
    userId
  });

  const courseData = await courseModel.find({
    _id:{$in:purchases.map(x => x.courseId)}
  })

  res.json({
    purchases,
    courseData
  });
});
