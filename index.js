import express from 'express';
import createUserRoutes from './routes/user';
import createCourseRoutes from './routes/course';

const app = express();

app.use("/user", userRouter);
app.use("/course", courseRouter);

app.listen(3000, () => {
    console.log("App is running");
})