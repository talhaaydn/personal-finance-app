const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

var app = express();

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Dotenv Integration
dotenv.config();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS',
  );
  next();
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0-fifhc.mongodb.net/${process.env.MONGODB_NAME}?retryWrites=true&w=majority`,
    {useNewUrlParser: true, useUnifiedTopology: true},
  )
  .then(() => console.log('MongoDB is working ...'))
  .catch(() => console.log('Error: MongoDB is not working !!!'));

// Routes
var user = require('./routes/user');
var income = require('./routes/income');
var incomeType = require('./routes/incomeType');
var expense = require('./routes/expense');
var expenseType = require('./routes/expenseType');

// Using Routes
app.use('/api', user);
app.use('/api', income);
app.use('/api', incomeType);
app.use('/api', expense);
app.use('/api', expenseType);

app.listen(8080, () => {
  console.log(`Server listening on http://localhost:8080`);
});
