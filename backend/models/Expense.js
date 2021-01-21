const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpenseSchema = Schema({
  expense_type_id: {type: Schema.Types.ObjectId, ref: 'ExpenseType'},
  expense_type_name: String,
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  value: String,
  content: String,
  created_at: {type: Schema.Types.Date},
});

module.exports = mongoose.model('Expense', ExpenseSchema);
