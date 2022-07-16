const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Conexão com MongoDB
mongoose.connect(process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, error => {
    if (error) throw error;
    console.log('Banco de dados conectado!');
  });

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const cors = (req, res, next) => {
  const whitelist = [
      'http://localhost:8080',
      'http://localhost:4200',
  ];
  const origin = req.headers.origin;
  if (whitelist.indexOf(origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', '*');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'token,Content-Type,Authorization, x-access-token');
  next();
}
app.use(cors);

app.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
      error: {
          message: error.message
      }
  })
});

module.exports = app;