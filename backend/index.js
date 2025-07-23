const express = require("express")
const {app, server} = require("./socket/socket")
require("dotenv").config();
const cors = require("cors")
const cookie = require("cookie-parser")
const connectDb = require("./config/db")
const AuthRoute = require("./routes/auth.route")
const userRoute = require("./routes/user.routes")
const messageRoute = require("./routes/message.routes")

app.use(express.json())
app.use(cookie())
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));


const port = process.env.PORT || 8000


app.use("/api/auth", AuthRoute)
app.use("/api/users",userRoute)
app.use("/api/message",messageRoute)

server.listen(port,()=>{
    connectDb();
    console.log(`port is running on http://localhost:${port}`)
})