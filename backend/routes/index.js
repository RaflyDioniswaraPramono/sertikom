const router = require("express").Router();
const letterRoutes = require("./endpoints/letter-endpoints");
const letterCategoryRoutes = require("./endpoints/letter-category-endpoints");

router.get("/", (req, res) => {
  res.send("Api is running well!")
})

router.get("/api", (req, res) => {
  res.send("Api is running well!")
})

router.use("/api", letterRoutes);
router.use("/api", letterCategoryRoutes);

module.exports = router;