const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SavingMoneySchema = Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  goal_value: String,
  saved_money_value: String,
});

module.exports = mongoose.model('saving_money', SavingMoneySchema);
