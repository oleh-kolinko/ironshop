const mongoose = require('mongoose');//Global requirement ( find node modules)
const Schema = mongoose.Schema;
const Review = require('./review');//(Local)Connect review Schema to product

const productSchema = new Schema({
  name: String,
  price: Number,
  imageUrl: String,
  description: String,

  //The 'reviews' field is an array of objects
  //that follow the Review model's schema
  reviews: [Review.schema]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;//Export our model
