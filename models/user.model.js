const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", userSchema);

const userValidation = (user) => {
  const schema = {
    username: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    isAdmin: Joi.boolean(),
  };

  return Joi.validate(user, schema);
};

module.exports = { User, userValidation };
