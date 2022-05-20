const express = require('express');
const controller = require('../controllers/journal-controller');

const router = express.Router();

router.get('/', controller.getJournals);
router.get('/:id', controller.getJournalById);
router.post('/', controller.createJournal);
router.put('/:id', controller.updateJournal);
router.delete('/:id', controller.deleteJournal);

module.exports = router;
