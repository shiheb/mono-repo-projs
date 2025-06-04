const { connect, disconnect, saveUser, findUser } = require("./db");
jest.mock("./db"); // Uses __mocks__/db.js automatically

const User = require("../models/userModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

beforeAll(async () => {
  await connect();
});

describe("User Test Suite", () => {
  test("Save a user with hashed password", async () => {
    const plainPassword = "AbcDef123";

    const newUser = {
      _id: new mongoose.Types.ObjectId(),
      firstName: "Chiheb",
      lastName: "Hmida",
      address: "Germany",
      city: "Berlin",
      state: "Berlin",
      zipCode: "12627",
      email: "chiheb.hmida@gmail.com",
      password: plainPassword,
    };

    const savedUser = await saveUser(newUser);

    expect(savedUser.firstName).toBe("Chiheb");
    expect(savedUser.lastName).toBe("Hmida");
    expect(savedUser.address).toBe("Germany");
    expect(savedUser.city).toBe("Berlin");
    expect(savedUser.state).toBe("Berlin");
    expect(savedUser.zipCode).toBe("12627");
    expect(savedUser.email).toBe("chiheb.hmida@gmail.com");
    expect(savedUser.password).not.toBe(plainPassword);

    const isMatch = await bcrypt.compare(plainPassword, savedUser.password);
    expect(isMatch).toBe(true);
  });

  test("Find a user by email", async () => {
    const searchObj = { email: "chiheb.hmida@gmail.com" };
    const user = await findUser(searchObj);

    expect(user).not.toBeNull();
    expect(user.firstName).toBe("Chiheb");
    expect(user.lastName).toBe("Hmida");
    expect(user.address).toBe("Germany");
    expect(user.city).toBe("Berlin");
    expect(user.state).toBe("Berlin");
    expect(user.zipCode).toBe("12627");
    expect(user.email).toBe("chiheb.hmida@gmail.com");
  });

  test("Reject saving user with invalid zip code", async () => {
    const newUser = {
      _id: new mongoose.Types.ObjectId(),
      firstName: "Test",
      lastName: "User",
      address: "Somewhere",
      city: "City",
      state: "State",
      zipCode: "invalid_zip",
      email: "test@example.com",
      password: "AbcDef123",
    };

    await expect(saveUser(newUser)).rejects.toThrow("Invalid zipCode");
  });

  test("Reject saving user with invalid firstName (non-alpha)", async () => {
    const newUser = {
      _id: new mongoose.Types.ObjectId(),
      firstName: "Chiheb123",
      lastName: "Hmida",
      address: "Germany",
      city: "Berlin",
      state: "Berlin",
      zipCode: "12627",
      email: "chiheb2@gmail.com",
      password: "AbcDef123",
    };

    await expect(saveUser(newUser)).rejects.toThrow("Invalid firstName");
  });

  test("Reject saving user with weak password", async () => {
    const newUser = {
      _id: new mongoose.Types.ObjectId(),
      firstName: "Chiheb",
      lastName: "Hmida",
      address: "Germany",
      city: "Berlin",
      state: "Berlin",
      zipCode: "12627",
      email: "chiheb3@gmail.com",
      password: "weak",
    };

    await expect(saveUser(newUser)).rejects.toThrow("Weak password");
  });
});

afterAll(async () => {
  await disconnect();
});
