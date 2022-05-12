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
router.put(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.updateJournal,
);
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  controller.deleteJournal,
);

module.exports = router;
