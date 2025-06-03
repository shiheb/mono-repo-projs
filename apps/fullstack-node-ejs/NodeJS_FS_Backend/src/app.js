const express = require("express");
const cors = require("cors");
const bookRouter = require("./router/bookRouter");
const userRouter = require("./router/userRouter");
const { connect } = require("./db/db");
const app = express();

// use middleware to form our contract for incoming json payload ONLY!!
app.use(express.json());

// use middleware to url encoding
app.use(express.urlencoded({ extended: true }));

// use middleware to handle cors policy
app.use(cors());
// health point or actuator
//http: localhost:3001
app.get("/", (req, res, next) => {
  res.status(200).json({ Message: "Service is up" });
});

//routers
// app.use("/users", bookRouter);
app.use("/", userRouter);
// bad url or error we cqn handle with middleware

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: { message: error.message, status: error.status },
  });
});

connect();

module.exports = app;
