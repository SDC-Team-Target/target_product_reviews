const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productID: Number,
  categoryID: Number,
  itemName: String,
  averageStars: Number,
  totalStars: Number,
  totalReviews: Number,
  review : {
    type: Schema.Types.ObjectId,
    ref: "Review"
  }
})

const Product = mongoose.model('Product', productSchema);

module.exports = Product;