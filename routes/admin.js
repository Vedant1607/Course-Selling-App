import { Router } from "express";
import { adminModel } from "../db";

export const adminRouter = Router();

adminRouter.post('/signup', (req, res) => {
    res.send({
        message:"signup endpoint",
    })
});

adminRouter.post('/signin', (req, res) => {
    res.send({
        message:"signin endpoint",
    })
});

adminRouter.post("/course", (req, res) => {
    res.json({
        message:"course endpoint"
    })
});

adminRouter.put('/course', (req, res) => {
    res.json({
        message:"course endpoint"
    })
});

adminRouter.get('course/bulk', (req, res) => {
    res.json({
        message:"course bulk endpoint"
    })
});