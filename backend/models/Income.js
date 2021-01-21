const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IncomeSchema = Schema({
  income_type_id: {type: Schema.Types.ObjectId, ref: 'IncomeType'},
  income_type_name: String,
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  value: Number,
  content: String,
  created_at: {type: Schema.Types.Date},
});

module.exports = mongoose.model('Income', IncomeSchema);
