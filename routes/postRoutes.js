const router = require("express").Router();
const createError = require("http-errors");

router.get("/posts", async (req, res, next) => {
  let data = { name: "Meran", country: "World" };
  res.status(200).json(data);
});

module.exports = router;
