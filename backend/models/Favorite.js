const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FavoriteSchema = Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  coin_id: String,
  min_price: Number,
  max_price: Number,
});

module.exports = mongoose.model('Favorite', FavoriteSchema);
