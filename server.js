const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
const port = process.env.PORT;

mongoose.connect(uri, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", () => {
    console.log("MongoDB database connection established successfully!");
});

const todoRouter = require("./routes/todos");
app.use("/todos", todoRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});