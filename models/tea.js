const mongoose = require('mongoose');

const teaSchema = new mongoose.Schema({
  name: String,
  price: Number,
  rating: Number,
  category: String,
  details: String
});

module.exports = mongoose.model('Tea', teaSchema);
``