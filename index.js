const express = require("express");
const {connectDB} = require("./dbConfig")
const {noteRouter} = require("./routes/note.routes")
const {userRouter} = require("./routes/user.routes")
const cors = require("cors")

const app = express()

// app.use(cors({
//     origin: 'http://localhost:5173', // Allow specific origin
//     methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
//    // allowedHeaders: ['Content-Type', 'Authorization'], // Allow specific headers
//     credentials: true // Allow credentials
// }))
// app.options("*", cors());

app.use(cors({
    origin: "*",   // Allow any origin (debugging mode)
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));



app.use(express.json())

app.use("/users", userRouter)
app.use("/notes", noteRouter)


app.listen(8080, ()=>{
    connectDB()
    console.log("Server is running at http://localhost:8080");
})
