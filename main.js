const http = require('http');
const jsonData = require('./data').data;
const getUuid = require('./getUuid');
const htmlCode = require('./data').html;

const server = http.createServer((req, res) => {
  if (req.url === '/html') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlCode);
  } else if (req.url === '/json') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(jsonData));
  } else if (req.url === '/uuid') {
    const uuid = getUuid();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ uuid: uuid }));
  } else {
    const pathParams = req.url.split('/');
    if (pathParams[1] === 'status') {
      res.writeHead(Number(pathParams[2]), { 'Content-Type': 'text/plain' });
      res.end(`Ending the request with status ${pathParams[2]}`);
    }
    if (pathParams[1] === 'delay') {
      const delay = Number(pathParams[2]);
      setTimeout(async () => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Success after ${delay} seconds of delay`);
      }, delay * 1000);
    } else {
      res.end(`Invalid endpoint`);
    }
  }
});
server.listen('3000');
