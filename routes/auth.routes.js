const express = require("express");
const router = express.Router();
const { User } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

router.post("/", async (req, res) => {
  const userData = req.body;
  //console.log(userData);
  const user = await User.findOne({ username: userData.username });
  const result = await bcrypt.compare(userData.password, user.password);
  if (!result) return res.status(400).send("Invalid username or password");

  const jwtResult = jwt.sign({ _id: user._id }, config.get("jsonwebtoken"));
  res.send(jwtResult);
});

module.exports = router;
