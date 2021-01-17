const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const ExpenseType = require('../models/ExpenseType');
const User = require('../models/User');

router.get('/expense', (req, res) => {
  Expense.find({})
    .then((result) => res.json(result))
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
    req.body.income_type_id,
  );
  if (expenseTypeIsExist !== null)
    return res.status(400).send('Expense type is not exist');

  // Check user is exist in the database
  const userIsExist = await User.findById(req.body.user_id);
  if (userIsExist === null) return res.status(400).send('User is not exist');

  const expense = new Expense(req.body);
  expense.created_at = Date.now();

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
