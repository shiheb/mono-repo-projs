const express = require("express");
const {
  validateRegistration,
  validateLogin,
} = require("../validation/validation");

const isEmpty = require("../utilities/util");
const messages = require("../utilities/messages");
const { postRegister, postLogin } = require("../services/userService");
const router = express.Router();

let session = require("express-session");
require("dotenv").config();

// use middleware to create express session
router.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
  })
);

router.get("/", (req, res) => {
  session = req.session;
  res.render("home", { pageName: "Home", session: session });
});

router.get("/about", (req, res) => {
  session = req.session;
  res.render("about", { pageName: "About", session: session });
});

router.get("/register", (req, res) => {
  res.render("register", { pageName: "Register" });
});

router.post("/register", (req, res) => {
  const errors = validateRegistration(req.body);
  // call the backend
  console.log({ errors });

  if (isEmpty(errors)) {
    postRegister(req.body)
      .then((result) => {
        res.render("login", {
          pageName: "Login",
          message: result.data.message,
        });
      })
      .catch((err) => {
        res.render("register", {
          pageName: "Registration",
          message: err.response.data.error.message,
        });
      });
  } else {
    res.render("register", {
      pageName: "Registration",
      body: req.body,
      errs: errors,
      message: messages.failed_register,
    });
  }
});

router.get("/login", (req, res) => {
  res.render("login", { pageName: "Login" });
});

router.post("/login", (req, res) => {
  session = req.session;
  const errors = validateLogin(req.body);

  if (isEmpty(errors)) {
    postLogin(req.body)
      .then((result) => {
        console.log(result.data);
        session.name = result.data.user.firstName;
        session.logged = result.data.logged;
        session.token = result.data.token;

        res.render("home", {
          pageName: "Home",
          message: result.data.message,
          session: session,
        });
      })
      .catch((err) => {
        res.render("login", {
          pageName: "Login",
          message: err.response.data.error.message,
        });
      });
  } else {
    res.render("login", {
      pageName: "Login",
      body: req.body,
      errs: errors,
      message: messages.failed_login,
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("home", { pageName: "Home" });
});

module.exports = router;
