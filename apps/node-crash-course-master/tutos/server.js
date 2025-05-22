const { log } = require("console");
const fs = require("fs");
const http = require("http");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  // lodash
  const num = _.random(0, 20);
  console.log(num);

  const great = _.once(() => {
    console.log("hello");
  });

  great();
  great();

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-me":
      res.statusCode = 301;
      res.setHeader("Location", "./about");
      break;
    default:
      path += "/404.html";
      res.statusCode = 404;
      break;
  }

  //set header content type
  res.setHeader("Content-Type", "text/html");
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.end(data);
    }
  });
});

server.listen(3031, "localhost", () => {
  console.log("listening to the requests on port 3031");
});
