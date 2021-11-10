// Load modules
const bodyParser = require('body-parser');
const express = require('express');
const partController = require('./controllers/partControllers');
//  Create route handler
const router = express.Router();

// GET Index Page
router.get('/', partController.search_part_get);
// router.get('/searchpart', partController.search_part_get);

router.post('/searchpart', partController.search_part_post);

// Export router
module.exports = router;