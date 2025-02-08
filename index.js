const express = require("express");
const {connectDB} = require("./dbConfig")
const {noteRouter} = require("./routes/note.routes")
const {userRouter} = require("./routes/user.routes")
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow specific headers
}))


app.use("/users", userRouter)
app.use("/notes", noteRouter)


app.listen(8080, ()=>{
    connectDB()
    console.log("Server is running at http://localhost:8080");
})
