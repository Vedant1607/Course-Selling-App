import mongoose, { Schema } from "mongoose";

// USER
const userSchema = new Schema({
  email: { type: String, unique: true, required:true },
  password: {type:String, required:true},
  firstName: String,
  lastName: String,
});

// ADMIN
const adminSchema = new Schema({
  email: { type: String, unique: true, required: true },
  password: {type:String, required:true},
  firstName: String,
  lastName: String,
});

// COURSE
const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: { type: Schema.Types.ObjectId, ref: "admin" },
});

// PURCHASE
const purchaseSchema = new Schema({
  courseId: { type: Schema.Types.ObjectId, ref: "course" },
  userId: { type: Schema.Types.ObjectId, ref: "user" },
});

export const userModel = mongoose.model("user", userSchema);
export const adminModel = mongoose.model("admin", adminSchema);
export const courseModel = mongoose.model("course", courseSchema);
export const purchaseModel = mongoose.model("purchase", purchaseSchema);
