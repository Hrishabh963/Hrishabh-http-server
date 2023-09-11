const http = require('http');
const jsonData = require('./data').data;
const getUuid = require('./getUuid');
const htmlCode = require('./data').html;

const server = http.createServer((req, res) => {
  if (req.url === '/html') {
    //Serving html data by writing content type as html
    res.writeHead({ status: 200 }, { 'Content-Type': 'text/html' });
    res.end(htmlCode);
  } else if (req.url === '/json') {
    //Serving a json file  by setting content-type header as json
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(jsonData));
  } else if (req.url === '/uuid') {
    //sending a unique uuid generated based on current time each time a user hits '/uuid'
    const uuid = getUuid();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ uuid: uuid }));
  } else {
    //Using split method to split the url string to extract full path params
    const pathParams = req.url.split('/');
    if (pathParams[1] === 'status') {
      //Setting the status code to the given code passed as /status/{status_code}
      res.writeHead(Number(pathParams[2]), { 'Content-Type': 'text/plain' });
    }
    if (pathParams[1] === 'delay') {
      //Sending a success response after n seconds of delay passed as /delay/{delay_in_seconds}
      const delay = Number(pathParams[2]);
      setTimeout(() => {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`Success after ${delay} seconds of delay`);
      }, delay * 1000);
    }
  }
});
server.listen('3000');
