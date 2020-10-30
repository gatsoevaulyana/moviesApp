const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookSchema = new Schema({
  id: Number,
  title: String,
  year: Number,
  format: String,
  stars: String,
  picture: {
    type: String,
    default: 'https://i.ytimg.com/vi/g2vKr_1D-J8/maxresdefault.jpg'
  }
});

module.exports = mongoose.model('Book', BookSchema);