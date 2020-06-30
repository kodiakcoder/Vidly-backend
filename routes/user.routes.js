const express = require("express");
const router = express.Router();
const { User, userValidation } = require("../models/user.model");
const bcrypt = require("bcryptjs");
const config = require("config");

router.post("/", async (req, res) => {
  const userData = req.body;

  const validation = userValidation(userData);
  if (validation.error) return res.status(400).send(validation.error.message);

  const userRegistered = await User.findOne({ email: userData.email });
  console.log(userRegistered);
  if (userRegistered)
    return res.status(400).send("Email Address already in use");

  const passwordHash = await bcrypt.hash(
    userData.password,
    parseInt(config.get("bcryptSalt"))
  );

  const newUser = new User({
    username: userData.username,
    password: passwordHash,
    email: userData.email,
    isAdmin: userData.isAdmin,
  });

  await newUser.save();

  res.send("New User Registered Successfully");
});

module.exports = router;
