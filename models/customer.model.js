const mongoose = require("mongoose");
const Joi = require("joi");

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
});

const Customer = mongoose.model("Customer", customerSchema);

const validateCustomer = (customer) => {
  const schema = {
    name: Joi.string().required(),
    phone: Joi.string().required(),
    isGold: Joi.boolean(),
  };

  return Joi.validate(customer, schema);
};

module.exports = { Customer, validateCustomer };
