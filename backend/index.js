const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const cron = require('node-cron');

var app = express();

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Dotenv Integration
dotenv.config();

// Cors
app.use(cors({origin: true, credentials: true}));

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
var favorite = require('./routes/favorite');

// Using Routes
app.use('/api', user);
app.use('/api', income);
app.use('/api', incomeType);
app.use('/api', expense);
app.use('/api', expenseType);
app.use('/api', favorite);

app.get('/', (req, res) => {
  res.send('Backend çalışıyor.');
});

// cron.schedule('* * * * * *', function () {
//   console.log('running a task every 10 second');
// });

app.listen(process.env.PORT || 8080, function () {
  console.log(
    'Express server listening on port %d in %s mode',
    this.address().port,
    app.settings.env,
  );
});
