const express = require('express');
const router = express.Router();
const Income = require('../models/Income');
const IncomeType = require('../models/IncomeType');
const User = require('../models/User');

router.get('/income', (req, res) => {
  Income.find({})
    .then((result) => res.json(result))
    .catch((error) => res.status(500).send(error));
});

router.get('/income/:id', (req, res) => {
  Income.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).send(error));
});

router.post('/income', async (req, res) => {
  // Check income type is exist in the database
  const incomeTypeIsExist = await IncomeType.findById(req.body.income_type_id);
  if (incomeTypeIsExist !== null)
    return res.status(400).send('Income type is not exist');

  // Check user is exist in the database
  const userIsExist = await User.findById(req.body.user_id);
  if (userIsExist === null) return res.status(400).send('User is not exist');

  const income = new Income(req.body);
  income.created_at = Date.now();

  income
    .save()
    .then((result) => res.json(result))
    .catch((error) => res.status(500).send(error));
});

// router.put('/income/:id', (req, res) => {
//   Income.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => res.json({message: 'Income successfully updated.'}))
//     .catch((error) => res.status(500).send(error));
// });

// router.delete('/income/:id', (req, res) => {
//   Income.findOneAndRemove({_id: req.params.id})
//     .then(() => res.json({message: 'Income successfully deleted.'}))
//     .catch((error) => res.status(500).send(error));
// });

module.exports = router;
