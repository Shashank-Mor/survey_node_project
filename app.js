const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/api/questions", require("./routes/questionsRoutes"));
app.use(errorHandler);

module.exports = {app};