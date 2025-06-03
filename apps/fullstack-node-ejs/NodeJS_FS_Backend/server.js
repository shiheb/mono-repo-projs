const http = require("http");
const app = require("./src/app");
require("dotenv").config();

http.createServer(app).listen(process.env.port, () => {
  console.log(`Server is running on port : ${process.env.port}`);
});
