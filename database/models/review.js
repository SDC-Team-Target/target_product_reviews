const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  reviewID: Number,
  customerName: String,
  reviewTitle: String,
  reviewText: String,
  rating: Number,
  productID: Number,
  date: Date
})

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;