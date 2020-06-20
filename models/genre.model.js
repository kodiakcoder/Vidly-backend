const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
  genre: {
    type: String,
    required: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

module.exports = Genre;
