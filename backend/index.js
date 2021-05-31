const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const cron = require('node-cron');
const axios = require('axios');

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

const Favorite = require('./models/Favorite');
const Notification = require('./models/Notification');
cron.schedule('*/6 * * * * *', async function () {
  const USER_ID = '5ff09e7bbe598c1c199cd9aa';

  const favoriteCoins = await Favorite.find({user_id: USER_ID});

  const coinIds = [];
  favoriteCoins.map((coin) => coinIds.push(coin.coin_id));

  const coins = await axios.get(
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&ids=' +
      coinIds.join(),
  );

  favoriteCoins.map((favoriteCoin) => {
    selectedCoin = coins.data.find((coin) => favoriteCoin.coin_id == coin.id);

    let isAnyChange = false;
    let message;
    if (selectedCoin.current_price > favoriteCoin.max_price) {
      message =
        selectedCoin.name +
        ' belirlediğiniz maksimum tutardan daha fazla oldu.';
      isAnyChange = true;
    }

    if (selectedCoin.current_price < favoriteCoin.min_price) {
      message =
        selectedCoin.name + ' belirlediğiniz minimum tutardan daha az oldu. ';
      isAnyChange = true;
    }

    if (isAnyChange) {
      Notification.find({
        user_id: '5ff09e7bbe598c1c199cd9aa',
        coin_id: favoriteCoin.coin_id,
        created_at: {
          $gte: new Date().getMinutes() - 10,
        },
      }).then((res) => {
        if (res.length == 0) {
          const USER_ID = '5ff09e7bbe598c1c199cd9aa';

          const notification = new Notification({
            user_id: USER_ID,
            coin_id: favoriteCoin.coin_id,
            content: message,
            created_at: Date.now(),
          });

          notification
            .save()
            .then((result) => console.log(result))
            .catch((error) => console.log(error));
        }
      });
    }
  });
});

app.listen(process.env.PORT || 8080, function () {
  console.log(
    'Express server listening on port %d in %s mode',
    this.address().port,
    app.settings.env,
  );
});
