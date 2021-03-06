// Load modules

const express = require("express");
const partController = require("./controllers/partControllers");
//  Create route handler
const router = express.Router();

router.get("/", partController.search_part_get);
router.post("/searchpart", partController.search_part_post);
router.post("/upload", partController.search_parts_excel);

// Export router
module.exports = router;
