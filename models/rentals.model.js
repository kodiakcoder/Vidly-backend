const mongoose = require("mongoose");
const customerSchema = require("../models/customer.model");
const movieSchema = require("../models/movie.model");

const rentalSchema = mongoose.Schema({
  customer: customerSchema,
  movie: movieSchema,
  dateRented: new Date(),
});

const Rental = mongoose.model("Rental", rentalSchema);

module.exports = Rental;
