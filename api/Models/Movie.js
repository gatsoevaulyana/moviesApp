const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    id: Number,
    title: String,
    year: Number,
    format: String,
    stars: String,
    picture: String

});

module.exports = mongoose.model('Movie', MovieSchema);