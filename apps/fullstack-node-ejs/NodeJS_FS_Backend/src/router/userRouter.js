const express = require("express");
const { registerUser, loginUser } = require("../services/userService");
const rateLimit = require("express-rate-limit");
const router = express.Router();

const authLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 5,
    message: "Too many attempts, please try again after 10 minutes.",
    standardHeaders: true,
    legacyHeaders: false,
});


router.post("/register", authLimiter, registerUser);

router.post("/login", authLimiter, loginUser);

module.exports = router;
