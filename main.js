const express = require('express');
const app = express();
const jsonData = require('./data').data;
const getUuid = require('./getUuid');

//Handling /html endpoint
app.get('/html', (req, res) => {
  res.set({ 'Content-Type': 'text/html' });
  res.sendFile(`${__dirname}/index.html`);
});

//Handling  /json endpoint
app.get('/json', (req, res) => {
  res.set({ 'Content-Type': 'application/json' });
  res.json(jsonData);
});

// Handling /uuid endpoint
app.get('/uuid', (req, res) => {
  res.set({ 'Content-Type': 'application/json' });
  res.json({ uuid: getUuid() });
});

// Handling /status/{status_code} endpoints;
app.get('/status/:status_code', (req, res) => {
  const status_code = Number(req.params.status_code);
  res.sendStatus(status_code);
});

//Handling /delay/{delay_in_seconds} endpoint
app.get('/delay/:delay_in_seconds', (req, res) => {
  const delay_in_seconds = req.params.delay_in_seconds;
  setTimeout(() => {
    res.set({ 'Content-Type': 'text/plain' });
    res.send(`Ending request after ${delay_in_seconds}`);
  }, delay_in_seconds * 1000);
});

app.listen(3000, (error) => {
  if (error) {
    console.log(`Error starting the server: ${error}`);
  } else {
    console.log(`Listening on port 3000`);
  }
});
