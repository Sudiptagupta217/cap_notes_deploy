const express = require("express");
const {connectDB} = require("./dbConfig")
const {noteRouter} = require("./routes/note.routes")
const {userRouter} = require("./routes/user.routes")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",  // Allow requests from your React frontend
    credentials: true,  // Allow cookies & authorization headers
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed request types
    allowedHeaders: ["Content-Type", "Authorization"]  // Explicitly allow headers
}));


app.use("/users", userRouter)
app.use("/notes", noteRouter)


app.listen(8080, ()=>{
    connectDB()
    console.log("Server is running at http://localhost:8080");
})
