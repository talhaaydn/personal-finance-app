const router = require('express').Router();
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Expense = require('../models/Expense');
const Income = require('../models/Income');
const Notification = require('../models/Notification');

router.get('/user', (req, res) => {
  User.find({})
    .then((result) => res.json(result))
    .catch((error) => res.status(500).send(error));
});

// router.get('/user/notification', (req, res) => {
//   const notifications = Notification.find({
//     created_at: {
//       $gte: new Date().getMinutes() - 30,
//     },
//   })
//     .then((result) => console.log(result))
//     .catch((error) => res.status(500).send(error));
// });

router.get('/user/expense-income', async (req, res) => {
  const USER_ID = '5ff09e7bbe598c1c199cd9aa';

  const expenses = await Expense.find({user_id: USER_ID});
  const incomes = await Income.find({user_id: USER_ID});

  var expensesSum = 0;
  expenses.forEach((expense) => (expensesSum += Number(expense.value)));

  var incomesSum = 0;
  incomes.forEach((income) => (incomesSum += Number(income.value)));

  var total = incomesSum - expensesSum;

  return res.json({incomesSum, expensesSum, total});
});

router.post('/user/register', async (req, res) => {
  // Check email is already exist in the database
  const emailIsExist = await User.findOne({where: {email: req.body.email}});
  if (emailIsExist) return res.status(400).send('Email already exist');

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = {
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  };

  try {
    const newUser = await User.create(user);
    res
      .status(200)
      .send({user: newUser.id, message: 'User successfully created.'});
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
