const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  coin_id: String,
  content: String,
  created_at: {type: Schema.Types.Date},
});

module.exports = mongoose.model('Notification', NotificationSchema);
