const sum = require("./sum");

describe("Math Module Tests", () => {
  test("As a user I want to sum 2 numbers", () => {
    expect(sum(3, 5)).toEqual(8);
  });
});
