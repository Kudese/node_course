const express = require('express');
const cors = require('cors');

// init express application
const app = express();

// use cors middleware
app.use(cors());

// parse request body
app.use(express.json());

// our custom middleware
app.use((req, res, next) => {
  console.log('Hi, I am middleware!!');

  req.time = new Date();

  next();
});

// send html
app.get('/api/v1/html', (req, res) => {
  res.send('<h1>Home page!!!</h1>');
});

// send json
app.get('/api/v1/json', (req, res) => {
  // console.log('||=============>>>>>>>>>>>');
  // console.log(req.time);
  // console.log('<<<<<<<<<<<=============||');

  res.status(200).json({
    id: 1234,
    msg: 'Hi there!',
    time: req.time,
  });
});

// POST example
app.post('/api/v1/json', (req, res) => {
  console.log(req.body);

  res.status(200).json({
    id: 1234,
    msg: 'Hi there!',
  });
});

// not found example
app.get('*', (req, res) => {
  res.send('<p>Not found!</p>');
});

// set application running PORT
const port = 3000;

// launch server
app.listen(port, () => {
  console.log(`Application up and running on port ${port}`);
});
