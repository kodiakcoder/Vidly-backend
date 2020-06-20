const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const genreRoutes = require("./routes/genre.routes");
const morgan = require("morgan");
const app = express();

//console.log(config.get("mongoURL"));
const dbURL = config.get("mongoURL");
mongoose.connect(
  dbURL,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Connected to mongodb");
  },
  (err) => console.log("DB Error: ", err)
);

app.use(express.json());
app.use(morgan("tiny"));
app.use("/api/genres", genreRoutes);

app.listen(3000, () => {
  console.log("Listing on Port 3000");
});
