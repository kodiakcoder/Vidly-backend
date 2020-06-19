const express = require("express");
const router = express.Router();
const Joi = require("joi");

const genres = [
  {
    id: 1,
    genre: "comedy",
  },
  {
    id: 2,
    genre: "action",
  },
  {
    id: 3,
    genre: "thriller",
  },
];

//Get All Genres
router.get("/", (req, res) => {
  res.send(genres);
});

//Get A specific Genre
router.get("/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre Not Found");
  res.send(genre);
});

//Post a genre
router.post("/", (req, res) => {
  const genre = req.body;
  const result = validateGenre(genre);
  console.log(result);
  if (result.error) return res.status(400).send(result.error.message);
  const newGenre = {
    id: genres.length + 1,
    genre: req.body.genre,
  };
  genres.push(newGenre);
  res.send(newGenre);
});

//Update a genre
router.put("/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre Not Found");

  const result = validateGenre(req.body);
  if (result.error) return res.status(400).send(result.error.message);

  genre.genre = req.body.genre;
  res.send(genre);
});

//Delete a genre
router.delete("/:id", (req, res) => {
  const genre = genres.find((genre) => genre.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("Genre Not Found");

  const index = genres.indexOf(genre);
  genres.splice(index, 1);

  res.send(genre);
});

const validateGenre = (genre) => {
  const schema = {
    genre: Joi.string().required(),
  };
  return Joi.validate(genre, schema);
};

module.exports = router;
