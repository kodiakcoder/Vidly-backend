const mongoose = require("mongoose");
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const Genre = mongoose.model("Genre", genreSchema);

const validateGenre = (genre) => {
  const schema = {
    name: Joi.string().required(),
  };
  return Joi.validate(genre, schema);
};

module.exports = { Genre, genreSchema, validateGenre };
