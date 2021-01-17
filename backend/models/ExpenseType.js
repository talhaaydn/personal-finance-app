const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseTypeSchema = Schema({
  title: String,
});

module.exports = mongoose.model('expense_type', ExpenseTypeSchema);
