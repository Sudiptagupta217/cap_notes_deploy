const express = require("express");
const cors = require("cors");
const { connectDB } = require("./dbConfig");
const { noteRouter } = require("./routes/note.routes");
const { userRouter } = require("./routes/user.routes");

const app = express();

// app.use(cors({
//     origin: "http://localhost:5173",  // Update this line to allow requests from your frontend origin
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"]
// }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  

app.use(express.json());

app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.listen(8080, () => {
    connectDB();
    console.log("Server is running at http://localhost:8080");
});
