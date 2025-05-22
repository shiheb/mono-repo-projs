const path = require('path');
const fs = require('fs');
const http = require('http');
const _ = require('lodash');

const server = http.createServer((req, res) => {
  // lodash
  const num = _.random(0, 20);
  console.log(num);

  const great = _.once(() => {
    console.log('hello');
  });

  great();
  great();

  const baseDir = path.resolve(__dirname, 'views'); // Ensures absolute path
  const allowedFiles = {
    '/': 'index.html',
    '/about': 'about.html',
    '/about-me': 'about.html', // Redirect handled later
    404: '404.html', // Fallback
  };

  // Determine the correct filename
  let filePath = allowedFiles[req.url] || allowedFiles['404'];
  res.statusCode = req.url in allowedFiles ? 200 : 404;

  // Handle redirects (e.g., /about-me → /about)
  if (req.url === '/about-me') {
    res.statusCode = 301;
    res.setHeader('Location', '/about');
    return res.end();
  }

  // Construct full path SAFELY using path.resolve()
  const fullPath = path.resolve(baseDir, filePath);

  // Verify the path is inside baseDir (prevent path traversal)
  if (!fullPath.startsWith(baseDir)) {
    res.statusCode = 400;
    return res.end('Bad request');
  }

  // Read the file (now with a validated and resolved path)
  res.setHeader('Content-Type', 'text/html');

  // eslint-disable-next-line security/detect-non-literal-fs-filename
  fs.readFile(fullPath, (err, data) => {
    if (err) {
      console.error(err);
      res.statusCode = 500;
      res.end('Server error');
    } else {
      res.end(data);
    }
  });
});

server.listen(3031, 'localhost', () => {
  console.log('listening to the requests on port 3031');
});
