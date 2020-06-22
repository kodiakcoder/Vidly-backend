const express = require("express");
const router = express.Router();
const { Movie, validateMovie } = require("../models/movie.model");
const Genre = require("../models/genre.model");

//Route to get all movie documents
router.get("/", async (req, res) => {
  const result = await Movie.find({});
  res.send(result);
});

//Route to get a specific movie document
router.get("/:id", async (req, res) => {
  const result = await Movie.findById({ _id: req.params.id });
  if (!result) return res.status(404).send("Movie by that id doesnt exist");
  res.send(result);
});

//Route to Add a movie document
router.post("/", async (req, res) => {
  //TODO:Perform validation on movie object
  const validate = validateMovie(req.params.body);
  if (validate.error) return res.status(400).send(validate.error.message);
  const movie = req.params.body;
  const genre = await Genre.findById({ _id: movie.genreID });
  if (!genre) return res.status(404).send("Genre by that id Not Found");

  const newMovie = new Movie({
    title: movie.title,
    genre: {
      _id: genre._id,
      genre: genre.genre,
    },
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
  });

  const result = await newMovie.save();
  res.send(result);
});

//Route to update a movie document
router.put("/", async (req, res) => {
  const validate = validateMovie(req.params.body);
  if (validate.error) return res.status(400).send(validate.error.message);
  const movie = req.params.body;
  const oldMovie = await Movie.findById({ _id: req.params.id });
  if (!oldMovie) return res.status(404).send("Movie by that id doesnt exist");
  const genre = await Genre.findById({ _id: movie.genreID });
  if (!genre) return res.status(404).send("Genre by  that id doesnt exist");

  oldMovie.title = movie.title;
  oldMovie.genre._id = genre._id;
  oldMovie.genre.name = genre.name;
  oldMovie.numberInStock = movie.numberInStock;
  oldMovie.dailyRentalRate = movie.dailyRentalRate;

  const result = await oldMovie.save();
  res.send(result);
});

//Route to delete a movie docuent
router.delete("/", async (req, res) => {
  const result = Movie.findByIdAndDelete({ _id: req.params.id });
  res.send(result);
});
