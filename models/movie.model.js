const mongoose = require("mongoose");
const { genreSchema } = require("./genre.model");
const Joi = require("joi");

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 255,
  },
  genre: {
    type: genreSchema,
    required: true,
  },
  numberInStock: {
    type: Number,
    min: 0,
  },
  dailyRentalRate: {
    type: Number,
    min: 0,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

//TODO: Use JOI for validation

const validateMovie = (movie) => {
  const schema = {
    title: Joi.string().required(),
    genreId: Joi.string().required(),
    numberInStock: Joi.number().required(),
    dailyRentalRate: Joi.number().required(),
  };

  return Joi.valid(movie, schema);
};

module.exports = { Movie, validateMovie };
