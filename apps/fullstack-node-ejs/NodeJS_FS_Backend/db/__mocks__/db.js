const connect = async () => {
  console.log("MongoDB mocked connection");
};
const disconnect = async () => {
  console.log("Mocked Disconnection");
};
const findUser = async (obj) => {
  return Promise.resolve({
    firstName: "Chiheb",
    lastName: "Hmida",
    address: "Germany",
    city: "Berlin",
    state: "Berlin",
    zipCode: "12627",
    email: "chiheb.hmida@gmail.com",
    password: "123",
  });
};
const saveUser = async (newUser) => {
  return Promise.resolve({
    firstName: "Chiheb",
    lastName: "Hmida",
    address: "Germany",
    city: "Berlin",
    state: "Berlin",
    zipCode: "12627",
    email: "chiheb.hmida@gmail.com",
    password: "123",
  });
};
module.exports = { connect, disconnect, findUser, saveUser };
