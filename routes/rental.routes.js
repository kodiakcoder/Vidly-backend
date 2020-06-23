const express = require("express");
const router = express.Router();
const { Rental, validateRental } = require("../models/rentals.model");
const { Customer } = require("../models/customer.model");
const { Movie } = require("../models/movie.model");

//Get All Rentals
router.get("/", async (req, res) => {
  const result = await Rental.find({}).populate("customer movie");
  res.send(result);
});

//Get Rental By Specific Rental ID
router.get("/:id"),
  async (req, res) => {
    const result = await Rental.findById(req.params.id);
    if (!result) return res.status(404).send("No rental by that id found");
    res.send(result);
  };

//Post A New Rental
router.post("/", async (req, res) => {
  const validate = validateRental(req.body);
  if (validate.error) return res.status(400).send(validate.error.message);

  const rentalData = req.body;
  console.log(rentalData);
  const customer = await Customer.findById({ _id: rentalData.customerId });
  if (!customer) return res.status(404).send("No Customer by that id found");
  console.log("Customer is: ", customer._id);
  const movie = await Movie.findById({ _id: rentalData.movieId });
  if (!movie) return res.status(404).send("No movie by that id found");
  console.log("Movie is: ", movie._id);
  if (movie.numberInStock === 0)
    return res.status(400).send("Movie is out of stock");

  const newRental = new Rental({
    customer: customer._id,
    movie: movie._id,
  });

  const result = await newRental.save();

  movie.numberInStock--;
  await movie.save();

  res.send(result);
});

module.exports = router;
