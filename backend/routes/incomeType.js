const express = require('express');
const router = express.Router();
const IncomeType = require('../models/IncomeType');

router.get('/income-type', (req, res) => {
  IncomeType.find({})
    .then((result) => res.json(result))
    .catch((error) => res.status(500).send(error));
});

router.get('/income-type/:id', (req, res) => {
  IncomeType.findById(req.params.id)
    .then((result) => res.json(result))
    .catch((error) => res.status(500).send(error));
});

router.post('/income-type', (req, res) => {
  const incomeType = new IncomeType(req.body);
  incomeType
    .save()
    .then((result) => res.json(result))
    .catch((error) => res.status(500).send(error));
});

// router.put('/income-type/:id', (req, res) => {
//   IncomeType.findByIdAndUpdate(req.params.id, req.body)
//     .then(() => res.json({message: 'IncomeType successfully updated.'}))
//     .catch((error) => res.status(500).send(error));
// });

// router.delete('/income-type/:id', (req, res) => {
//   IncomeType.findOneAndRemove({_id: req.params.id})
//     .then(() => res.json({message: 'IncomeType successfully deleted.'}))
//     .catch((error) => res.status(500).send(error));
// });

module.exports = router;
