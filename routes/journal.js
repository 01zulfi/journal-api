const express = require('express');
const passport = require('passport');
const controller = require('../controllers/journal-controller');

const router = express.Router();

router.get('/', controller.getJournals);
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  controller.createJournal,
);

module.exports = router;
