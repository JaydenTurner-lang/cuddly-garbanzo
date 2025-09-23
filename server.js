const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url);
  let pathname = parsed.pathname;               // e.g. /plain.txt or /image5.jpg
  if (pathname === '/') pathname = '/plain.txt'; // default if no file given
  const filepath = '.' + pathname;

  fs.readFile(filepath, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404: File not found\n');
      return;
    }

    // Set Content-Type based on extension
    const ext = path.extname(filepath).toLowerCase();
    let type = 'text/plain';
    if (ext === '.jpg' || ext === '.jpeg') type = 'image/jpeg';

    res.writeHead(200, {'Content-Type': type});
    res.end(data);   // send file bytes directly
  });
});

server.listen(80, () => {
  console.log('Server listening on port 80');
});

