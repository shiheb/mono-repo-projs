const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,

  firstName: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value) => validator.isAlpha(value, "en-US", { ignore: " " }),
      message: "First name must contain only letters",
    },
  },

  lastName: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value) => validator.isAlpha(value, "en-US", { ignore: " " }),
      message: "Last name must contain only letters",
    },
  },

  address: {
    type: String,
    required: true,
    trim: true,
  },

  city: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value) => validator.isAlpha(value, "en-US", { ignore: " " }),
      message: "City must contain only letters",
    },
  },

  state: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value) => validator.isAlpha(value, "en-US", { ignore: " " }),
      message: "State must contain only letters",
    },
  },

  zipCode: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value) => validator.isPostalCode(value, "any"),
      message: "Invalid postal code",
    },
  },

  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email address",
    },
  },

  password: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: (value) =>
        validator.isStrongPassword(value, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 0, // symbols optional
        }),
      message:
        "Password must be at least 8 characters long and include uppercase, lowercase letters, and a number.",
    },
  },
});

module.exports = mongoose.model("User", userSchema);
