const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IncomeTypeSchema = Schema({
  title: String,
});

module.exports = mongoose.model('income_type', IncomeTypeSchema);
