require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//mongodb configs
mongoose.connect(process.env.DATABASE);
const db = mongoose.connection;
db.on("error", (err) => console.error(err));
db.once("open", () => console.log("database connected"));

//routes
const todosRouter = require("./routes/Todos");
app.use("/todos", todosRouter);

//port and listening
const port = process.env.PORT || 3030;
app.listen(port, () => console.log("server running"));
