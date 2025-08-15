import express from 'express';


const app = express();

app.post('/user/signup', (req, res) => {
    res.send({
        message:"signup endpoint"
    })
})

app.post('/user/signin', (req, res) => {
    res.json({
        message:"signin endpoint",
    })
})

app.get("/user/purchases", (req, res) => {
    res.json({
        message:"purchases endpoint",
    })
})

app.post("/course/purchase", (req, res) => {
    res.json({
        message:"course purchase endpoint",
    })
})

app.get("/courses", (req, res) => {
    res.json({
        message:"courses endpoint"
    })
})

app.listen(3000, () => {
    console.log("App is running");
})