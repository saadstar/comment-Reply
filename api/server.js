const express = require("express");
const app = express();
const commentRouter = require("./routes/commentRoute");
const replyRouter = require("./routes/replyRoute");
const dotenv = require("dotenv").config();
const connectDB = require("./config/dbConnection");
const cors = require("cors");

const PORT = 3600 || process.env.PORT;

connectDB();
app.use(express.json());
app.use(cors());
app.use("/api/comment", commentRouter);
app.use("/api/reply", replyRouter);


app.listen((PORT), () => {
    console.log(`connected to server on ${PORT}`);
})