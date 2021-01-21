const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const ExpenseType = require('../models/ExpenseType');
const User = require('../models/User');

router.get('/expense', (req, res) => {
  const USER_ID = '5ff09e7bbe598c1c199cd9aa';

  Expense.aggregate([
    {
      $group: {
        _id: {
          year: {$year: '$created_at'},
          month: {$month: '$created_at'},
          day: {$dayOfMonth: '$created_at'},
        },

        result: {$push: '$$ROOT'},
      },
    },
  ])
    .then((result) => res.json(result.reverse()))
    .catch((error) => res.status(500).send(error));
});

router.get('/expense/:id', (req, res) => {
  Expense.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).send(error));
});

router.post('/expense', async (req, res) => {
  // Check income type is exist in the database
  const expenseTypeIsExist = await ExpenseType.findById(
    req.body.expense_type_id,
  );
  if (typeof expenseTypeIsExist !== 'object')
    return res.json({status: 400, message: 'Expense type is not exist'});

  // Check user is exist in the database
  const userIsExist = await User.findById(req.body.user_id);
  if (userIsExist === null) return res.status(400).send('User is not exist');

  const expense = new Expense(req.body);
  expense.created_at = Date.now();
  expense.expense_type_name = expenseTypeIsExist.title;

  expense
    .save()
    .then((result) => res.json(result))
    .catch((error) => res.status(500).send(error));
});

// router.put('/expense/:id', (req, res) => {
//   Expense.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => res.json({message: 'Expense successfully updated.'}))
//     .catch((error) => res.status(500).send(error));
// });

// router.delete('/expense/:id', (req, res) => {
//   Expense.findOneAndRemove({_id: req.params.id})
//     .then(() => res.json({message: 'Expense successfully deleted.'}))
//     .catch((error) => res.status(500).send(error));
// });

module.exports = router;
