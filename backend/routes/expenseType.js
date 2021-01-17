const express = require('express');
const router = express.Router();
const ExpenseType = require('../models/ExpenseType');

router.get('/expense-type', (req, res) => {
  ExpenseType.find({})
    .then((result) => res.json(result))
    .catch((error) => res.status(500).send(error));
});

router.get('/expense-type/:id', (req, res) => {
  ExpenseType.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).send(error));
});

router.post('/expense-type', (req, res) => {
  const expenseType = new ExpenseType(req.body);
  expenseType
    .save()
    .then((result) => res.json(result))
    .catch((error) => res.status(500).send(error));
});

// router.put('/expense-type/:id', (req, res) => {
//   ExpenseType.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => res.json({message: 'Expense type successfully updated.'}))
//     .catch((error) => res.status(500).send(error));
// });

// router.delete('/expense-type/:id', (req, res) => {
//   ExpenseType.findOneAndRemove({_id: req.params.id})
//     .then(() => res.json({message: 'Expense type successfully deleted.'}))
//     .catch((error) => res.status(500).send(error));
// });

module.exports = router;
