const express = require("express");
const router = express.Router();
const { Genre, validateGenre } = require("../models/genre.model");

//Get All Genres
router.get("/", async (req, res) => {
  console.log("Getting Genres");

  const result = await Genre.find();
  console.log("Genres found returning them");
  res.send(result);
});

//Get A specific Genre
router.get("/:id", async (req, res) => {
  const genre = await Genre.find({ _id: req.params.id });
  if (!genre) return res.status(404).send("Genre Not Found");
  res.send(genre);
});

//Post a genre
router.post("/", async (req, res) => {
  const genre = req.body;
  const result = validateGenre(genre);
  //console.log(result);
  if (result.error) return res.status(400).send(result.error.message);
  const newGenre = new Genre({
    name: genre.name,
  });

  const savedResult = await newGenre.save();
  res.send(savedResult);
});

//Update a genre
router.put("/:id", async (req, res) => {
  const genre = Genre.find({ _id: req.params.id });
  if (!genre) return res.status(404).send("Genre Not Found");

  const result = validateGenre(req.body);
  if (result.error) return res.status(400).send(result.error.message);

  genre.name = req.body.name;
  const savedResult = await genre.save();
  res.send(savedResult);
});

//Delete a genre
router.delete("/:id", async (req, res) => {
  const result = await Genre.findByIdAndDelete({ _id: req.params.id });
  res.send(result);
});

module.exports = router;
