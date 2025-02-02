// I reeeally wanted to get this architecture working but found I was
// spending too much time to do so and chose to keep it here for later.

const express = require("express");
const router = express.Router();

const { generate: generateId } = require("shortid");
const helpers = require("../../src/helpers");

const data = {
  fruits: [],
  vegetables: []
};

router.get("/vegetables", (req, res, next) => {
  const { vegetables } = data;
  res.json(vegetables);
});

router.get("/vegetables/:id", (req, res, next) => {
  const { vegetables } = data;
  const { id } = req.params;
  const vegetable = vegetables.find(veggie => veggie.id === id);

  if (!vegetable) {
    const message = `Could not find vegetable with ID of ${id}`;
    next({ status: 404, message });
  }

  res.json(vegetable);
});

router.post("/vegetables", helpers.validate, (req, res, next) => {
  const { vegetables } = data;
  const vegetable = { id: generateId(), ...req.body };

  vegetables.push(vegetable);
  res.status(201).json(vegetable);
});

router.use((req, res, next) => {
  next({
    status: 404,
    message: `Could not ${req.method} ${req.path}`
  });
});
// Error handler
router.use((err, req, res, next) => {
  const { message, status } = err;
  res.status(status).json({ message });
});

module.exports = router;
