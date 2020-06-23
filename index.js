const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const genreRouter = require("./routes/genre.routes");
const movieRouter = require("./routes/movie.routes");
const customerRouter = require("./routes/customer.routes");
const rentalRouter = require("./routes/rental.routes");
const morgan = require("morgan");
const app = express();

//console.log(config.get("mongoURL"));
const dbURL = config.get("mongoURL");
mongoose
  .connect(dbURL, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("Connected to mongodb"))
  .catch((err) => console.log("Error: ", err));

app.use(express.json());

//Adding Middleware
app.use(morgan("tiny"));

//Setting API Routes to be used
app.use("/api/genres", genreRouter);
app.use("/api/movies", movieRouter);
app.use("/api/customers", customerRouter);
app.use("/api/rental", rentalRouter);

app.listen(3000, () => {
  console.log("Listing on Port 3000");
});
