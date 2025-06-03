const { connect, disconnect, saveUser, findUser } = require("./db");

const User = require("../models/userModel");

const mongoose = require("mongoose");

jest.mock("./db");

beforeAll(async () => {
  return await connect();
});

describe("User Test Suite", () => {
  test("As a user I want to save a user to the database", async () => {
    const newUser = new User({
      _id: new mongoose.Types.ObjectId(),
      firstName: "Chiheb",
      lastName: "Hmida",
      address: "Germany",
      city: "Berlin",
      state: "Berlin",
      zipCode: "12627",
      email: "chiheb.hmida@gmail.com",
      password: "123",
    });
    const user = await saveUser(newUser);
    expect(user.firstName).toEqual("Chiheb");
    expect(user.lastName).toEqual("Hmida");
    expect(user.address).toEqual("Germany");
    expect(user.city).toEqual("Berlin");
    expect(user.state).toEqual("Berlin");
    expect(user.zipCode).toEqual("12627");
    expect(user.email).toEqual("chiheb.hmida@gmail.com");
    expect(user.password).toEqual("123");
  });

  test("As a user I want to find a user by any property ", async () => {
    const obj = { email: "chiheb.hmida@gmail.com" };

    await findUser(obj)
      .then((user) => {
        expect(user.firstName).toEqual("Chiheb");
        expect(user.lastName).toEqual("Hmida");
        expect(user.address).toEqual("Germany");
        expect(user.city).toEqual("Berlin");
        expect(user.state).toEqual("Berlin");
        expect(user.zipCode).toEqual("12627");
        expect(user.password).toEqual("123");
      })
      .catch((err) => {
        console.log("Error" + err.message);
      });
  });
});

afterAll(async () => {
  return await disconnect();
});
