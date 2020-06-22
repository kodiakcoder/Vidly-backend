const express = require("express");
const router = express.Router();
const { Movie, validateMovie } = require("../models/movie.model");
const { Genre } = require("../models/genre.model");

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
  console.log("Adding movie");
  console.log("Movie object: ", req.body);
  const validate = validateMovie(req.body);
  if (validate.error) return res.status(400).send(validate.error.message);
  console.log("validated movie");
  const movie = req.body;
  console.log("Movie object: ", movie);
  const genre = await Genre.findById(movie.genreId);
  if (!genre) return res.status(404).send("Genre by that id Not Found");
  console.log("Genre found is: ", genre);
  const newMovie = new Movie({
    title: movie.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: movie.numberInStock,
    dailyRentalRate: movie.dailyRentalRate,
  });

  const result = await newMovie.save();
  res.send(result);
});

//Route to update a movie document
router.put("/:id", async (req, res) => {
  const validate = validateMovie(req.body);
  if (validate.error) return res.status(400).send(validate.error.message);
  const movie = req.body;

  const genreResult = await Genre.findById({ _id: movie.genreId });
  if (!genreResult)
    return res.status(404).send("Genre by  that id doesnt exist");

  const result = await Movie.findOneAndUpdate(
    req.params.id,
    {
      title: movie.title,
      genre: {
        _id: genreResult._id,
        name: genreResult.name,
      },
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    },
    { new: true }
  );

  if (!result) return res.status(404).send("Couldnt update movie");

  res.send(result);
});

//Route to delete a movie docuent
router.delete("/:id", async (req, res) => {
  const result = await Movie.findByIdAndDelete({ _id: req.params.id });
  res.send(result);
});

module.exports = router;
