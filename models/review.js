const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Review schema
const reviewSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tea: {
    type: Schema.Types.ObjectId,
    ref: 'Tea', // Reference to the Tea model
    required: true, // Ensure a review must be associated with a tea
  },
});

// Export the Review model
module.exports = mongoose.model('Review', reviewSchema);
