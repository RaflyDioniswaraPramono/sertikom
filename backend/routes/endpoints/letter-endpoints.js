const router = require("express").Router();
const upload = require("../../middlewares/multer");
const LetterController = require("../../controllers/LetterController");

router.post("/surat", upload.single("file"), LetterController.addLetter);
router.get("/surat", LetterController.getLetters);
router.get("/surat/:id", LetterController.getLetterById);
router.get("/surat/search/:keyword", LetterController.searchLetter);
router.get("/surat/download/:id", LetterController.downloadLetter);
router.get("/surat/preview/:id", LetterController.previewLetter);
router.put("/surat/:id", upload.single("file"), LetterController.updateLetter);
router.delete("/surat/:id", LetterController.deleteLetter);

module.exports = router;
