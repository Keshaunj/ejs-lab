const mongoose = require('mongoose');
//change info later
const ratingSchema = new mongoose.Schema({

  name: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  category: { type: String, required: true },
  details: { type: String, required: true },
});

const Rating = mongoose.model("Rating", ratingSchema);