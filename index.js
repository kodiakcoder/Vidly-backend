const express = require("express");
const genreRoutes = require("./routes/genre.routes");
const app = express();

app.use(express.json());
app.use("/api/genres", genreRoutes);

app.listen(3000, () => {
  console.log("Listing on Port 3000");
});
