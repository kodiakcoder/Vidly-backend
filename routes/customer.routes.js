const express = require("express");
const router = express.Router();
const { Customer, validateCustomer } = require("../models/customer.model");

//Return All Customers
router.get("/", async (req, res) => {
  const result = await Customer.find({});
  res.send(result);
});

//Return Specific Customer from id
router.get("/:id", async (req, res) => {
  const result = await Customer.find({ _id: req.params.id });
  if (!result) return res.status(404).send("Customer with that ID not found");

  res.send(result);
});

//Add a new customer
router.post("/", async (req, res) => {
  const validate = validateCustomer(req.params.body);
  if (validate.error) return res.status(400).send(validate.error.message);
  const customerData = req.params.body;
  const newCustomer = new Customer({
    name: customerData.name,
    phone: customerData.phone,
    isGold: customerData.isGold ? customerData.isGold : false,
  });
  const result = await newCustomer.save();
  res.send(result);
});

//Update a customer
router.put("/:id", async (req, res) => {
  const validate = validateCustomer(req.params.body);
  if (validate.error) return res.status(400).send(validate.error.message);
  const customer = await Customer.findById(req.param.id);
  if (!customer)
    return res.status(404).send("Customer by that id is not found");
  const customerData = req.params.body;
  customer.name = customerData.name;
  customer.phone = customerData.phone;
  customer.isGold = customerData.isGold;
  const result = await customer.save();
  res.send(result);
});

//Delete A Customer

router.delete("/:id", async (req, res) => {
  const result = Customer.findByIdAndDelete(req.params.id);
  res.send(result);
});
