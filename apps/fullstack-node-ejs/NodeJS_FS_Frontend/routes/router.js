const express = require("express");
const {
  validateRegistration,
  validateLogin,
} = require("../validation/validation");

const isEmpty = require("../utilities/util");
const messages = require("../utilities/messages");
const { postRegister, postLogin } = require("../services/userService");
const session = require("express-session");
const csrf = require("csurf");
require("dotenv").config();

const router = express.Router();

// Configure session middleware with secure cookies
router.use(
  session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      httpOnly: true, // Prevent JS access to cookie
      sameSite: "lax", // Helps mitigate CSRF attacks
    },
  })
);

// CSRF protection middleware
const csrfProtection = csrf();
router.use(csrfProtection);

// Middleware to pass csrfToken to all views
router.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});

router.get("/", (req, res) => {
  res.render("home", { pageName: "Home", session: req.session });
});

router.get("/about", (req, res) => {
  res.render("about", { pageName: "About", session: req.session });
});

router.get("/register", (req, res) => {
  res.render("register", { pageName: "Register" });
});

router.post("/register", (req, res) => {
  const errors = validateRegistration(req.body);
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
  const errors = validateLogin(req.body);

  if (isEmpty(errors)) {
    postLogin(req.body)
      .then((result) => {
        const session = req.session;
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
  req.session.destroy(() => {
    res.render("home", { pageName: "Home" });
  });
});

module.exports = router;
