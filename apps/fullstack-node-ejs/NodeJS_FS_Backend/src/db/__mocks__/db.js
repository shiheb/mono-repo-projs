const bcrypt = require("bcrypt");

const connect = async () => {
  console.log("MongoDB mocked connection");
};

const disconnect = async () => {
  console.log("Mocked Disconnection");
};

// Simple validators simulating your real model's rules:
const isValidZipCode = (zip) => /^\d{5}$/.test(zip);
const isAlpha = (str) => /^[A-Za-z]+$/.test(str);
const isStrongPassword = (pwd) => pwd.length >= 8 && /\d/.test(pwd) && /[A-Z]/.test(pwd);

const findUser = async (obj) => {
  // Always return a valid mock user for the test email
  if (obj.email === "chiheb.hmida@gmail.com") {
    return Promise.resolve({
      firstName: "Chiheb",
      lastName: "Hmida",
      address: "Germany",
      city: "Berlin",
      state: "Berlin",
      zipCode: "12627",
      email: "chiheb.hmida@gmail.com",
      password: await bcrypt.hash("AbcDef123", 10),
    });
  }
  // No user found
  return Promise.resolve(null);
};

const saveUser = async (newUser) => {
  // Validate firstName
  if (!isAlpha(newUser.firstName)) {
    throw new Error("Invalid firstName: must contain only letters");
  }

  // Validate zipCode
  if (!isValidZipCode(newUser.zipCode)) {
    throw new Error("Invalid zipCode: must be 5 digits");
  }

  // Validate password strength
  if (!isStrongPassword(newUser.password)) {
    throw new Error("Weak password");
  }

  // Simulate hashing password like Mongoose pre-save hook
  const hashedPassword = await bcrypt.hash(newUser.password, 10);

  return Promise.resolve({
    ...newUser,
    password: hashedPassword,
  });
};

module.exports = { connect, disconnect, findUser, saveUser };
