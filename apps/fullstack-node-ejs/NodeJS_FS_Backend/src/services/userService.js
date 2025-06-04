const { saveUser, findUser } = require("../db/db");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const errorTemplate = require("../templates/errorTemplate");
const jwt = require("jsonwebtoken");
const validator = require("validator");

require("dotenv").config();

const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // adjust as needed
  );
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate presence
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // Validate format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const user = await findUser({ email });

    // Sanitize generic response for login failure
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }


    const token = generateToken(user._id);

    const { password: _, ...userWithoutPassword } = user.toObject();

    return res.status(200).json({
      message: "Login successful",
      logged: true,
      token,
      user: userWithoutPassword,
    });
  } catch (err) {
    return errorTemplate(res, err, "Server error during login");
  }
};

const registerUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      email,
      password,
    } = req.body;

    // Check presence of all fields
    if (
      !firstName ||
      !lastName ||
      !address ||
      !city ||
      !state ||
      !zipCode ||
      !email ||
      !password
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate name, city, state
    if (!validator.isAlpha(firstName, "en-US", { ignore: " -" })) {
      return res.status(400).json({ message: "Invalid first name" });
    }

    if (!validator.isAlpha(lastName, "en-US", { ignore: " -" })) {
      return res.status(400).json({ message: "Invalid last name" });
    }

    if (!validator.isLength(address, { min: 5 })) {
      return res.status(400).json({ message: "Invalid address" });
    }

    if (!validator.isAlpha(city, "en-US", { ignore: " -" })) {
      return res.status(400).json({ message: "Invalid city" });
    }

    if (!validator.isAlpha(state, "en-US", { ignore: " -" })) {
      return res.status(400).json({ message: "Invalid state" });
    }

    if (!validator.isPostalCode(zipCode, "any")) {
      return res.status(400).json({ message: "Invalid ZIP code" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    // Enhanced password policy
    const passwordPolicy = {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0, // Change to 1 if symbols are required
    };

    if (!validator.isStrongPassword(password, passwordPolicy)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters and include at least 1 uppercase letter, 1 lowercase letter, and 1 number",
      });
    }

    const existingUser = await findUser({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      email,
      password: hashedPassword,
    });

    const savedUser = await saveUser(newUser);
    const { password: _, ...userWithoutPassword } = savedUser.toObject();

    return res.status(201).json({
      message: "Registration successful",
      user: userWithoutPassword,
    });
  } catch (err) {
    return errorTemplate(res, err, "Server error during registration");
  }
};

module.exports = { loginUser, registerUser };
