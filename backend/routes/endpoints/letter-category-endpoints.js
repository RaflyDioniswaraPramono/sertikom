const router = require("express").Router();
const LetterCategoryController = require("../../controllers/LetterCategoryController");

router.post("/category", LetterCategoryController.addLetterCategory);
router.get("/category", LetterCategoryController.getLetterCategories);
router.get("/category/:id", LetterCategoryController.getLetterCategoryById);
router.get("/search/category/:keyword", LetterCategoryController.searchLetterCategory);
router.put("/category/:id", LetterCategoryController.updateLetterCategory);
router.delete("/category/:id", LetterCategoryController.deleteLetterCategory);

module.exports = router;