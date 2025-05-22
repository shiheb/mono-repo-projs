const { log } = require("console");
const fs = require("fs");

// reading files
// fs.readFile("./docs/blog1.txt", (err, data) => {
//   if (err) console.log(err);
//   console.log(data);
//   console.log(data.toString());
// });

// console.log("last line");
// writing files
// fs.writeFile("./docs/blog1.txt", "hollo, world", () =>
//   console.log("file was written")
// );
// fs.writeFile("./docs/blog2.txt", "hollo, again", () =>
//   console.log("file was written")
// );
// directories
// if (!fs.existsSync("./assets")) {
//   fs.mkdir("./assets", (err) => {
//     if (err) console.log(err);
//     console.log("folder is created");
//   });
// } else {
//   fs.rmdir("./assets", (err) => {
//     if (err) console.log(err);
//     console.log("folder is deleted");
//   });
// }

// deleting files
// if (fs.existsSync("./docs/deleteme.txt")) {
//   fs.unlink("./docs/deleteme.txt", (err) => {
//     if (err) console.log(err);
//     console.log("file is deleted");
//   });
// }
