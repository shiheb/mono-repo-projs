const { saveUser, findUser } = require("../db/db");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const errorTemplate = require("../templates/errorTemplate");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const loginUser = async (req, res, next) => {
  try {
    const loggedUser = await findUser({ email: req.body.email });

    if (!loggedUser)
      throw new Error("Authentication failed: unable to find user");
    else {
      // use bcrypt to compare passwords
      const result = await bcrypt.compare(
        req.body.password,
        loggedUser.password
      );
      if (result) {
        // create a JSON Web Token
        loggedUser.password = null;
        const token = jwt.sign({ user: loggedUser }, process.env.jwt_secret);
        return res.status(201).json({
          user: loggedUser,
          logged: true,
          token,
          message: "Login Successful",
        });
      } else {
        // return response authentication failed
        throw new Error(
          "Authentication failed: Email or password does not match"
        );
      }
    }
  } catch (e) {
    return errorTemplate(res, e, e.message);
  }
};

const registerUser = async (req, res, next) => {


  try {
    const user = await findUser({ email: req.body.email });
    if (user) {
      throw new Error("User exists, try logging in");
    } else {
      // map res.body to User model
      const user = new User();
      const newUser = Object.assign(user, req.body);
      user._id = new mongoose.Types.ObjectId();
      //encrypt password
      const hash = await bcrypt.hash(newUser.password, 10);

      newUser.password = hash;
      const savedUser = await saveUser(newUser);

      return res.status(201).json({
        message: "Successful Registration",
        user: savedUser,
      });
    }
  } catch (e) {
    return errorTemplate(res, e, e.message);
  }
};

module.exports = { loginUser, registerUser };
