const express = require('express');
const controller = require('../controllers/journal-controller');

const router = express.Router();

router.get('/', controller.getPublishedJournals);
router.get('/:id', controller.getOneJournal);

module.exports = router;
